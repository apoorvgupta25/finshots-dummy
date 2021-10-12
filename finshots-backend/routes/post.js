const express = require('express')
const router = express.Router()

const {getPostById, createPost, getPost, photo, updatePost, deletePost, getAllPosts, getAllUniqueCategories} = require('../controllers/post')
const {getUserById} = require('../controllers/user')
const {isSignedIn, isAuthenticated} = require('../controllers/auth')

router.param('postId', getPostById);
router.param('userId', getUserById);

router.post('/daily/create/:userId/', isSignedIn, isAuthenticated, createPost);

router.get('/daily/:postId', getPost);
router.get('/daily/photo/:postId', photo);

router.put('/daily/:userId/:postId/',isSignedIn, isAuthenticated, updatePost);

router.delete('/daily/:userId/:postId/',isSignedIn, isAuthenticated, deletePost);

router.get('/daily', getAllPosts);

router.get('/categories', getAllUniqueCategories);

module.exports = router;
