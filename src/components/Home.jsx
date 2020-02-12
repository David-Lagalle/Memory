import React from "react";
import { Redirect } from "react-router-dom";

export default class Home extends React.Component {
  state = {
    isButtonDisabled: localStorage.getItem("pseudo") === null,
    pseudo: localStorage.getItem("pseudo")
  };

  activeButton = event => {
    var isButtonDisabled;
    if (event.target.value !== "") {
      isButtonDisabled = false;
      this.setState({ pseudo: event.target.value });
    } else {
      isButtonDisabled = true;
    }
    this.setState({ isButtonDisabled: isButtonDisabled });
  };

  play = () => {
    localStorage.setItem("pseudo", this.state.pseudo);
    return <Redirect to="/game" />;
  };

  render() {
    return (
      <div>
        <h1>Start new game</h1>
        <input
          type="text"
          defaultValue={this.state.pseudo}
          onChange={this.activeButton}
          placeholder="Enter pseudo"
        ></input>
        <button
          onClick={() => this.play()}
          className="btn btn-success btn-lg"
          disabled={this.state.isButtonDisabled}
        >
          Jouer !
        </button>
      </div>
    );
  }
}
