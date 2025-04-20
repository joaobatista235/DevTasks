import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback';

interface Payload {
  id: string;
  email: string;
}

export const generateToken = (payload: Payload) => {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: '1h' });
};
