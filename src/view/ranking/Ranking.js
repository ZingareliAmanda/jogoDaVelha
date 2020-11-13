import React from "react";
import { Button } from "react-bootstrap";
import TableRank from "../../components/TableRank";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughSquint } from "@fortawesome/free-solid-svg-icons";

function Ranking() {
  return (
    <div className="container">
      <div className="row float-right">
        <a target="_blank" href="https://github.com/ZingareliAmanda">
          Github do desenvolvedor
        </a>
      </div>
      <div className="row mt-5">
        <h1>Bem vindo ao Jogo da velha</h1>
      </div>
      <TableRank></TableRank>

      <Link to="/game">
        <Button variant="info" href="">
          JOGAR!{" "}
          <FontAwesomeIcon icon={faLaughSquint} size="lg"></FontAwesomeIcon>
        </Button>
      </Link>
    </div>
  );
}

export default Ranking;
