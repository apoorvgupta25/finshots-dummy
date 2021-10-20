const express = require('express')
const router = express.Router()

const {getCategoryByName, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require('../controllers/category')
const {getUserById} = require('../controllers/user')
const { isAuthenticated, isSignedIn} = require('../controllers/auth')

router.param('categoryName', getCategoryByName);
router.param('userId', getUserById);

router.post('/category/create/:userId', isSignedIn, isAuthenticated, createCategory);

router.get('/category/:categoryName', getCategory);
router.get('/all/categories', getAllCategory);

router.put('/category/:userId/:categoryName/', isSignedIn, isAuthenticated, updateCategory);

router.delete('/category/:userId/:categoryName', isSignedIn, isAuthenticated, removeCategory);

module.exports = router;
