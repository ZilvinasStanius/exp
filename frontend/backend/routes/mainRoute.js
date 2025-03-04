import express from 'express';
import postsRoute from './postsRoute.js';
import userRoute from './userRoute.js';

const router = express.Router();

router.use('/posts', postsRoute);
router.use('/users', userRoute);

export default router;
