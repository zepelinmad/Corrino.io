// src/models/CashFlow.ts
export interface CashFlow {
    id: string;
    portfolioId: string;
    date: Date;
    amount: number;
    type: 'inflow' | 'outflow';
  }