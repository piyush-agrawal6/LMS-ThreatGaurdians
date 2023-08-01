import React from "react";

const SalesDiv = ({ Icon, Title, Number }) => {
  return (
    <li>
      <div>{Icon}</div>
      <span className="text">
        <h3>{Number}</h3>
        <p>{Title}</p>
      </span>
    </li>
  );
};

export default SalesDiv;
