import GlobalStyle from "../styles/global";
import FormHorario from "../components/FormHorario";
import GridHorario from "../components/GridHorario.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Container, Title } from "../styles/styles";

export default function Horario() {
   const [horarios, setHorario] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getHorario = async () => {
    try {
      const res = await axios.get("http://localhost:8800/horario");
      setHorario(res.data.sort((a, b) => (a.nomeHorario > b.nomeHorario ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

   useEffect(() => {
    getHorario();
  }, [setHorario]);

  return (
    <>
      <Container>
        <Title>HORÁRIO</Title>
        <FormHorario onEdit={onEdit} setOnEdit={setOnEdit} getHorario={getHorario} />
        <GridHorario setOnEdit={setOnEdit} horarios={horarios} setHorario={setHorario} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}