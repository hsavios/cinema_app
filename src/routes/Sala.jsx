import GlobalStyle from "../styles/global";
import styled from "styled-components";
import FormSala from "../components/FormSala";
import GridSala from "../components/GridSala.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;


export default function Home() {
   const [salas, setSala] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getSala = async () => {
    try {
      const res = await axios.get("http://localhost:8800/sala");
      setSala(res.data.sort((a, b) => (a.nomeCinema > b.nomeCinema ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

   useEffect(() => {
    getSala();
  }, [setSala]);

  return (
    <>
      <Container>
        <Title>SALA</Title>
        <FormSala onEdit={onEdit} setOnEdit={setOnEdit} getSala={getSala} />
        <GridSala setOnEdit={setOnEdit} cinemas={salas} setCinema={setSala} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}