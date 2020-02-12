import React from "react";
import Card from "./Card";
import { generateRandomCards } from "../utils/CardGenerator";
import "./Card.css";
import { Difficulty } from "../utils/DifficultyEnum";
import { GameStatus } from "../utils/GameStatusEnum";

export default class Game extends React.Component {
  state = {
    finished: [],
    selected: [],
    score: 0,
    timer: "",
    difficulty: Difficulty.Normal,
    actualCardList: generateRandomCards(Difficulty.Normal),
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
  };

  onCardClicked = card => {
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
        if (numberOfFinished === this.state.actualCardList.length) {
          this.setState({
            gameStatus: GameStatus.win
          });
        }
      }
      setTimeout(() => {
        this.setState({
          selected: []
        });
      }, 1000);
    }
  };

  render() {
    return (
      <div>
        <h1>The memory game</h1>
        <h3>Score: {this.state.score}</h3>
        <div className="difficulty">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            className="form-control"
            name="difficulty"
            onChange={this.setDifficulty}
          >
            <option value={Difficulty.Easy}>{Difficulty.Easy}</option>
            <option selected value={Difficulty.Normal}>
              {Difficulty.Normal}
            </option>
            <option value={Difficulty.Hard}>{Difficulty.Hard}</option>
          </select>
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
      </div>
    );
  }
}
