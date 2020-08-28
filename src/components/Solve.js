import React from "react";
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { nonogramSolve } from '../utils';

const Solve = ({ width, height, colHints, rowHints, run }) => {

  const runNonogramSolve = () => {
    run(nonogramSolve(width, height, colHints, rowHints));
  }

  return (
    <div>
      <Button
        style={{ margin: "5px", width: "100px", background: "#1890ff" }}
        onClick={runNonogramSolve}
      >
        Run
      </Button>
    </div>
  )
};

export default Solve;