import { defaultState } from "./homeReducer";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "jest-fetch-mock";
import { convertToPocket, fetchCurrentFXRate } from "./homeAction";
import { CURRENCYS } from "../mockData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const mockResponse = {
  rates: {
    CAD: 1.3396307428,
    HKD: 7.7501073422,
    ISK: 138.9437526836,
    PHP: 48.5590382138,
    DKK: 6.3911550021,
    HUF: 312.9669386003,
    CZK: 23.1987977673,
    GBP: 0.7834091885,
    RON: 4.1867754401,
    SEK: 9.0848432804,
    IDR: 14890.0042936883,
    INR: 73.9497638471,
    BRL: 5.5762129669,
    RUB: 77.1758694719,
    HRK: 6.4860455131,
    JPY: 105.3928724775,
    THB: 31.6195792185,
    CHF: 0.9250322027,
    EUR: 0.8587376556,
    MYR: 4.168484328,
    BGN: 1.6795191069,
    TRY: 7.6299699442,
    CNY: 6.8292829541,
    NOK: 9.5339630743,
    NZD: 1.532589094,
    ZAR: 17.0609703736,
    USD: 1.0,
    MXN: 22.4183769858,
    SGD: 1.3764705882,
    AUD: 1.4202662087,
    ILS: 3.4783168742,
    KRW: 1174.366680979,
    PLN: 3.8894804637,
  },
  base: "USD",
  date: "2020-09-24",
};

describe("Home actions creators", () => {
  let store;
  beforeEach(() => {
    store = mockStore({ fxRates: { ...defaultState } });
    store.clearActions();
  });
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("should perfrom the Fetch FX rates Action for default Currency", () => {
    const response = { ...mockResponse };
    fetchMock.once(JSON.stringify(response));
    const expectedActions = [
      {
        type: "FETCH_FX_RATE",
        payload: response,
      },
    ];
    return store.dispatch(fetchCurrentFXRate()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      expect(store.getActions()[0].payload.base).toEqual(CURRENCYS.USD);
    });
  });

  it("should perfrom the Fetch FX rates Action for default Currency", () => {
    const newResponse = { ...mockResponse, base: CURRENCYS.EUR };
    fetchMock.once(JSON.stringify(newResponse));
    const expectedActions = [
      {
        type: "FETCH_FX_RATE",
        payload: newResponse,
      },
    ];
    return store.dispatch(fetchCurrentFXRate(CURRENCYS.EUR)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      expect(store.getActions()[0].payload.base).toEqual(CURRENCYS.EUR);
    });
  });

  it("should perfrom the Convert feature for pockets", async () => {
    const jsdomAlert = window.alert; // remember the jsdom alert
    window.alert = () => {}; // provide an empty implementation for window.alert
    const expectedActions = [
      {
        type: "DEDUCT_FROM_POCKET",
        fromAmount: 10,
        fromCurrency: CURRENCYS.USD,
      },
      {
        type: "Add_TO_POCKET",
        toAmount: 10,
        toCurrency: CURRENCYS.EUR,
      },
    ];
    return store
      .dispatch(
        convertToPocket({
          fromAmount: 10,
          fromCurrency: CURRENCYS.USD,
          toAmount: 10,
          toCurrency: CURRENCYS.EUR,
        })
      )
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    window.alert = jsdomAlert;
  });

  it("should perfrom the Convert feature for pockets where there is insufficient funds", async () => {
    const jsdomAlert = window.alert; // remember the jsdom alert
    window.alert = () => {}; // provide an empty implementation for window.alert

    const expectedActions = [];
    return store
      .dispatch(
        convertToPocket({
          fromAmount: 1000,
          fromCurrency: CURRENCYS.USD,
          toAmount: 10,
          toCurrency: CURRENCYS.EUR,
        })
      )
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    window.alert = jsdomAlert;
  });
});
