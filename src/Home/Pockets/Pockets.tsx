import React, { useState } from "react";
import "./Pockets.css";
import { CURRENCY_SYMBOL, CURRENCYS } from "../../mockData";
import { PocketData, TransactionData } from "../homeTypes";

export type PocketProps = {
  pocket: PocketData | undefined;
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
    return (
      props.pocket &&
      props.pocket.transactions.map((val: TransactionData, index: number) => {
        return (
          <div key={index} className="exchange-entries">
            <div>{val.timestamp}</div>
            <div>
              {val.balance}
              {currentSymbol}
            </div>
          </div>
        );
      })
    );
  };
  return (
    <section className="pocket-container">
      <div className="pocket-currency">
        <div className="currency-balance">
          {props.pocket &&
            props.pocket.balance &&
            props.pocket.balance.toFixed(2)}
          <div className="currency-symbol">{currentSymbol}</div>
        </div>
      </div>
      <div className="exchange-table">
        {props.pocket && props.pocket.transactions && (
          <>
            {getExchangeRowHeader()} {getExchangeEntries()}
          </>
        )}
      </div>
    </section>
  );
};

export default Pocket;
