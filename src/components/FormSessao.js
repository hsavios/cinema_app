import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FormContainer, InputArea, Input, Label, Button, StyledSelect } from "../styles/styles";

const FormSessao = ({ getSessao, onEdit, setOnEdit }) => {
  const ref = useRef();

  const [salas, setSalas] = useState([]);
  const [selectedSala, setSelectedSala] = useState(null);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const [filmes, setFilmes] = useState([]);
  const [selectedFilme, setSelectedFilme] = useState(null);

  const [horarios, setHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState(null);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get("http://localhost:8800/sala");
        setSalas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSalas();
  }, []);

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await axios.get("http://localhost:8800/filme");
        setFilmes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilmes();
  }, []);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get("http://localhost:8800/sala");
        setHorarios(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHorarios();
  }, []);

  useEffect(() => {
    if (onEdit) {
      const sessao = ref.current;

      sessao.inicio.value = onEdit.inicio;
      sessao.fim.value = onEdit.fim;
      sessao.legendado.value = onEdit.legendado;
      sessao.IDsala.value = onEdit.IDSala;
      sessao.IDfilme.value = onEdit.IDfilme;
      sessao.IDhorario.value = onEdit.IDhorario;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessao = ref.current;

    if (
      !sessao.inicio.value ||
      !sessao.fim.value ||
      !sessao.legendado.value ||
      !sessao.IDsala.value ||
      !sessao.IDfilme.value ||
      !sessao.IDhorario.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/sessao/" + onEdit.idSessao, {
          inicio: sessao.inicio.value,
          fim: sessao.fim.value,
          legendado: sessao.legendado.value,
          IDsala: sessao.IDSala.value,
          IDfilme: sessao.IDfilme.value,
          IDhorario: sessao.IDhorario.value,
            })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/sessao/", {
          inicio: sessao.inicio.value,
          fim: sessao.fim.value,
          legendado: sessao.legendado.value,
          IDsala: sessao.IDSala.value,
          IDfilme: sessao.IDfilme.value,
          IDhorario: sessao.IDhorario.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    sessao.inicio.value = "";
    sessao.fim.value = "";
    sessao.legendado.value = "";
    setSelectedSala(null);
    setSelectedFilme(null);
    setSelectedHorario(null);

    setOnEdit(null);
    getSessao();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Inicio</Label>
        <Input name="inicio" />
      </InputArea>
      <InputArea>
        <Label>Fim</Label>
        <Input name="fim" />
      </InputArea>
      <InputArea>
        <Label>Legendado</Label>
        <Input 
        name="legendado"
        type="checkbox"
        checked={checkboxValue}
        onChange={() => setCheckboxValue(!checkboxValue)}
        />
      </InputArea>
      <InputArea>
        <Label>Sala</Label>
        <StyledSelect
          name="IDSala"
          options={salas.map((sala) => ({
            value: sala.IDsala,
            label: sala.nomeSala,
          }))}
          value={selectedSala}
          onChange={(selectedOption) => setSelectedSala(selectedOption)}
          isSearchable
          placeholder="Selecione a sala"
        />
      </InputArea>
      <InputArea>
        <Label>Filme</Label>
        <StyledSelect
          name="IDFilme"
          options={filmes.map((filme) => ({
            value: filme.IDfilme,
            label: filme.nomeBR,
          }))}
          value={selectedFilme}
          onChange={(selectedOption) => setSelectedFilme(selectedOption)}
          isSearchable
          placeholder="Selecione um filme"
        />
      </InputArea>
      <InputArea>
        <Label>Horario</Label>
        <StyledSelect
          name="IDHorario"
          options={horarios.map((horario) => ({
            value: horario.IDhorario,
            label: horario.horario,
          }))}
          value={selectedHorario}
          onChange={(selectedOption) => setSelectedHorario(selectedOption)}
          isSearchable
          placeholder="Selecione o horario"
        />
      </InputArea>


      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormSessao;
