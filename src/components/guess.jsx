import React from "react";
import Tile from "./tile";
import { wordLength } from "../constants";

export default function Guess({ key, word, colours }) {
  const getTiles = () => {
    const tiles = [];

    for (let i = 0; i < wordLength; i += 1) {
      if (word) {
        tiles.push(<Tile key={i} letter={word[i]} colour={colours[i]} />);
      } else {
        tiles.push(<Tile key={i} />);
      }
    }

    return tiles;
  };

  return (
    <li key={key} className="guess">
      {getTiles()}
    </li>
  );
}
