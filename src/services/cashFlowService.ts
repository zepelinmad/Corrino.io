// src/services/cashFlowService.ts

import prisma from '../utils/prismaClient';

// Function to add a cash flow
export const addCashFlow = async (
  portfolioId: string,
  date: Date,
  amount: number,
  type: 'INFLow' | 'OUTFLOW'
) => {
  return await prisma.cashFlow.create({
    data: { portfolioId, date, amount, type },
  });
};

// Function to update a cash flow
export const updateCashFlow = async (
  cashFlowId: string,
  date: Date,
  amount: number,
  type: 'INFLow' | 'OUTFLOW'
) => {
  return await prisma.cashFlow.update({
    where: { id: cashFlowId },
    data: { date, amount, type },
  });
};

// Function to delete a cash flow
export const deleteCashFlow = async (cashFlowId: string) => {
  return await prisma.cashFlow.delete({
    where: { id: cashFlowId },
  });
};
