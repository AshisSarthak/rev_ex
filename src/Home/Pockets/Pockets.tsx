import React, { useState } from "react";
import "./Pockets.css";
import { CURRENCY_SYMBOL, CURRENCYS } from "../../mockData";

export type PocketProps = {
  pocket: any;
  currency: string;
};

export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case CURRENCYS.USD:
      return CURRENCY_SYMBOL.USD;
    case CURRENCYS.EUR:
      return CURRENCY_SYMBOL.EUR;
    default:
      return CURRENCY_SYMBOL.GBP;
  }
};

const Pocket = (props: PocketProps) => {
  const [currentSymbol] = useState(getCurrencySymbol(props.currency));

  const getExchangeRowHeader = () => (
    <div className="exchange-entries">
      <div className="exchange-header">Timestamp</div>
      <div className="exchange-header">Balance</div>
    </div>
  );

  const getExchangeEntries = () => {
    return props.pocket.transactions.map((val: any, index: number) => {
      return (
        <div key={index} className="exchange-entries">
          <div>{val.timestamp}</div>
          <div>
            {val.balance}
            {currentSymbol}
          </div>
        </div>
      );
    });
  };
  return (
    <section className="pocket-container">
      <div className="pocket-currency">
        <div className="currency-balance">
          {props.pocket.balance}
          <div className="currency-symbol">{currentSymbol}</div>
        </div>
      </div>
      <div className="exchange-table">
        {getExchangeRowHeader()}
        {getExchangeEntries()}
      </div>
    </section>
  );
};

export default Pocket;