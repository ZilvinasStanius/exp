import User from '../models/UserModel.js';
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/session', userController.getSessionData);

export default router;
