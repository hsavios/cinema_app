import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import {Table, Thead, Tr, Th, Td, Tbody} from "../styles/styles";

const GridIngresso = ({ ingressos, setIngresso, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idIngresso) => {
    await axios
      .delete("http://localhost:8800/ingresso/" + idIngresso)
      .then(({ data }) => {
        const newArray = ingressos.filter((ingresso) => ingresso.idIngresso !== idIngresso);

        setIngresso(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Data</Th>
          <Th>Valor</Th>
          <Th>Poltrona</Th>
          <Th>Sala_idSala</Th>
          <Th>IdFuncionario</Th>
          <Th onlyWeb>idSessao</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {ingressos.map((item, i) => (
          <Tr key={i}>
            <Td width="15%">{item.data}</Td>
            <Td width="15%">{item.valor}</Td>
            <Td width="10%">{item.poltrona}</Td>
            <Td width="20%">{item.sala_idSala}</Td>
            <Td width="10%">{item.idFuncionario}</Td>
            <Td width="15%" onlyWeb>
              {item.idSessao}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idIngresso)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridIngresso;
