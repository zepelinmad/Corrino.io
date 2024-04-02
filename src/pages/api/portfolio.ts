// src/pages/api/portfolio.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { createPortfolio, getPortfolioByUserId, updatePortfolio } from '../../services/portfolioService';

// Mock database interface for demonstration purposes
const database = {
  getUserPortfolio: async (userId: string) => {
    // Implement database logic to fetch the user's portfolio
  },
  createUserPortfolio: async (userId: string, portfolioData: any) => {
    // Implement database logic to create a new portfolio
  },
  updateUserPortfolio: async (userId: string, updates: any) => {
    // Implement database logic to update the portfolio
  },
  deleteUserPortfolio: async (userId: string) => {
    // Implement database logic to delete the portfolio
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Using getAuth to retrieve the userId from the session
  const auth = getAuth(req);
  if (!auth.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = auth.userId;

  switch (req.method) {
    case 'POST':
      // Create a new portfolio
      try {
        const portfolioData = req.body;
        await database.createUserPortfolio(userId, portfolioData);
        res.status(201).json({ message: 'Portfolio created successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
      break;

    case 'GET':
      // Retrieve the user's portfolio
      try {
        const portfolio = await database.getUserPortfolio(userId);
        res.status(200).json(portfolio);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
      break;

    case 'PUT':
      // Update the user's portfolio
      try {
        const updates = req.body;
        await database.updateUserPortfolio(userId, updates);
        res.status(200).json({ message: 'Portfolio updated successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
      break;

    case 'DELETE':
      // Delete the user's portfolio
      try {
        await database.deleteUserPortfolio(userId);
        res.status(200).json({ message: 'Portfolio deleted successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
