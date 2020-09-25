import React from "react";
import { shallow } from "enzyme";
import { CURRENCYS, demoPacketData, CURRENCY_SYMBOL } from "../../mockData";
import Pocket, { getCurrencySymbol } from "./Pockets";

describe("Pockets Element", () => {
  it("gets the respective symbol", () => {
    expect(getCurrencySymbol(CURRENCYS.EUR)).toBe(CURRENCY_SYMBOL.EUR);
    expect(getCurrencySymbol(CURRENCYS.USD)).toBe(CURRENCY_SYMBOL.USD);
    expect(getCurrencySymbol(CURRENCYS.GBP)).toBe(CURRENCY_SYMBOL.GBP);
  });

  it("Loads the default Dropdown", () => {
    const wrapper = shallow(
      <Pocket pocket={undefined} currency={CURRENCYS.EUR} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("Loads the Pockets component with full data", () => {
    const wrapper = shallow(
      <Pocket pocket={demoPacketData} currency={CURRENCYS.EUR} />
    );

    const symbol = wrapper.find(".currency-symbol").at(0);
    const balance = wrapper.find(".currency-balance").at(0);

    expect(symbol.children().at(0).text()).toBe(
      getCurrencySymbol(CURRENCYS.EUR)
    );
    expect(balance.children().at(0).text()).toBe(
      demoPacketData.balance.toFixed(2)
    );

    const tableRow = wrapper.find(".exchange-entries");
    const individualRow = tableRow.at(1);
    expect(individualRow.children().at(0).text()).toBe(
      demoPacketData.transactions[0].timestamp + ""
    );
    expect(individualRow.children().at(1).text()).toBe(
      `${demoPacketData.transactions[0].balance}${getCurrencySymbol(
        CURRENCYS.EUR
      )}`
    );
    expect(tableRow).toHaveLength(demoPacketData.transactions.length + 1);
  });

  it("Loads the Pockets component with blank transaction Data data", () => {
    const newProps = { ...demoPacketData };
    newProps.transactions = [];
    const wrapper = shallow(
      <Pocket pocket={newProps} currency={CURRENCYS.EUR} />
    );

    const symbol = wrapper.find(".currency-symbol").at(0);
    const balance = wrapper.find(".currency-balance").at(0);
    expect(symbol.children().at(0).text()).toBe(
      getCurrencySymbol(CURRENCYS.EUR)
    );
    expect(balance.children().at(0).text()).toBe(
      demoPacketData.balance.toFixed(2)
    );
    const tableRow = wrapper.find(".exchange-entries");
    expect(tableRow).toHaveLength(newProps.transactions.length + 1);
  });
});
