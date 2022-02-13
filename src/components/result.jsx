import React from "react";
import ReactHtmlParser from "html-react-parser";

function Result(props) {
  const { foundWord, chosenWord } = props;
  const success = "Well done!";
  const failure = "Better luck next time.";
  const answer = `The word was <b style="color: ${foundWord ? "green" : "red"};">${chosenWord}</b>`;

  const handleClick = () => window.location.reload(true);

  return (
    <div className="overlay" onClick={() => handleClick()} aria-hidden="true">
      <h1>{foundWord ? success : failure}</h1>
      <h2>{ReactHtmlParser(answer)}</h2>
      <h4>Click anywhere to close.</h4>
    </div>
  );
}

export default Result;
