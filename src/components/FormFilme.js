import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FormContainer, InputArea, Input, Label, Button } from "../styles/styles";

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
