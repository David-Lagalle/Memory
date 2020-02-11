import React from "react";
import Card from "./Card";
import { generateRandomCards } from "../utils/CardGenerator";
import "./Card.css";

export default class Game extends React.Component {
  state = {
    finished: [],
    selected: [],
    score: 0,
    timer: "",
    actualCardList: generateRandomCards(),
    gameStatus: "In progress"
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
        if (numberOfFinished === 28) {
          this.setState({
            gameStatus: "You win !"
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
