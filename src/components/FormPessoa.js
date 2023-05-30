import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FormContainer, InputArea, Input, Label, Button } from "../styles/styles";

const FormPessoa = ({ getPessoa, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const pessoa = ref.current;

      pessoa.nome.value = onEdit.nome;
      pessoa.carteiraDeTrabalho.value = onEdit.carteiraDeTrabalho;
      pessoa.dataContratacao.value = onEdit.dataContratacao;
      pessoa.salario.value = onEdit.salario;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pessoa = ref.current;

    if (
      !pessoa.nome.value ||
      !pessoa.carteiraDeTrabalho.value ||
      !pessoa.dataContratacao.value ||
      !pessoa.salario.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/pessoa/" + onEdit.idFuncionario, {
          nome: pessoa.nome.value,
          carteiraDeTrabalho: pessoa.carteiraDeTrabalho.value,
          dataContratacao: pessoa.dataContratacao.value,
          salario: pessoa.salario.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/pessoa/", {
          nome: pessoa.nome.value,
          carteiraDeTrabalho: pessoa.carteiraDeTrabalho.value,
          dataContratacao: pessoa.dataContratacao.value,
          salario: pessoa.salario.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    pessoa.nome.value = "";
    pessoa.carteiraDeTrabalho.value = "";
    pessoa.dataContratacao.value = "";
    pessoa.salario.value = "";

    setOnEdit(null);
    getPessoa();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>CTPS</Label>
        <Input name="carteiraDeTrabalho" />
      </InputArea>
      <InputArea>
        <Label>Contratação</Label>
        <Input name="dataContratacao" />
      </InputArea>
      <InputArea>
        <Label>Salário</Label>
        <Input name="salario" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormPessoa;
