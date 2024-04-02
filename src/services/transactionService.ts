// src/services/transactionService.ts

import prisma from '../utils/prismaClient';

// Existing function to add a transaction
export const addTransactionToPortfolio = async (
  portfolioId: string,
  date: Date,
  ticker: string,
  price: number,
  quantity: number,
  commission: number
) => {
  return await prisma.transaction.create({
    data: { portfolioId, date, ticker, price, quantity, commission },
  });
};

// New function to update a transaction
export const updateTransaction = async (
  transactionId: string,
  date: Date,
  ticker: string,
  price: number,
  quantity: number,
  commission: number
) => {
  return await prisma.transaction.update({
    where: { id: transactionId },
    data: { date, ticker, price, quantity, commission },
  });
};

// New function to delete a transaction
export const deleteTransaction = async (transactionId: string) => {
  return await prisma.transaction.delete({
    where: { id: transactionId },
  });
};
