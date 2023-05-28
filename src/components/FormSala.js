import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Select from "react-select";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const StyledSelect = styled(Select)`
  width: 200px;

  .react-select__control {
    height: 40px;
    border-radius: 5px;
    border: 1px solid #bbb;
  }

  .react-select__value-container {
    padding: 0 10px;
  }

  .react-select__option {
    font-size: 14px;
  }
`;

const FormSala = ({ getSala, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);

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
      const selectedOption = cinemas.find((cinema) => cinema.idCinema === onEdit.idCinema);

      setSelectedCinema({ value: selectedOption.idCinema, label: selectedOption.nomeCinema });
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
    sala.suporta3D.value = "";
    sala.idCinema.value = "";

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
        <Input name="suporta3D" type="checkbox" />
      </InputArea>
      <InputArea>
        <Label>Cinema</Label>
        <StyledSelect
          name="idCinema"
          options={cinemas.map((cinema) => ({
            value: cinema.idCinema,
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
