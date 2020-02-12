import React from "react";

export default class EndingPopup extends React.Component {
  render() {
    return (
      <div>
        {alert(this.props.gameStatus + " Your score is " + this.props.score)}
        {console.log(this.props.gameStatus)}
      </div>
    );
  }
}
