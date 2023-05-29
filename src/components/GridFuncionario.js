import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import {Table, Thead, Tr, Th, Td, Tbody} from "../styles/styles";

const GridFuncionario = ({ funcionarios, setFuncionario, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idFuncionario) => {
    await axios
      .delete("http://localhost:8800/funcionario/" + idFuncionario)
      .then(({ data }) => {
        const newArray = funcionarios.filter((funcionario) => funcionario.idFuncionario !== idFuncionario);

        setFuncionario(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Carteira de Trabalho</Th>
          <Th>Data da Contratação</Th>
          <Th>Salario</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {funcionarios.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.carteiraDeTrabalho}</Td>
            <Td width="30%">{item.dataContratacao}</Td>
            <Td width="20%" onlyWeb>
              {item.salario}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idFuncionario)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridFuncionario;
