import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prismaClient'; // Adjust the import path as necessary
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          portfolio: {
            userId,
          },
        },
      });
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { date, ticker, price, quantity, commission, portfolioId } = req.body;

    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          date: new Date(date),
          ticker,
          price,
          quantity,
          commission,
          portfolioId,
        },
      });

      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Failed to create transaction:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}