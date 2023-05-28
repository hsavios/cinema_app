import GlobalStyle from "../styles/global";
import styled from "styled-components";
import FormCinema from "../components/FormCinema";
import GridCinema from "../components/GridCinema.js";
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


export default function Cinema() {
   const [cinemas, setCinema] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getCinema = async () => {
    try {
      const res = await axios.get("http://localhost:8800/cinema");
      setCinema(res.data.sort((a, b) => (a.nomeCinema > b.nomeCinema ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

   useEffect(() => {
    getCinema();
  }, [setCinema]);

  return (
    <>
      <Container>
        <Title>CINEMA</Title>
        <FormCinema onEdit={onEdit} setOnEdit={setOnEdit} getCinema={getCinema} />
        <GridCinema setOnEdit={setOnEdit} cinemas={cinemas} setCinema={setCinema} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}