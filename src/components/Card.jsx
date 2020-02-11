import React from "react";
import "./Card.css";
import back from "../images/cards/back.png";

export default class Card extends React.Component {
  render() {
    return (
      <div>
        <div className="card">
          <input
            style={{ border: 0 }}
            type="image"
            src={this.props.selected ? this.props.card.image : back}
            alt="img"
            onClick={() => this.props.onCardClicked(this.props.card)}
            disabled={this.props.disabled}
          />
        </div>
      </div>
    );
  }
}
