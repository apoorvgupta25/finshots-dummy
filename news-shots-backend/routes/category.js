const express = require('express')
const router = express.Router()

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require('../controllers/category')
const {getUserById} = require('../controllers/user')
const { isAuthenticated, isSignedIn} = require('../controllers/auth')

router.param('categoryId', getCategoryById);
router.param('userId', getUserById);

router.post('/category/create/:userId', isSignedIn, isAuthenticated, createCategory);

router.get('/category/:categoryId', getCategory);
router.get('/all/categories', getAllCategory);

router.put('/category/:userId/:categoryId/', isSignedIn, isAuthenticated, updateCategory);

router.delete('/category/:userId/:categoryId', isSignedIn, isAuthenticated, removeCategory);

module.exports = router;
