import { EXCHANGE_API } from "./homeConstants";
import { RawFX } from "./homeTypes";

export const fetchCurrentFXRateAction = (rawFxRates: RawFX) => ({
  type: "FETCH_FX_RATE",
  payload: rawFxRates,
});

export const fetchCurrentFXRate = (baseCurrency: string = "USD") => async (
  dispatch: any
): Promise<void> => {
  const fxRates: RawFX = await fetch(
    `${EXCHANGE_API}${baseCurrency}`
  ).then((resp) => resp.json());
  dispatch(fetchCurrentFXRateAction(fxRates));
};

export const deductFromBasePocketAction = (
  fromAmount: number,
  fromCurrency: string
) => ({
  type: "DEDUCT_FROM_POCKET",
  fromAmount,
  fromCurrency,
});

export const addToPocketAction = (toAmount: number, toCurrency: string) => ({
  type: "Add_TO_POCKET",
  toAmount,
  toCurrency,
});

export const convertToPocket = ({
  fromAmount,
  fromCurrency,
  toAmount,
  toCurrency,
}) => async (dispatch: any, getState: any): Promise<void> => {
  const targetPocket = getState().fxRates.pockets[fromCurrency];
  if (targetPocket.balance > fromAmount) {
    dispatch(deductFromBasePocketAction(fromAmount, fromCurrency));
    dispatch(addToPocketAction(toAmount, toCurrency));
  } else {
    alert("Insufficient Funds");
  }

  // dispatch(convertToPocketAction({}));
};
