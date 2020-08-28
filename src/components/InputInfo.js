import React from 'react';
import { InputNumber } from 'antd';
import 'antd/dist/antd.css';

const InputInfo = ({ size, onChange }) => {

  const changeWidth = (value) => onChange([value, size[1]]);
  const changeHeight = (value) => onChange([size[0], value]);

  return (
    <div style={{ margin: "5px" }}>
      <InputNumber
        className={"width"}
        defaultValue={size[0]}
        min={1}
        max={20}
        onChange={changeWidth}
      />
      {" X "}
      <InputNumber
        className={"height"}
        defaultValue={size[1]}
        min={1}
        max={20}
        onChange={changeHeight}
      />
    </div>
  )
};

export default InputInfo;