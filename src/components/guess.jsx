import React from "react";
import Tile from "./tile";
import { wordLength } from "../constants";

const Guess = (props) => {
  const getTiles = (props) => {
    const tiles = [];

    for (let i = 0; i < wordLength; i++) {
      if (props.word) {
        tiles.push(
          <Tile
            key={i}
            letter={props.word[i]}
            colour={props.colours[i]}
          />
        );
      } else {
        tiles.push(<Tile key={i} />);
      }
    }

    return tiles;
  };

  return (
    <li key={props.key} className="guess">
      {getTiles(props)}
    </li>
  );
};

export default Guess;
