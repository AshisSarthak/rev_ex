export const defaultState = {
  fxRates: undefined,
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
