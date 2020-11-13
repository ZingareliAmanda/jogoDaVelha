import "./Game.css";
import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";

const Game = (props) => {
  let t = useHistory();
  const [movimentos, setMovimentos] = useState(0);
  let tempTimer = 0;
  const [first, setFirst] = useState(true);
  const [nome, setNome] = useState(true);
  const [venceu, setVenceu] = useState(false);
  const [rodadaP1, setRodadaP1] = useState(true);
  const [timer, setTimer] = useState(0);
  const [jogadas, setJogadas] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const counter = () => {
    setInterval(() => {
      setTimer(++tempTimer);
    }, 1000);
  };

  const complete = (val) => {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  };

  const verificaVencedor = () => {
    let jogadasTemp = [];
    const padroesVitoria = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];

    let value = rodadaP1 ? "X" : "O";
    let index = -1;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        index++;
        if (jogadas[i][j] == value) {
          jogadasTemp.push(index);
        }
      }
    }
    padroesVitoria.forEach((padraoVitoria) => {
      if (checker(jogadasTemp, padraoVitoria)) {
        setVenceu(true);
      }
    });
  };

  let checker = (arr, target) => target.every((v) => arr.includes(v));

  const jogada = (a, b) => {
    let jogadasX = jogadas;
    if (first) {
      counter();
      setFirst(false);
    }
    if (jogadasX[a][b] == "" && !venceu) {
      if (rodadaP1) setMovimentos(movimentos + 1);
      jogadasX[a][b] = rodadaP1 ? "X" : "O";
      setJogadas(jogadasX);
      verificaVencedor();
      setRodadaP1(!rodadaP1);
    }
  };

  const salvarJogada = (nome) => {
    debugger;
    Axios.post("http://localhost:3001/jogador", {
      tempo: timer,
      movimentos: movimentos,
      nome: nome,
    }).then((response) => {
      t.push("/")
    });
  };

  const onchangeNome = (value) => {
    setNome(value);
  };

  return (
    <Container className="mt-5">
      <div>
        <Link to="/">
          <Button variant="info">
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              size="lg"
              className="mr-2"
            ></FontAwesomeIcon>
            voltar
          </Button>
        </Link>
        <div className="float-right">
          <a target="_blank" href="https://github.com/ZingareliAmanda">
            Github do desenvolvedor
          </a>
        </div>
      </div>
      {venceu && (
        <Container>
          <Row className="justify-content-center mt-5">
            <h1>Parabens vc venceu!!!!!!!!</h1>
          </Row>
          <Row className="justify-content-center">
            <Col md={4}>
              <Form.Control
                onChange={(e) => onchangeNome(e.target.value)}
                placeholder="insira seu nome"
              />
            </Col>
            <Col md={1}>
              <Button onClick={() => salvarJogada(nome)}>salvar</Button>
            </Col>
          </Row>
        </Container>
      )}

      <div className="d-flex justify-content-center mt-5">
        <h1>JOGO DA VELHA </h1>
      </div>

      <div className="row justify-content-md-center">
        <div className="">
          <Row className="">
            <Button
              className="game top left"
              onClick={() => jogada(0, 0)}
              variant="outline-dark"
            >
              {jogadas[0][0]}
            </Button>
            <Button
              className="game top"
              onClick={() => jogada(0, 1)}
              variant="outline-dark"
            >
              {jogadas[0][1]}
            </Button>
            <Button
              className="game top right"
              onClick={() => jogada(0, 2)}
              variant="outline-dark"
            >
              {jogadas[0][2]}
            </Button>
          </Row>
          <Row className="">
            <Button
              className="game left"
              onClick={() => jogada(1, 0)}
              variant="outline-dark"
            >
              {jogadas[1][0]}
            </Button>
            <Button
              className="game"
              onClick={() => jogada(1, 1)}
              variant="outline-dark"
            >
              {jogadas[1][1]}
            </Button>
            <Button
              className="game right"
              onClick={() => jogada(1, 2)}
              variant="outline-dark"
            >
              {jogadas[1][2]}
            </Button>
          </Row>
          <Row className="">
            <Button
              className="game bottom left"
              variant="outline-dark"
              onClick={() => jogada(2, 0)}
            >
              {jogadas[2][0]}
            </Button>
            <Button
              className="game bottom"
              onClick={() => jogada(2, 1)}
              variant="outline-dark"
            >
              {jogadas[2][1]}
            </Button>
            <Button
              className="game bottom right"
              onClick={() => jogada(2, 2)}
              variant="outline-dark"
            >
              {jogadas[2][2]}
            </Button>
          </Row>
        </div>
      </div>
      <Row>
        <Col md={4}>{rodadaP1 && <h3>vez do player 1</h3>}</Col>
        <Col md={{ span: 4, offset: 4 }}>
          {!rodadaP1 && <h3>vez do player 2</h3>}
        </Col>
      </Row>
      <Row>
        <h2>{complete(parseInt(timer / 60))}</h2>
        <h2>:</h2>
        <h2>{complete(timer % 60)}</h2>
      </Row>
    </Container>
  );
};

Game.propTypes = {};

export default Game;
