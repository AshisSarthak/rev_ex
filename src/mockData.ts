export const demoPacketData = {
  balance: 100,
  transactions: [
    {
      id: 1,
      timestamp: 1000230,
      balance: 50,
    },
    {
      id: 2,
      timestamp: 1000230,
      balance: 80,
    },
    {
      id: 3,
      timestamp: 1000230,
      balance: 90,
    },
  ],
};

export enum CURRENCY_SYMBOL {
  USD = "$",
  EUR = "€",
  GBP = "£",
}

export enum CURRENCYS {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}
