import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FormContainer, InputArea, Input, Label, Button } from "../styles/styles";

const FormHorario = ({ getHorario, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const horario = ref.current;

      horario.horario.value = onEdit.horario;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const horario = ref.current;

    if (
      !horario.horario.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/horario/" + onEdit.idHorario, {
          horario: horario.horario.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/horario", {
          horario: horario.horario.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    horario.horario.value = "";

    setOnEdit(null);
    getHorario();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Horario</Label>
        <Input name="horario" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormHorario;
