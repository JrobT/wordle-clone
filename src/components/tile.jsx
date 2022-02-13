import React from "react";

class Tile extends React.Component {
  getColour = () => {
    const { colour } = this.props;

    switch (colour) {
      case 1:
        return "tile misplaced";
      case 2:
        return "tile correct";
      default:
        return "tile";
    }
  };

  render() {
    const { key, letter } = this.props;

    return (
      <div key={key} className={this.getColour()}>
        <span>{letter}</span>
      </div>
    );
  }
}

export default Tile;
