import GlobalStyle from "../styles/global";
import FormFilme from "../components/FormFilme";
import GridFilme from "../components/GridFilme.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Container, Title } from "../styles/styles";


export default function Filme() {
   const [filmes, setFilme] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getFilme = async () => {
    try {
      const res = await axios.get("http://localhost:8800/filme");
      setFilme(res.data.sort((a, b) => (a.nomeFilme > b.nomeFilme ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

   useEffect(() => {
    getFilme();
  }, [setFilme]);

  return (
    <>
      <Container>
        <Title>FILME</Title>
        <FormFilme onEdit={onEdit} setOnEdit={setOnEdit} getFilme={getFilme} />
        <GridFilme setOnEdit={setOnEdit} filmes={filmes} setFilme={setFilme} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}