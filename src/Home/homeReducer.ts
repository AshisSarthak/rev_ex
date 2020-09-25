import { demoPacketData } from "../mockData";

export const defaultState = {
  fxRates: undefined,
  pockets: {
    GBP: { ...demoPacketData },
    USD: { ...demoPacketData },
    EUR: { ...demoPacketData },
  },
};

export const changeAmountInPocket = (
  state,
  currency,
  amount,
  shouldDeduct = true
) => {
  const oldEntires = [...state.pockets[currency].transactions];
  oldEntires.push({
    id: oldEntires.length,
    timestamp: new Date().getDate(),
    balance: amount,
  });
  return {
    ...state,
    pockets: {
      ...state.pockets,
      [currency]: {
        balance: shouldDeduct
          ? state.pockets[currency].balance - amount
          : state.pockets[currency].balance + amount,
        transactions: oldEntires,
      },
    },
  };
};

const homeReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case "FETCH_FX_RATE":
      return {
        ...state,
        fxRates: action.payload,
      };
    case "DEDUCT_FROM_POCKET":
      return changeAmountInPocket(
        state,
        action.fromCurrency,
        action.fromAmount
      );
    case "Add_TO_POCKET":
      return changeAmountInPocket(
        state,
        action.toCurrency,
        action.toAmount,
        false
      );
    default:
      return state;
  }
};

export default homeReducer;
