import { Router } from 'express';
import { chatMessage } from '../controllers/chatController';

const router = Router();

router.post('/chat', chatMessage);

export default router;