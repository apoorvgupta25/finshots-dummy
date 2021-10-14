var express = require('express');
var router = express.Router();
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');
const { check } = require('express-validator');

//signup
router.post('/signup',[
    check('name', 'Name should be 5 characters').isLength({ min: 5 }),
    check('email', 'Enter valid email').isEmail(),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password should be 6 characters'),
  ],signup);

//signin
router.post('/signin',[
    check('email', 'Enter valid email').isEmail(),
    check('password').isLength({ min: 1 }).withMessage('Password field is required'),
  ],signin);

//signout
router.get('/signout', signout);

//test
router.get('/testroute',isSignedIn , (req, res) =>{
  res.send('A protected Route');
});

module.exports = router;
