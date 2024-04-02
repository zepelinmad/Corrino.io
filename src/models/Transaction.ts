// src/models/Transaction.ts
export interface Transaction {
    id: string;
    portfolioId: string;
    date: Date;
    ticker: string;
    price: number;
    quantity: number;
    commission: number;
  }