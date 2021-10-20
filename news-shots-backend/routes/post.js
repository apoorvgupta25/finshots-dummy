const express = require('express')
const router = express.Router()

const {getPostByLink, createPost, getPost, photo, updatePost, deletePost, getAllPosts, getAllUniqueCategories, getAllCategoryPosts} = require('../controllers/post')
const {getUserById} = require('../controllers/user')
const {getCategoryByName} = require('../controllers/category')
const {isSignedIn, isAuthenticated} = require('../controllers/auth')

router.param('postName', getPostByLink);
router.param('userId', getUserById);
router.param('categoryName', getCategoryByName);

router.post('/daily/create/:userId/', isSignedIn, isAuthenticated, createPost);

router.get('/daily/:postName', getPost);
router.get('/daily/photo/:postName', photo);

router.put('/daily/:userId/:postName/',isSignedIn, isAuthenticated, updatePost);

router.delete('/daily/:userId/:postName/',isSignedIn, isAuthenticated, deletePost);

router.get('/daily', getAllPosts);

router.get('/unique/categories', getAllUniqueCategories);
router.get('/daily/category/:categoryName', getAllCategoryPosts);

module.exports = router;
