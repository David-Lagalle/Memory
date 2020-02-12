import React from "react";
import Card from "./Card";
import { generateRandomCards } from "../utils/CardGenerator";
import "./Card.css";
import EndingPopup from "./EndingPopup";
import { Difficulty } from "../utils/DifficultyEnum";
import { GameStatus } from "../utils/GameStatusEnum";
import { Redirect } from "react-router-dom";

const timerDefaultValue = 120;

export default class Game extends React.Component {
  state = {
    pseudo: localStorage.getItem("pseudo"),
    finished: [],
    selected: [],
    score: timerDefaultValue,
    timer: timerDefaultValue,
    handleTimer: 0,
    difficulty: localStorage.getItem("difficulty"),
    actualCardList: generateRandomCards(localStorage.getItem("difficulty")),
    gameStatus: GameStatus.progress
  };

  isCardDisabled = card => {
    if (this.state.finished.includes(card)) {
      return true;
    } else {
      return false;
    }
  };

  isCardSelected = card => {
    if (
      card === this.state.selected[0] ||
      card === this.state.selected[1] ||
      this.state.finished.includes(card)
    ) {
      return true;
    } else {
      return false;
    }
  };

  setDifficulty = event => {
    this.setState({
      difficulty: event.target.value,
      actualCardList: generateRandomCards(event.target.value)
    });
    localStorage.setItem("difficulty", event.target.value);
  };

  onCardClicked = card => {
    if (this.state.handleTimer === 0) {
      const handle = setInterval(() => {
        this.count();
      }, 1000);
      this.setState({
        handleTimer: handle
      });
    }

    var numberOfSelected = this.state.selected.length;
    this.setState({
      selected: this.state.selected.concat(card)
    });
    numberOfSelected = numberOfSelected + 1;

    if (numberOfSelected === 2) {
      if (
        this.state.selected.length === 1 &&
        this.state.selected[0].name === card.name &&
        this.state.selected[0].id !== card.id
      ) {
        var numberOfFinished = this.state.finished.length;
        this.setState({
          finished: this.state.finished
            .concat(card)
            .concat(this.state.selected),
          score: this.state.score + card.scoreValue
        });
        numberOfFinished = numberOfFinished + 2;
        if (
          numberOfFinished === this.state.actualCardList.length &&
          this.state.gameStatus !== GameStatus.win
        ) {
          setTimeout(() => {
            this.setState({
              gameStatus: GameStatus.win
            });
          }, 1000);
          this.clean(GameStatus.win);
        }
      }
      setTimeout(() => {
        this.setState({
          selected: []
        });
      }, 1000);
    }
  };

  count = () => {
    this.setState({
      timer: parseInt(this.state.timer) - 1,
      score: parseInt(this.state.score) - 1
    });
    if (this.state.timer === 0) {
      this.clean(GameStatus.loose);
    }
  };

  clean = gameStatus => {
    clearInterval(this.state.handleTimer);
    this.setState({ gameStatus: gameStatus });

    var lsScore = JSON.parse(localStorage.getItem("score"));

    if (lsScore === null) {
      lsScore = [];
      console.log("here");
    }

    localStorage.setItem("score", JSON.stringify(this.state.score));
  };

  render() {
    return (
      <div>
        {this.state.pseudo === null ? <Redirect to="/" /> : <></>}
        <h1>The memory game</h1>
        <h3>Score: {this.state.score}</h3>
        <div className="difficulty">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            className="form-control"
            name="difficulty"
            onChange={this.setDifficulty}
            defaultValue={this.state.difficulty}
          >
            <option value={Difficulty.Easy}>{Difficulty.Easy}</option>
            <option value={Difficulty.Normal}>{Difficulty.Normal}</option>
            <option value={Difficulty.Hard}>{Difficulty.Hard}</option>
          </select>
          <br></br>
          <label htmlFor="time">Time left:</label>
          <input
            name="time"
            style={{ width: 35 }}
            type="text"
            disabled={true}
            value={this.state.timer}
          />
        </div>
        <div className="cards">
          {this.state.actualCardList.map(card => (
            <Card
              key={card.id}
              card={card}
              onCardClicked={() => this.onCardClicked(card)}
              disabled={this.isCardDisabled(card)}
              selected={this.isCardSelected(card)}
            />
          ))}
        </div>
        {this.state.gameStatus !== GameStatus.progress ? (
          <EndingPopup
            score={this.state.score}
            gameStatus={this.state.gameStatus}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}
