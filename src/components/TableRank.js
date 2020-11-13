import Axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";

const TableRank = () => {

  const [jogadores, setJogadores] = useState([]);
  
  const orderList = (a, b) => {
    if (a.tempo > b.tempo) {
      return 1;
    } else if (b.tempo > a.tempo) {
      return -1;
    } else if (a.movimentos > b.movimentos) {
      return 1;
    } else if (b.movimentos > a.movimentos) {
      return -1;
    } else if (a.nome > b.nome) {
      return 1;
    } else if (a.nome < b.nome) {
      return -1;
    }
    return 0;
  };

  const getRank = () => {
    Axios.get("http://localhost:3001/jogador").then((response) => {
      console.log(response);
      return setJogadores(response.data.sort(orderList).slice(0,10));
    });
  };

  useEffect(() => {
    getRank();
  }, []);
  
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Movimentos</th>
            <th>Tempo</th>
          </tr>
        </thead>
        <tbody>
          {jogadores.map((item, i) => 
            <tr>
              <td>{i+1}</td>
              <td>{item.nome}</td>
              <td>{item.movimentos}</td>
              <td>{item.tempo}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default TableRank;
