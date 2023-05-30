import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FormContainer, InputArea, Input, Label, Button, StyledSelect } from "../styles/styles";

const FormIngresso = ({ getIngresso, onEdit, setOnEdit }) => {
  const ref = useRef();

  const [salas, setSalas] = useState([]);
  const [selectedSala, setSelectedSala] = useState(null);

  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);

  const [sessoes, setSessoes] = useState([]);
  const [selectedSessao, setSelectedSessao] = useState(null);

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
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://localhost:8800/funcionario");
        setFuncionarios(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFuncionarios();
  }, []);

  useEffect(() => {
    const fetchSessoes = async () => {
      try {
        const response = await axios.get("http://localhost:8800/sessao");
        setSessoes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSessoes();
  }, []);


  useEffect(() => {
    if (onEdit) {
      const ingresso = ref.current;

      ingresso.data.value = onEdit.data;
      ingresso.valor.value = onEdit.valor;
      ingresso.poltrona.value = onEdit.poltrona;
      ingresso.sala_idSala.value = onEdit.sala_idSala;
      ingresso.IDfuncionario.value = onEdit.IDfuncionario;
      ingresso.IDsessao.value = onEdit.IDsessao;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingresso = ref.current;

    if (
      !ingresso.data.value ||
      !ingresso.valor.value.value ||
      !ingresso.poltrona.value ||
      !ingresso.sala_idSala.value ||
      !ingresso.IDfuncionario.value ||
      !ingresso.IDsessao.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/ingresso/" + onEdit.idIngresso, {
          data: ingresso.data.value,
          valor: ingresso.valor.value,
          poltrona: ingresso.poltrona.value,
          sala_idSala: ingresso.sala_idSala.value,
          IDfuncionario: ingresso.IDfuncionario.value,
          IDsessao: ingresso.IDsessao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/ingresso", {
          data: ingresso.data.value,
          valor: ingresso.valor.value,
          poltrona: ingresso.poltrona.value,
          sala_idSala: ingresso.sala_idSala.value,
          IDfuncionario: ingresso.IDfuncionario.value,
          IDsessao: ingresso.IDsessao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

      ingresso.data.value = "";
      ingresso.valor.value = "";
      ingresso.poltrona.value = "";
      setSelectedSala(null);
      setSelectedFuncionario(null);
      setSelectedSessao(null);


    setOnEdit(null);
    getIngresso();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Data</Label>
        <Input name="data" />
      </InputArea>
      <InputArea>
        <Label>Valor</Label>
        <Input name="valor" />
      </InputArea>
      <InputArea>
        <Label>Poltrona</Label>
        <Input name="poltrona" />
      </InputArea>
      <InputArea>
        <Label>Sala</Label>
        <StyledSelect
          name="IDsala"
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
        <Label>Funcionário</Label>
        <StyledSelect
          name="IDfuncionario"
          options={funcionarios.map((funcionario) => ({
            value: funcionario.IDfuncionario,
            label: funcionario.nome,
          }))}
          value={selectedFuncionario}
          onChange={(selectedOption) => setSelectedFuncionario(selectedOption)}
          isSearchable
          placeholder="Selecione o funcionário"
        />
      </InputArea>
      <InputArea>
        <Label>Sessão</Label>
        <StyledSelect
          name="IDsessao"
          options={sessoes.map((sessao) => ({
            value: sessao.IDsessao,
            label: sessao.inicio,
          }))}
          value={selectedSessao}
          onChange={(selectedOption) => setSelectedSessao(selectedOption)}
          isSearchable
          placeholder="Selecione a sessão"
        />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormIngresso;
