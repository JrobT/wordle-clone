import React from "react";
import Guess from "./guess";
import { chances } from "../constants";

export default function GuessList({ guesses }) {
  const availableGuesses = [];

  for (let i = 0; i < chances; i += 1) {
    if (guesses && guesses.length > i) {
      const { guessedWord, colours } = guesses[i];
      availableGuesses.push(
        <Guess key={i} word={guessedWord} colours={colours} />
      );
    } else {
      availableGuesses.push(<Guess key={i} />);
    }
  }

  return <ul>{availableGuesses}</ul>;
}
