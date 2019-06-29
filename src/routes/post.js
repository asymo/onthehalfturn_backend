const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post');
const extractFile = require('../middleware/file');

router.get('', PostController.getPosts);
router.post('', extractFile, PostController.createPost);
router.get('/:id', PostController.getPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;