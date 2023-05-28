import GlobalStyle from "../styles/global";
import styled from "styled-components";
import FormGenero from "../components/FormGenero";
import GridGenero from "../components/GridGenero.js";
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


export default function Genero() {
   const [generos, setGenero] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getGenero = async () => {
    try {
      const res = await axios.get("http://localhost:8800/genero");
      setGenero(res.data.sort((a, b) => (a.nomeGenero > b.nomeGenero ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

   useEffect(() => {
    getGenero();
  }, [setGenero]);

  return (
    <>
      <Container>
        <Title>GÊNERO</Title>
        <FormGenero onEdit={onEdit} setOnEdit={setOnEdit} getGenero={getGenero} />
        <GridGenero setOnEdit={setOnEdit} generos={generos} setGenero={setGenero} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}