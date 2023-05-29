import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import {Table, Thead, Tr, Th, Td, Tbody} from "../styles/styles"

const GridCinema = ({ cinemas, setCinema, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idCinema) => {
    await axios
      .delete("http://localhost:8800/cinema/" + idCinema)
      .then(({ data }) => {
        const newArray = cinemas.filter((cinema) => cinema.idCinema !== idCinema);

        setCinema(newArray);
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
          <Th>Endereço</Th>
          <Th onlyWeb>Contato</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {cinemas.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nomeCinema}</Td>
            <Td width="30%">{item.enderecoCinema}</Td>
            <Td width="20%" onlyWeb>
              {item.contatoCinema}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idCinema)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridCinema;
