import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import {Table, Thead, Tr, Th, Td, Tbody} from "../styles/styles"

const GridPessoa = ({ pessoas, setPessoa, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idFuncionario) => {
    await axios
      .delete("http://localhost:8800/pessoa/" + idFuncionario)
      .then(({ data }) => {
        const newArray = pessoas.filter((pessoa) => pessoa.idFuncionario !== idFuncionario);

        setPessoa(newArray);
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
          <Th>CTPS</Th>
          <Th onlyWeb>Contratação</Th>
          <Th onlyWeb>Salário</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {pessoas.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.carteiraDeTrabalho}</Td>
            <Td width="20%" onlyWeb>
              {item.dataContratacao}
            </Td>
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

export default GridPessoa;
