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

const FormIngresso = ({ getIngresso, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const ingresso = ref.current;

      ingresso.data.value = onEdit.data;
      ingresso.valor.value = onEdit.valor;
      ingresso.poltrona.value = onEdit.poltrona;
      ingresso.sala_idSala.value = onEdit.sala_idSala;
      ingresso.idFuncionario.value = onEdit.idFuncionario;
      ingresso.idSessao.value = onEdit.poltrona;
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
      !ingresso.idFuncionario.value ||
      ! ingresso.idSessao.value 
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
          idFuncionario: ingresso.idFuncionario.value,
          idSessao: ingresso.idSessao.value,
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
          idFuncionario: ingresso.idFuncionario.value,
          idSessao: ingresso.idSessao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

      ingresso.data.value = "";
      ingresso.valor.value = "";
      ingresso.poltrona.value = "";
      ingresso.sala_idSala.value = "";
      ingresso.idFuncionario.value = "";
      ingresso.idSessao.value = "";


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
        <Label>Sala_idSala</Label>
        <Input name="sala_idSala" />
      </InputArea>
      <InputArea>
        <Label>IdFuncionario</Label>
        <Input name="idFuncionario" />
      </InputArea>
      <InputArea>
        <Label>idSessao</Label>
        <Input name="idSessao" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormIngresso;
