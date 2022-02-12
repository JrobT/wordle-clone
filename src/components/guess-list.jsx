import React from 'react';
import Guess from "./guess";
import { chances } from "../constants";

export default class GuessList extends React.Component {
  render() {
    const availableGuesses = [];

    for (let i = 0; i < chances; i++) {
      if (this.props.guesses.length > i && this.props.guesses[i].guessedWord) {
        availableGuesses.push(<Guess key={i} word={this.props.guesses[i].guessedWord} colours={this.props.guesses[i].colours} />);
      } else {
        availableGuesses.push(<Guess key={i} />);
      }
    }
  
    return <ul>{availableGuesses}</ul>;
  }
}
