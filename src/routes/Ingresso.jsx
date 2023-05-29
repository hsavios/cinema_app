import GlobalStyle from "../styles/global";
import FormIngresso from "../components/FormIngresso";
import GridIngresso from "../components/GridIngresso.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Container, Title } from "../styles/styles";

export default function Ingresso() {
   const [ingressos, setIngresso] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getIngresso = async () => {
    try {
      const res = await axios.get("http://localhost:8800/ingresso");
      setIngresso(res.data.sort((a, b) => (a.nomeIngresso > b.nomeIngresso ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

   useEffect(() => {
    getIngresso();
  }, [setIngresso]);

  return (
    <>
      <Container>
        <Title>INGRESSO</Title>
        <FormIngresso onEdit={onEdit} setOnEdit={setOnEdit} getIngresso={getIngresso} />
        <GridIngresso setOnEdit={setOnEdit} ingressos={ingressos} setIngresso={setIngresso} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}