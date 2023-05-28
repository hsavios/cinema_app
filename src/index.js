import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from "./routes/Home";
import Cinema from "./routes/Cinema"
import Sala from "./routes/Sala"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>Erro 404. Página não encontrada.</h1>
  },
  {
    path: '/cinema',
    element: <Cinema />
  },
  {
    path: '/sala',
    element: <Sala />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
