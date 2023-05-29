import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./routes/Home";
import Cinema from "./routes/Cinema"
import Filme from './routes/Filme';
import Funcionario from "./routes/Funcionario"
import Genero from "./routes/Genero"
import Horario from './routes/Horario';
import Ingresso from './routes/Ingresso';
import Sala from "./routes/Sala"
import Sessao from "./routes/Sessao"
import Menu from "./routes/Menu"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/sala" element={<Sala />} />
        <Route path="/funcionario" element={<Funcionario />} />
        <Route path="/genero" element={<Genero />} />
        <Route path="/horario" element={<Horario />} />
        <Route path="/filme" element={<Filme />} />
        <Route path="/ingresso" element={<Ingresso />} />
        <Route path="/sessao" element={<Sessao />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
