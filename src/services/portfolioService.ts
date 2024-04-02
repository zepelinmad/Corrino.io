// src/services/portfolioService.ts

import prisma from '../utils/prismaClient';

export const createPortfolio = async (userId: string, balance: number, currency: string) => {
  return await prisma.portfolio.create({
    data: { userId, balance, currency },
  });
};

export const getPortfolioByUserId = async (userId: string) => {
  return await prisma.portfolio.findUnique({
    where: { userId },
  });
};

export const updatePortfolio = async (userId: string, balance?: number, currency?: string) => {
  return await prisma.portfolio.update({
    where: { userId },
    data: { ...(balance && { balance }), ...(currency && { currency }) },
  });
};
