import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Game from "./components/Game";
import Score from "./components/Score";
import { Link, Route } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiHome, mdiCards, mdiPodium } from "@mdi/js";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="box">
      <div className="card-header">
        <Link className="btn btn-primary" to="/">
          <Icon style={{ width: 40 }} path={mdiHome} />
        </Link>
        <Link className="btn btn-primary" to="/game">
          <Icon style={{ width: 40 }} path={mdiCards} />
        </Link>
        <Link className="btn btn-primary" to="/score">
          <Icon style={{ width: 40 }} path={mdiPodium} />
        </Link>
      </div>
      <Route exact path="/" component={() => <Home />} />
      <Route path="/game" component={() => <Game />} />
      <Route path="/score" component={() => <Score />} />
    </div>
  );
}

export default App;
