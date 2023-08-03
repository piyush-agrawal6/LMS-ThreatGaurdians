import React from "react";
import "./Table.css";
import TableRow from "./TableRow";

const Table = ({ Data }) => {
  return (
    <section className="tableBody">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Access</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Data?.map((data, i) => {
            return <TableRow data={data} key={i} />;
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
