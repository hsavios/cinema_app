import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

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
            <Td width="30%">{item.data}</Td>
            <Td width="30%">{item.valor}</Td>
            <Td width="30%">{item.poltrona}</Td>
            <Td width="30%">{item.sala_idSala}</Td>
            <Td width="30%">{item.idFuncionario}</Td>
            <Td width="20%" onlyWeb>
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
