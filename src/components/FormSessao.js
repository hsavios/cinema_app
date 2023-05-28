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

const FormSessao = ({ getSessao, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const sessao = ref.current;

      sessao.inicio.value = onEdit.inicio;
      sessao.fim.value = onEdit.fim;
      sessao.legendado.value = onEdit.legendado;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessao = ref.current;

    if (
      !sessao.inicio.value ||
      !sessao.fim.value ||
      !sessao.legendado.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/sessao/" + onEdit.idSessao, {
          inicio: sessao.inicio.value,
          fim: sessao.fim.value,
          legendado: sessao.legendado.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/sessao/", {
          inicio: sessao.inicio.value,
          fim: sessao.fim.value,
          legendado: sessao.legendado.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    sessao.inicio.value = "";
    sessao.fim.value = "";
    sessao.legendado.value = "";

    setOnEdit(null);
    getSessao();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="inicio" />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input name="fim" />
      </InputArea>
      <InputArea>
        <Label>Contato</Label>
        <Input name="legendado" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormSessao;
