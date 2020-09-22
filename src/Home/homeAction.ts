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
  console.log(fxRates);
  dispatch(fetchCurrentFXRateAction(fxRates));
};
