import React from "react";
import { useDispatch } from "react-redux";

const LeaderboardRow = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <tr className="tableRow">
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.class}</td>
      <td>{data.totalQuiz}</td>
      <td>{data.totalPoints}</td>
    </tr>
  );
};
export default LeaderboardRow;
