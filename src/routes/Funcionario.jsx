import GlobalStyle from "../styles/global";
import FormPessoa from "../components/FormPessoa";
import GridPessoa from "../components/GridPessoa.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Container, Title } from "../styles/styles";

export default function Funcionario() {
  const [pessoas, setPessoa] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getPessoa = async () => {
    try {
      const res = await axios.get("http://localhost:8800/pessoa");
      setPessoa(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

   useEffect(() => {
    getPessoa();
  }, [setPessoa]);

  return (
    <>
      <Container>
        <Title>FUNCIONÁRIO</Title>
        <FormPessoa onEdit={onEdit} setOnEdit={setOnEdit} getPessoa={getPessoa} />
        <GridPessoa setOnEdit={setOnEdit} pessoas={pessoas} setPessoa={setPessoa} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}