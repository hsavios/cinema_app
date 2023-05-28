import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

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

const FormFilme = ({ getFilme, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const filme = ref.current;

      filme.NomeBR.value = onEdit.NomeBR;
      filme.NomeEN.value = onEdit.NomeEN;
      filme.anoLancamento.value = onEdit.anoLancamento;
      filme.sinopse.value = onEdit.sinopse;
      filme.idGenero.value = onEdit.idGenero;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filme = ref.current;

    if (
      !filme.NomeBR.value ||
      !filme.NomeEN.value ||
      !filme.anoLancamento.value ||
      !filme.sinopse.value ||
      !filme.idGenero.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/filme/" + onEdit.idCinema, {
          NomeBR: filme.NomeBR.value,
          NomeEN: filme.NomeEN.value,
          anoLancamento: filme.anoLancamento.value,
          sinopse: filme.sinopse.value,
          idGenero: filme.idGenero.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/filme", {
          NomeBR: filme.NomeBR.value,
          NomeEN: filme.NomeEN.value,
          anoLancamento: filme.anoLancamento.value,
          sinopse: filme.sinopse.value,
          idGenero: filme.idGenero.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    filme.NomeBR.value = "";
    filme.NomeEN.value = "";
    filme.anoLancamento.value = "";
    filme.sinopse.value = "";
    filme.idGenero.value = "";

    setOnEdit(null);
    getFilme();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="NomeBR" />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input name="NomeEN" />
      </InputArea>
      <InputArea>
        <Label>Contato</Label>
        <Input name="AnoLançamento" />
      </InputArea>
      <InputArea>
        <Label>sinopse</Label>
        <Input name="Sinopse" />
      </InputArea>
      <InputArea>
        <Label>Gênero</Label>
        <Input name="idGenero" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormFilme;
