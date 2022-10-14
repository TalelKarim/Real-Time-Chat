import express from 'express';
import {protect} from '../middlewares/authMiddleware.js'
import { accessChat } from '../controllers/chatControllers.js';
import { fetchChatState } from '../controllers/chatControllers.js';
import { createGroupChat } from '../controllers/chatControllers.js';
import { renameGroup } from '../controllers/chatControllers.js';
import { addToGroup } from '../controllers/chatControllers.js';
import { removeFromGroup } from '../controllers/chatControllers.js';
const router = express.Router()

router.post('/', protect, accessChat);
router.get('/', protect, fetchChatState);
router.post('/group', protect, createGroupChat);
router.put("/rename", protect,renameGroup );
router.put("/groupRemove", protect,removeFromGroup );
router.put("/groupadd", protect,addToGroup );

export default router