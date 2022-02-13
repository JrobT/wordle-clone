import React from "react";
import { wordLength } from "../constants";

export default class GuessInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guessedWord: "",
    };
  }

  onChange = (e) => {
    this.setState({
      guessedWord: e.target.value,
    });
  };

  onSubmitEvent = (e) => {
    const { guessedWord } = this.state;
    const { makeGuess, endGame } = this.props;

    if (!endGame)
      makeGuess(guessedWord);

    e.preventDefault();
    e.target.reset();
  };

  render() {
    const { endGame } = this.props;
    return (
      <form onSubmit={this.onSubmitEvent}>
        <input
          name="guessedWord"
          type="text"
          minLength={wordLength}
          maxLength={wordLength}
          onChange={this.onChange}
          disabled={endGame}
        />
      </form>
    );
  }
}
