import { RequestHandler, Request, Response } from 'express';
import { registerUserService } from '../services/authService';
import { users } from './userController';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const userData = await registerUserService({ name, email, password });

    res.status(201).json(userData);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const token = generateToken({ id: String(user.id), email: user.email });
    res.json({ token });
};