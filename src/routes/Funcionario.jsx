import GlobalStyle from "../styles/global";
import FormFuncionario from "../components/FormFuncionario";
import GridFuncionario from "../components/GridFuncionario.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Container, Title } from "../styles/styles";

export default function Funcionario() {
   const [funcionarios, setFuncionario] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getFuncionario = async () => {
    try {
      const res = await axios.get("http://localhost:8800/cinema");
      setFuncionario(res.data.sort((a, b) => (a.nomeFuncionario > b.nomeFuncionario ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

   useEffect(() => {
    getFuncionario();
  }, [setFuncionario]);

  return (
    <>
      <Container>
        <Title>FUNCIONÁRIO</Title>
        <FormFuncionario onEdit={onEdit} setOnEdit={setOnEdit} getFuncionario={getFuncionario} />
        <GridFuncionario setOnEdit={setOnEdit} funcionarios={funcionarios} setFuncionario={setFuncionario} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}