import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import {Table, Thead, Tr, Th, Td, Tbody} from "../styles/styles"

const GridFilme = ({ filmes, setFilme, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idFilme) => {
    await axios
      .delete("http://localhost:8800/filme/" + idFilme)
      .then(({ data }) => {
        const newArray = filmes.filter((filme) => filme.idFilme !== idFilme);

        setFilme(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>NomeBR</Th>
          <Th>NomeEN</Th>
          <Th onlyWeb>Ano Lançamento</Th>
          <Th onlyWeb>Sinopse</Th>
          <Th onlyWeb>Gênero</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {filmes.map((item, i) => (
          <Tr key={i}>
            <Td width="20%">{item.NomeBR}</Td>
            <Td width="20%">{item.NomeEN}</Td>
            <Td width="20%" onlyWeb>
              {item.anoLancamento}
            </Td>
            <Td width="20%" onlyWeb>
              {item.sinopse}
            </Td>
            <Td width="10%" onlyWeb>
              {item.idGenero}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idFilme)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridFilme;
