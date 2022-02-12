import React from "react";
import { wordLength } from "../constants";

export default class GuessInput extends React.Component {
  state = {
    guessedWord: ""
  };

  onChange = (e) => {
    this.setState({
      guessedWord: e.target.value
    });
  };

  onSubmitEvent = (e) => {
    e.preventDefault();
    const { guessedWord } = this.state;
    this.props.makeGuess(guessedWord);
    e.target.reset();
  };

  render() {
    return (
      <>
        <form onSubmit={this.onSubmitEvent}>
          <input name="guessedWord" type="text" maxLength={wordLength} onChange={this.onChange} />
        </form>
      </>
    );
  }
}
