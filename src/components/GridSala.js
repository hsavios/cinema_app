import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table, Thead, Tr, Th, Td, Tbody } from "../styles/styles";

const GridSala = ({ salas, setSala, setOnEdit }) => {
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get("http://localhost:8800/cinema");
        setCinemas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCinemas();
  }, []);

  const getCinemaNome = (idCinema) => {
    const cinema = cinemas.find((cinema) => cinema.idCinema === idCinema);
    return cinema ? cinema.nomeCinema : "";
  };

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idSala) => {
    await axios
      .delete("http://localhost:8800/sala/" + idSala)
      .then(({ data }) => {
        const newArray = salas.filter((sala) => sala.idSala !== idSala);

        setSala(newArray);
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
          <Th>Capacidade</Th>
          <Th onlyWeb>Suporta 3d?</Th>
          <Th onlyWeb>Cinema</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {salas && salas.length > 0 ? (
          salas.map((item, i) => (
            <Tr key={i}>
              <Td width="30%">{item.nomeSala}</Td>
              <Td width="30%">{item.capacidade}</Td>
              <Td width="20%" onlyWeb>
                {item.suporta3D}
              </Td>
              <Td width="20%" onlyWeb>
                {getCinemaNome(item.IDcinema)}
              </Td>
              <Td alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td alignCenter width="5%">
                <FaTrash onClick={() => handleDelete(item.idSala)} />
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={6}>Não há dados disponíveis.</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default GridSala;