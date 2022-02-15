import { wordLength } from '../constants'

const comparison = (chosenWord, guessedWord) => {
  let result = [];
  // otherwise compare the words to get the colours
  for (let i = 0; i < wordLength; i += 1) {
    // 2 = correct, 1 = misplaced, 0 = incorrect
    const letter = guessedWord[i];
    if (chosenWord[i] === letter) {
      result = [...result, 2];
    } else if (chosenWord.includes(letter)) {
      if (
        chosenWord.split(letter).length - 1 ===
        guessedWord.split(letter).length - 1
      )
        result = [...result, 1];
      else result = [...result, 0];
    } else {
      result = [...result, 0];
    }
  }
  return result;
};

export default comparison;
