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

const FormFuncionario = ({ getFuncionario, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const funcionario = ref.current;

      funcionario.nome.value = onEdit.nome;
      funcionario.carteiraDeTrabalho.value = onEdit.carteiraDeTrabalho;
      funcionario.dataContratacao.value = onEdit.dataContratacao;
      funcionario.salario.value = onEdit.salario;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const funcionario = ref.current;

    if (
      !funcionario.nome.value ||
      !funcionario.carteiraDeTrabalho.value ||
      !funcionario.dataContratacao.value ||
      !funcionario.salario.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/funcionario/" + onEdit.idFuncionario, {
          nome: funcionario.nome.value,
          carteiraDeTrabalho: funcionario.carteiraDeTrabalho.value,
          dataContratacao: funcionario.dataContratacao.value,
          salario: funcionario.salario.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/funcionario", {
          nome: funcionario.nome.value,
          carteiraDeTrabalho: funcionario.carteiraDeTrabalho.value,
          dataContratacao: funcionario.dataContratacao.value,
          salario: funcionario.salario.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    funcionario.nome.value = "";
    funcionario.carteiraDeTrabalho.value = "";
    funcionario.dataContratacao.value = "";
    funcionario.salario.value = "";

    setOnEdit(null);
    getFuncionario();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Carteira de Trabalho</Label>
        <Input name="carteiraDeTrabalho" />
      </InputArea>
      <InputArea>
        <Label>Data da Contratação</Label>
        <Input name="dataContratacao" />
      </InputArea>
      <InputArea>
        <Label>Salario</Label>
        <Input name="salario" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormFuncionario;
