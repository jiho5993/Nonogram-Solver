import React from 'react';
import './App.css';
import InputInfo from "./components/InputInfo";
import GridGenerator from "./components/GridGenerator";
import Solve from "./components/Solve";
import { DEFAULT_SIZE, DEFAULT_GRID, DEFAULT_COL, DEFAULT_ROW } from "./default.json";

const App = () => {

  const [size, setSize] = React.useState(DEFAULT_SIZE); // 0: width, 1: height
  const [grid, setGrid] = React.useState(DEFAULT_GRID);
  const [colInput, setColInput] = React.useState(DEFAULT_COL);
  const [rowInput, setRowInput] = React.useState(DEFAULT_ROW);

  const getColChange = (e) => {
    const { name, value } = e.target;
    const data = value.split(", ");
    for(let i=0; i<data.length; i++) data[i] = parseInt(data[i]);
    let newCol = colInput;
    newCol[name] = data;
    setColInput(newCol);
  }
  const getRowChange = (e) => {
    const { name, value } = e.target;
    const data = value.split(", ");
    for(let i=0; i<data.length; i++) data[i] = parseInt(data[i]);
    let newRow = rowInput;
    newRow[name] = data;
    setColInput(newRow);
  }
  const onSizeChange = (newSize) => {
    setSize(newSize);
    gridGenerate(newSize);
    inputGenerate(newSize);
  }

  const gridGenerate = (newSize) => {
    const gridArr = [];
    for(let i=0; i<newSize[1]; i++) {
      gridArr.push([]);
      for(let j=0; j<newSize[0]; j++) gridArr[i].push(0);
    }
    setGrid(gridArr);
  }

  const inputGenerate = (newSize) => {
    const col = [], row = [];
    for(let i=0; i<newSize[0]; i++) col.push([]);
    for(let i=0; i<newSize[1]; i++) row.push([]);
    setColInput(col);
    setRowInput(row);
  }

  const runSolve = (answer) => {
    setGrid(answer);
  }

  return (
    <div className={"main"}>
      <header>Nonogram Solver</header>
      <InputInfo size={size} onChange={onSizeChange}/>
      <GridGenerator grid={grid} col={colInput} row={rowInput} colChange={getColChange} rowChange={getRowChange}/>
      <Solve width={size[0]} height={size[1]} colHints={colInput} rowHints={rowInput} run={runSolve}/>
    </div>
  )
};

export default App;