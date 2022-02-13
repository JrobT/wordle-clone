import raw from "../data/words.txt";

async function fetchWordlistAsArray() {
  return fetch(raw)
    .then((r) => r.text())
    .then((contents) => contents.split(/\r?\n/));
}

export const getRandomWord = async () => {
  const words = await fetchWordlistAsArray();
  return words[Math.floor(Math.random() * words.length)];
};

export const getSuggestion = () => "word";

export default getRandomWord;
