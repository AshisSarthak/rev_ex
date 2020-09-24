import React from "react";
import "../Exchange/Exchange.css";

export type InputElProps = {
  value: number | undefined;
  onChange?: Function;
  disabled?: boolean;
};

const InputEl = (props: InputElProps) => {
  const handleInputChange = (event: any) => {
    props.onChange!(event.target.value);
  };

  return (
    <input
      type="number"
      className="exchange-from-input"
      step=".01"
      placeholder="Enter Amount"
      onChange={handleInputChange}
      value={props.value}
      disabled={props.disabled}
    ></input>
  );
};

export default InputEl;
