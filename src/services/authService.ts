import bcrypt from 'bcryptjs';
import { getFirestore } from 'firebase-admin/firestore';
import { generateToken } from '../utils/generateToken';

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export const registerUserService = async ({ name, email, password }: RegisterDTO) => {
  if (!name || !email || !password) {
    throw new Error('Todos os campos são obrigatórios');
  }

  const db = getFirestore();
  const usersRef = db.collection('users');
  const existing = await usersRef.where('email', '==', email).get();

  if (!existing.empty) {
    throw new Error('Email já está em uso');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserRef = usersRef.doc();
  const newUser = {
    id: newUserRef.id,
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  await newUserRef.set(newUser);

  const token = generateToken({ id: newUser.id, email: newUser.email });

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  };
};
