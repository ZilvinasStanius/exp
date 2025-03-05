import express from 'express';
import * as postController from '../controllers/postsController.js';

const router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/create', postController.createPost);
router.put('/updatePost/:id', postController.updatePost);
router.delete('/deletePost/:id', postController.deletePost);
router.get('/:id', postController.getPostById);

export default router;
