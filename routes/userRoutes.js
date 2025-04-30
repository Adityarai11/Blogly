const express =require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');

//router object
const router = express.Router();

//Get all users||Get
router.get('/all-users',getAllUsers);

//create user || post
router.post('/register',registerController)

//Login || post
router.post('/login',loginController)

module.exports = router;
