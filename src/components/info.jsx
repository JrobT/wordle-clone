import React from "react";

export default class Info extends React.Component {
  getLettersRow = (letterGroup) => {
    const row = [];
    for (let i = 0; i < letterGroup.length; i++) {
        row.push(<span className="letter">{letterGroup[i]}</span>);
    }
    return row;
  }

  getLetters = () => {
    const letters = []
    this.props.letterGroups.forEach(letterGroup => letters.push(<div>{this.getLettersRow(letterGroup)}</div>));
    return letters;
  };

  render() {
    return (
      <div className="letters">
        {this.getLetters()}
      </div>
    );
  }
}
