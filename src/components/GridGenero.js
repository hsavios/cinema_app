import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import {Table, Thead, Tr, Th, Td, Tbody} from "../styles/styles";

const GridGenero = ({ generos, setGenero, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idGenero) => {
    await axios
      .delete("http://localhost:8800/genero/" + idGenero)
      .then(({ data }) => {
        const newArray = generos.filter((genero) => genero.idGenero !== idGenero);

        setGenero(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Genero</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {generos.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.genero}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idGenero)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridGenero;
