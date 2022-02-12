import React from "react";

class Tile extends React.Component {
  getColour = () => {
    switch (this.props.colour) {
      case 1:
        return "tile misplaced";
      case 2:
        return "tile correct";
      default:
        return "tile"
    }
  };

  render() {
    return (
      <div
        key={this.props.key}
        className={this.getColour()}
      >
        <span>{this.props.letter}</span>
      </div>
    );
  }
}

export default Tile;
