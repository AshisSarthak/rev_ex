import React from "react";
import { CURRENCYS } from "../../mockData";
import "../Exchange/Exchange.css";

export type SelectElProps = {
  currentVal: CURRENCYS;
  optionLists: Array<CURRENCYS>;
  onChange: Function;
};

const SelectEl = (props: SelectElProps) => {
  const handleSelectChange = (event: any) => {
    props.onChange(event.target.value);
  };
  return (
    <select
      className="exchange-from-select"
      value={props.currentVal}
      onChange={handleSelectChange}
    >
      {props.optionLists.map((val) => (
        <option key={val} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default SelectEl;
