import { Router, RequestHandler } from 'express';
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = Router();

router.get('/users', getUsers as RequestHandler);
router.post('/users', createUser as RequestHandler);
router.get('/users/:id', getUserById as RequestHandler);
router.put('/users/:id', updateUser as RequestHandler);
router.delete('/users/:id', deleteUser as RequestHandler);

export default router;
