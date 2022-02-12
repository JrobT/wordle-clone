import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    this.props.children,
    <div className="overlay">
      <h1 className="result-heading">
        {props.result ? "Well done!" : "Better luck next time!"}
      </h1>
    </div>
  );
};

const Result = (props) => {
  return (
    <div>
      {props.show && <Modal in={props.show}>Click anywhere to close</Modal>}
    </div>
  );
};

export default Result;
