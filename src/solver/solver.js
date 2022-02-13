import raw from "../data/words.txt";

async function fetchWordlistAsArray() {
  return fetch(raw)
    .then((r) => r.text())
    .then((contents) => contents.split(/\r?\n/));
}

export const getRandomWord = async () => {
  const words = await fetchWordlistAsArray();
  console.log(`Number of possible words: ${words.length}`);
  return words[Math.floor(Math.random() * words.length)];
};

export default getRandomWord;
