import React from "react";
import fetchMock from "jest-fetch-mock";
import { shallow } from "enzyme";
import { Exchange } from "./Exchange";
import { mockResponse } from "../homeAction.test";
import SelectEl from "../Common/Select";
import { CURRENCYS } from "../../mockData";
import InputEl from "../Common/Input";

describe("Exchange Section", () => {
  const currencyChangeHandler = jest.fn();
  const covertActionHandler = jest.fn();
  const rateMap: Map<string, number> = new Map();
  rateMap.set("USD", 10);
  rateMap.set("GBP", 10);
  rateMap.set("EUR", 10);

  const staticFXRate = {
    rates: rateMap,
    base: "USD",
    date: "122333434",
  };
  it("Loads the default Exchange section", () => {
    const wrapper = shallow(
      <Exchange
        fxRate={staticFXRate}
        fetchCurrentFXRate={currencyChangeHandler}
        convertToPocket={covertActionHandler}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("Change in From Currency dropdown", async () => {
    const response = { ...mockResponse };
    fetchMock.once(JSON.stringify(response));
    const wrapper = shallow(
      <Exchange
        fxRate={staticFXRate}
        fetchCurrentFXRate={currencyChangeHandler}
        convertToPocket={covertActionHandler}
      />
    );

    const selectEls = wrapper.find(SelectEl);
    expect(selectEls).toHaveLength(2);
    expect(wrapper.state("toCurrencyList")).toMatchObject([
      CURRENCYS.EUR,
      CURRENCYS.GBP,
    ]);
    expect(wrapper.state("toCurrency")).toBe(CURRENCYS.EUR);
    expect(wrapper.state("toAmount")).toBeUndefined();
    expect(wrapper.state("fromAmount")).toBeUndefined();

    const fromSelect = selectEls.at(0);
    fromSelect.simulate("change", CURRENCYS.EUR);
    expect(currencyChangeHandler).toBeCalledWith(CURRENCYS.EUR);

    await wrapper.update();
    expect(wrapper.state("toCurrency")).toBe(CURRENCYS.USD);
    expect(wrapper.state("toAmount")).toBeNaN();
    expect(wrapper.state("fromAmount")).toBeUndefined();
    expect(wrapper.state("toCurrencyList")).toMatchObject([
      CURRENCYS.USD,
      CURRENCYS.GBP,
    ]);

    wrapper.setState({
      fromAmount: 10,
    });
    await wrapper.update();
    expect(wrapper.state("toAmount")).toBe(staticFXRate[CURRENCYS.EUR] * 10);
  });

  it("Change in the From Amount text box", async () => {
    const wrapper = shallow(
      <Exchange
        fxRate={staticFXRate}
        fetchCurrentFXRate={currencyChangeHandler}
        convertToPocket={covertActionHandler}
      />
    );
    const inputEls = wrapper.find(InputEl);
    expect(inputEls).toHaveLength(2);

    const fromInput = inputEls.at(0);
    fromInput.simulate("change", 5);
    await wrapper.update();
    expect(wrapper.state("toAmount")).toBe(
      staticFXRate.rates[wrapper.state("toCurrency")] * 5
    );

    fromInput.simulate("change", "asdd");
    await wrapper.update();
    expect(wrapper.state("toAmount")).toBeNaN();
  });

  it("Change in the To Currency dropdown", async () => {
    const wrapper = shallow(
      <Exchange
        fxRate={staticFXRate}
        fetchCurrentFXRate={currencyChangeHandler}
        convertToPocket={covertActionHandler}
      />
    );
    const selectEls = wrapper.find(SelectEl);

    const toCurr = selectEls.at(1);
    toCurr.simulate("change", CURRENCYS.GBP);

    await wrapper.update();
    expect(wrapper.state("toCurrency")).toBe(CURRENCYS.GBP);
  });

  it("Handle click of convert button", async () => {
    const wrapper = shallow(
      <Exchange
        fxRate={staticFXRate}
        fetchCurrentFXRate={currencyChangeHandler}
        convertToPocket={covertActionHandler}
      />
    );
    const convertBtn = wrapper.find("button").at(0);
    convertBtn.simulate("click");
    expect(covertActionHandler).toBeCalledWith({
      fromAmount: wrapper.state("fromAmount"),
      fromCurrency: wrapper.state("fromCurrency"),
      toAmount: wrapper.state("toAmount"),
      toCurrency: wrapper.state("toCurrency"),
    });
  });
});
