import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FormContainer, InputArea, Input, Label, Button, StyledSelect } from "../styles/styles";

const FormSala = ({ getSala, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [checkboxValue, setCheckboxValue] = useState(false);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get("http://localhost:8800/cinema");
        setCinemas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCinemas();
  }, []);

  useEffect(() => {
    if (onEdit) {
      const selectedOption = cinemas.find((cinema) => cinema.IDcinema === onEdit.IDcinema);

      setSelectedCinema({ value: selectedOption.IDcinema, label: selectedOption.nomeCinema });
    }
  }, [onEdit, cinemas]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sala = ref.current;

    if (
      !sala.nomeSala.value ||
      !sala.capacidade.value ||
      !sala.suporta3D.value ||
      !sala.idCinema.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/sala/" + onEdit.idSala, {
          nomeSala: sala.nomeSala.value,
          cpacidade: sala.capacidade.value,
          suporta3D: sala.suporta3D.value,
          idCinema: sala.idCinema.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/sala/", {
          nomeSala: sala.nomeSala.value,
          capacidade: sala.capacidade.value,
          suporta3D: sala.suporta3D.value,
          idCinema: sala.idCinema.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    sala.nomeSala.value = "";
    sala.capacidade.value = "";
    setCheckboxValue(false);
    setSelectedCinema(null);

    setOnEdit(null);
    getSala();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nomeSala" />
      </InputArea>
      <InputArea>
        <Label>Capacidade</Label>
        <Input name="capacidade" />
      </InputArea>
      <InputArea>
        <Label>Suporta 3d?</Label>
        <Input
          name="suporta3D"
          type="checkbox"
          checked={checkboxValue}
          onChange={() => setCheckboxValue(!checkboxValue)}
        />
      </InputArea>
      <InputArea>
        <Label>Cinema</Label>
        <StyledSelect
          name="IDCinema"
          options={cinemas.map((cinema) => ({
            value: cinema.IDcinema,
            label: cinema.nomeCinema,
          }))}
          value={selectedCinema}
          onChange={(selectedOption) => setSelectedCinema(selectedOption)}
          isSearchable
          placeholder="Selecione o cinema"
        />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormSala;
