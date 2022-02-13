import React from "react";

function getLettersRow(letterGroup) {
  const row = [];
  for (let i = 0; i < letterGroup.length; i += 1) {
    row.push(<span className="letter">{letterGroup[i]}</span>);
  }
  return row;
}

export default class Info extends React.Component {
  getLetters() {
    const { letterGroups } = this.props;
    const letters = [];
    letterGroups.forEach((letterGroup) =>
      letters.push(<div>{getLettersRow(letterGroup)}</div>)
    );
    return letters;
  }

  render() {
    return <div className="letters">{this.getLetters()}</div>;
  }
}
