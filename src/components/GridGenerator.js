import React from 'react';
import { Input } from "antd";
import "./GridGenerator.css";

const GridGenerator = ({ grid, col, row, colChange, rowChange }) => {

  const viewGrid = grid.map(row => (
    <tr>
      {row.map(e => <td className={e === 1 ? "color" : "none-color"}/>)}
    </tr>
  ));

  return (
    <div className={"grid-wrapper"}>
      <table className={"grid"}>
        {viewGrid}
      </table>
      col input: <ColInput col={col} colChange={colChange}/>
      row input: <RowInput row={row} rowChange={rowChange}/>
    </div>
  );
};

export default GridGenerator;

const ColInput = ({ col, colChange }) => {
  const input = [];
  for(let i=0; i<col.length; i++) {
    input.push(
      <Input name={i} size={"small"} onChange={colChange}/>
    );
  }
  input.push(<br/>);
  return input;
};

const RowInput = ({ row, rowChange }) => {
  const input = [];
  for(let i=0; i<row.length; i++) {
    input.push(
      <Input name={i} size={"small"} onChange={rowChange}/>
    );
  }
  return input;
};