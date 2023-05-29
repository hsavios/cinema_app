import GlobalStyle from "../styles/global";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Title } from "../styles/styles";


export default function Home() {
 
  return (
    <>
      <Container>
        <Title>HOME</Title>

      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}