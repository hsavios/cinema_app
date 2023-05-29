import GlobalStyle from "../styles/global";
import FormSessao from "../components/FormSessao";
import GridSessao from "../components/GridSessao.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Container, Title } from "../styles/styles";

export default function Sessao() {
   const [sessoes, setSessao] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getSessao = async () => {
    try {
      const res = await axios.get("http://localhost:8800/sessao");
      setSessao(res.data.sort((a, b) => (a.nomeSessao > b.nomeSessao ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

   useEffect(() => {
    getSessao();
  }, [setSessao]);

  return (
    <>
      <Container>
        <Title>SESSÃO</Title>
        <FormSessao onEdit={onEdit} setOnEdit={setOnEdit} getSessao={getSessao} />
        <GridSessao setOnEdit={setOnEdit} sessoes={sessoes} setSessao={setSessao} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}