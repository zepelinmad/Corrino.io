import { CashFlow } from "./CashFlow";
import { Transaction } from "./Transaction";

export interface Portfolio {
    id: string;
    userId: string;
    balance: number;
    currency: string;
    transactions: Transaction[];
    cashFlows: CashFlow[];
  }