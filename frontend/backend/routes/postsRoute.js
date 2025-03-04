import express from 'express';
import * as postController from '../controllers/postsController.js';

const router = express.Router();

router.get('/allPosts', postController.getAllPosts);
router.post('/create', postController.createPost);
router.put('/updatePost', postController.updatePost);
router.delete('/deletePost', postController.deletePost);
router.get('/:id', postController.getPostById);

export default router;
