import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FormContainer, InputArea, Input, Label, Button } from "../styles/styles";

const FormGenero = ({ getGenero, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const genero = ref.current;

      genero.genero.value = onEdit.genero;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const genero = ref.current;

    if (
      !genero.genero.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/genero/" + onEdit.idGenero, {
          genero: genero.genero.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/genero", {
          genero: genero.genero.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    genero.genero.value = "";

    setOnEdit(null);
    getGenero();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Genero</Label>
        <Input name="genero" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormGenero;
