import React from "react";

function Suggestion(props) {
  const { suggestion } = props;

  return (
    <div>
      <p className="suggestion">Try &quot;{suggestion}&quot;</p>
    </div>
  );
}

export default Suggestion;
