import React from "react";
import GuessList from "./components/guess-list";
import GuessInput from "./components/guess-input";
import Info from "./components/info";
import Result from "./components/result";
import Suggestion from "./components/suggestion";
import { getRandomWord, getSuggestion } from "./solver/solver";
import { wordLength, chances, suggestions } from "./constants";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guesses: [],
      chosenWord: "",
      letterGroups: ["abcdefghi", "jklmnopqr", "stuvwxyz"],
      suggestion: "",
      foundWord: false,
      endGame: false,
    };
  }

  async componentDidMount() {
    const chosenWord = await getRandomWord();
    console.log(`Chosen: ${chosenWord}`);
    this.setState({ chosenWord });

    const suggestion = await getRandomWord();
    this.setState({ suggestion });
  }

  checkGuess = (guessedWord) => {
    const { chosenWord, letterGroups } = this.state;
    let result = [];

    // if found word, set state and return all letters found
    if (guessedWord === chosenWord) {
      this.setState({ endGame: true, foundWord: true });
      return Array(wordLength).fill(2);
    }

    // otherwise compare the words to get the colours
    for (let i = 0; i < wordLength; i += 1) {
      // 2 = correct, 1 = misplaced, 0 = incorrect
      const letter = guessedWord[i];
      if (chosenWord[i] === letter) {
        result = [...result, 2];
      } else if (chosenWord.includes(letter)) {
        if (chosenWord.split(letter).length-1 === guessedWord.split(letter).length-1)
          result = [...result, 1];
        else
          result = [...result, 0];
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

  newSuggestion = () => {
    const { endGame } = this.state;
    const suggestion = getSuggestion();

    if (!endGame) {
      this.setState({ suggestion });
    }
  };

  makeGuess = (guessedWord) => {
    const colours = this.checkGuess(guessedWord);
    this.setState(prevState => ({
      guesses: [...prevState.guesses, { guessedWord, colours }],
    }));

    // can't await setState :/
    if (this.state.guesses.length + 1 >= chances) {
      this.setState({ endGame: true });
    }

    this.newSuggestion();
  };

  render() {
    const { guesses, chosenWord, letterGroups, suggestion, foundWord, endGame } = this.state;
    return (
      <div className="App">
        <h1>Word Guessing</h1>
        {suggestions && <Suggestion suggestion={suggestion} />}
        {endGame && <Result foundWord={foundWord} chosenWord={chosenWord} />}
        <GuessList guesses={guesses} checkGuess={this.checkGuess} />
        <GuessInput makeGuess={this.makeGuess} endGame={endGame} />
        <Info letterGroups={letterGroups} />
      </div>
    );
  }
}
