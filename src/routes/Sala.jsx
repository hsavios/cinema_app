import GlobalStyle from "../styles/global";
import FormSala from "../components/FormSala";
import GridSala from "../components/GridSala.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Container, Title } from "../styles/styles";

export default function Sala() {
  const [salas, setSala] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getSala = async () => {
    try {
      const res = await axios.get("http://localhost:8800/sala");
      setSala(res.data.sort((a, b) => (a.nomeSala > b.nomeSala ? 1 : -1)));
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
        <GridSala setOnEdit={setOnEdit} salas={salas} setSala={setSala} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}