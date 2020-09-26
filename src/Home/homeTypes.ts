export type RawFX = {
  rates: Map<string, number>;
  base: string;
  date: string;
};

export type TransactionData = {
  id: number;
  timestamp: number;
  balance: number;
};

export type PocketData = {
  balance: number;
  transactions: Array<TransactionData>;
};
