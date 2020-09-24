import { demoPacketData } from "../mockData";

export const defaultState = {
  fxRates: undefined,
  pockets: {
    gbp: { ...demoPacketData },
    usd: { ...demoPacketData },
    eur: { ...demoPacketData },
  },
};

const homeReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case "FETCH_FX_RATE":
      return {
        ...state,
        fxRates: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
