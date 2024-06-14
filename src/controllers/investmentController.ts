import { Request, Response } from 'express';
const { db } = require('../db');

// Get all investments
export const getAllInvestments = async (req: Request, res: Response) => {
  try {
    const investments = await db.investment.findAll();
    res.json(investments);
  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new investment
export const createInvestment = async (req: Request, res: Response) => {
  // Extract data from request body
  const { userId, amount } = req.body;

  try {
    const newInvestment = await db.investment.create({ userId, amount });
    res.status(201).json(newInvestment);
  } catch (error) {
    console.error('Error creating investment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an investment
export const updateInvestment = async (req: Request, res: Response) => {
  // Extract investment ID from request parameters
  const { id } = req.params;
  // Extract updated data from request body
  const { amount } = req.body;

  try {
    const investment = await db.investment.findByPk(id);
    if (!investment) {
      return res.status(404).json({ error: 'Investment not found' });
    }
    investment.amount = amount;
    await investment.save();
    res.json(investment);
  } catch (error) {
    console.error('Error updating investment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an investment
export const deleteInvestment = async (req: Request, res: Response) => {
  // Extract investment ID from request parameters
  const { id } = req.params;

  try {
    const investment = await db.investment.findByPk(id);
    if (!investment) {
      return res.status(404).json({ error: 'Investment not found' });
    }
    await investment.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting investment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};