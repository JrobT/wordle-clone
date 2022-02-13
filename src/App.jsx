import React from "react";
import GuessList from "./components/guess-list";
import GuessInput from "./components/guess-input";
import Info from "./components/info";
import Result from "./components/result";
import { getRandomWord } from "./solver/solver";
import { wordLength, chances } from "./constants";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guesses: [],
      chosenWord: "",
      letterGroups: ["abcdefghi", "jklmnopqr", "stuvwxyz"],
      // foundWord: false,
      endGame: false,
    };
  }

  async componentDidMount() {
    const chosenWord = await getRandomWord();
    console.log(`Chosen: ${chosenWord}`);
    this.setState({ chosenWord });
  }

  checkGuess = (guessedWord) => {
    const { chosenWord, letterGroups } = this.state;
    let result = [];

    // if found word, set state and return all letters found
    if (guessedWord === chosenWord) {
      // this.setState({ endGame: true, foundWord: true });
      this.setState({ endGame: true });
      return Array(wordLength).fill(2);
    }

    // otherwise compare the words to get the colours
    for (let i = 0; i < wordLength; i += 1) {
      // 2 = correct, 1 = misplaced, 0 = incorrect
      const letter = guessedWord[i];
      if (chosenWord[i] === letter) {
        result = [...result, 2];
      } else if (chosenWord.includes(letter)) {
        result = [...result, 1];
      } else {
        result = [...result, 0];
      }
    }

    // remove from available letters
    const newLetterGroups = [...letterGroups];
    for (let i = 0; i < wordLength; i += 1) {
      if (result[i] === 0) {
        newLetterGroups[0] = newLetterGroups[0].replace(guessedWord[i], "");
        newLetterGroups[1] = newLetterGroups[1].replace(guessedWord[i], "");
        newLetterGroups[2] = newLetterGroups[2].replace(guessedWord[i], "");
      }
      this.setState({ letterGroups: newLetterGroups });
    }

    return result;
  };

  makeGuess = (guessedWord) => {
    const { guesses } = this.state;
    const colours = this.checkGuess(guessedWord);
    this.setState({
      guesses: [...guesses, { guessedWord, colours }],
    });

    // max guesses
    if (guesses.length - 1 === chances) {
      this.setState({ endGame: true });
    }
  };

  render() {
    const { guesses, endGame, letterGroups } = this.state;
    return (
      <div className="App">
        <h1>Word Guessing</h1>
        <Result show={endGame} result={endGame} />
        <GuessList guesses={guesses} checkGuess={this.checkGuess} />
        <GuessInput makeGuess={this.makeGuess} />
        <Info letterGroups={letterGroups} />
      </div>
    );
  }
}
