import { Request, Response } from 'express';
const { db } = require('../db');

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  // Extract data from request body
  const { username, email, password } = req.body;

  try {
    const newUser = await db.user.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  // Extract user ID from request parameters
  const { id } = req.params;
  // Extract updated data from request body
  const { username, email, password } = req.body;

  try {
    const user = await db.user.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Update user attributes
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  // Extract user ID from request parameters
  const { id } = req.params;

  try {
    const user = await db.user.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email: email, password: password } });

    if (user) {
      res.json(user);
    }
    else {
      res.json(false);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};