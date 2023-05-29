import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FormContainer, InputArea, Input, Label, Button } from "../styles/styles";

const FormCinema = ({ getCinema, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const cinema = ref.current;

      cinema.nomeCinema.value = onEdit.nomeCinema;
      cinema.enderecoCinema.value = onEdit.enderecoCinema;
      cinema.contatoCinema.value = onEdit.contatoCinema;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cinema = ref.current;

    if (
      !cinema.nomeCinema.value ||
      !cinema.enderecoCinema.value ||
      !cinema.contatoCinema.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/cinema/" + onEdit.idCinema, {
          nomeCinema: cinema.nomeCinema.value,
          enderecoCinema: cinema.enderecoCinema.value,
          contatoCinema: cinema.contatoCinema.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/cinema/", {
          nomeCinema: cinema.nomeCinema.value,
          enderecoCinema: cinema.enderecoCinema.value,
          contatoCinema: cinema.contatoCinema.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    cinema.nomeCinema.value = "";
    cinema.enderecoCinema.value = "";
    cinema.contatoCinema.value = "";

    setOnEdit(null);
    getCinema();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nomeCinema" />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input name="enderecoCinema" />
      </InputArea>
      <InputArea>
        <Label>Contato</Label>
        <Input name="contatoCinema" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormCinema;
