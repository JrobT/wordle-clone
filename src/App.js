import React from 'react';
import GuessList from './components/guess-list';
import GuessInput from './components/guess-input';
import Info from './components/info';
import Result from './components/result';
import { getRandomWord } from './solver/solver';
import { wordLength, chances } from './constants';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      guesses: [],
      chosenWord: "",
      letterGroups: ["abcdefghi", "jklmnopqr", "stuvwxyz"],
      foundWord: false,
      endGame: false,
    };
  }

  async componentDidMount() {
    const chosenWord = await getRandomWord();
    console.log(`Chosen: ${chosenWord}`);
    this.setState({ chosenWord });
  };

  checkGuess = (guessedWord) => {
    let result = [];

    // if found word, set state and return all letters found
    if (guessedWord === this.state.chosenWord) {
      this.setState({ endGame: true, foundWord: true });
      return Array(wordLength).fill(2);
    }

    // otherwise compare the words to get the colours
    for (let i = 0; i < wordLength; i++) {
      // 2 = correct, 1 = misplaced, 0 = incorrect
      let letter = guessedWord[i];
      if (this.state.chosenWord[i] === letter) {
        result = [ ...result, 2 ]
      } else if (this.state.chosenWord.includes(letter)) {
        result = [ ...result, 1 ]
      } else {
        result = [ ...result, 0 ]

        // remove from available letters
        const newLetterGroups = [];
        this.state.letterGroups.forEach(letterGroup => {
          let newLetterGroup = letterGroup;
          newLetterGroup = letterGroup.replace(letter, "");
          newLetterGroups.push(newLetterGroup);
        });
        this.setState({ letterGroups: newLetterGroups });
      }
    }

    return result;
  }

  makeGuess = (guessedWord) => {
    const colours = this.checkGuess(guessedWord);
    this.setState({ guesses: [ ...this.state.guesses, { guessedWord, colours } ]});

    // max guesses
    if (this.state.guesses.length-1 === chances) {
      this.setState({ endGame: true });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Word Guessing</h1>
        <Result show={this.state.endGame} result={this.state.foundWord} />
        <GuessList guesses={this.state.guesses} checkGuess={this.checkGuess} />
        <GuessInput makeGuess={this.makeGuess} />
        <Info letterGroups={this.state.letterGroups} />
      </div>
    );
  };
}
