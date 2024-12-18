import express from 'express';
import { getMessages, sendMesssage } from '../Controllers/messageController.js';
import { protectRoute } from '../Middleware/protectRoute.js';

const router = express.Router();

router.post('/send/:id',protectRoute,sendMesssage);
router.get('/:id',protectRoute,getMessages);
export default router;