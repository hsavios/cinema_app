import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import {Table, Thead, Tr, Th, Td, Tbody} from "../styles/styles";

const GridSessao = ({ sessoes, setSessao, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idSessao) => {
    await axios
      .delete("http://localhost:8800/sessao/" + idSessao)
      .then(({ data }) => {
        const newArray = sessoes.filter((sessao) => sessao.idSessao !== idSessao);

        setSessao(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Inicio</Th>
          <Th>Fim</Th>
          <Th onlyWeb>Legendado?</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {sessoes.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.inicio}</Td>
            <Td width="30%">{item.fim}</Td>
            <Td width="20%" onlyWeb>
              {item.legendado}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idSessao)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridSessao;
