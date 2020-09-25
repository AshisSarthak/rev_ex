import { CURRENCYS } from "./../mockData";
import homeReducer, { defaultState } from "./homeReducer";

describe("Home Reducers", () => {
  it("gets fetch FX rates", () => {
    const reducer = homeReducer(defaultState, {
      type: "FETCH_FX_RATE",
      payload: "demo",
    });

    expect(reducer.fxRates).toBe("demo");
  });

  it("returns the default state when unhandled action is called", () => {
    const reducer = homeReducer(defaultState, {
      type: "DEMO",
    });

    expect(reducer).toMatchObject(defaultState);
  });

  it("returns the default state when unhandled action is called", () => {
    const reducer = homeReducer(undefined, {
      type: "DEMO",
    });

    expect(reducer).toMatchObject(defaultState);
  });

  it("gets Deduct from amount", () => {
    const reducer = homeReducer(defaultState, {
      type: "DEDUCT_FROM_POCKET",
      fromCurrency: CURRENCYS.USD,
      fromAmount: 10,
    });

    expect(reducer.pockets.USD).toMatchObject({
      balance: defaultState.pockets.USD.balance - 10,
      transactions: [
        ...defaultState.pockets.USD.transactions,
        {
          id: defaultState.pockets.USD.transactions.length,
          balance: 10,
          timestamp: new Date().getDate(),
        },
      ],
    });
  });

  it("gets Added to the pocket amount", () => {
    const reducer = homeReducer(defaultState, {
      type: "Add_TO_POCKET",
      toCurrency: CURRENCYS.EUR,
      toAmount: 10,
    });

    expect(reducer.pockets.EUR).toMatchObject({
      balance: defaultState.pockets.EUR.balance + 10,
      transactions: [
        ...defaultState.pockets.EUR.transactions,
        {
          id: defaultState.pockets.EUR.transactions.length,
          balance: 10,
          timestamp: new Date().getDate(),
        },
      ],
    });
  });
});
