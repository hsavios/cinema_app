import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table, Thead, Tr, Th, Td, Tbody } from "../styles/styles";

const GridIngresso = ({ ingressos, setIngresso, setOnEdit }) => {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://localhost:8800/funcionario");
        setFuncionarios(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFuncionarios();
  }, []);

  const getFuncionarioNome = (idFuncionario) => {
    const funcionario = funcionarios.find(
      (funcionario) => funcionario.idFuncionario === idFuncionario
    );
    return funcionario ? funcionario.nome : "";
  };

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idIngresso) => {
    await axios
      .delete("http://localhost:8800/ingresso/" + idIngresso)
      .then(({ data }) => {
        const newArray = ingressos.filter(
          (ingresso) => ingresso.idIngresso !== idIngresso
        );

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
          <Th>Funcionário</Th>
          <Th onlyWeb>idSessao</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {ingressos && ingressos.length > 0 ? (
          ingressos.map((item, i) => (
            <Tr key={i}>
              <Td width="15%">{item.data}</Td>
              <Td width="15%">{item.valor}</Td>
              <Td width="10%">{item.poltrona}</Td>
              <Td width="20%">{item.sala_idSala}</Td>
              <Td width="10%">{getFuncionarioNome(item.IDfuncionario)}</Td>
              <Td width="15%" onlyWeb>
                {item.IDsessao}
              </Td>
              <Td alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td alignCenter width="5%">
                <FaTrash onClick={() => handleDelete(item.idIngresso)} />
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={8}>Não há dados disponíveis.</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default GridIngresso;
