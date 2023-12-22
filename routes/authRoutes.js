const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();





/// Signup
router.post('/signupPortal', authController.signupPortal);


/// Admin Login OR user logoin and take token pass in headers for accessing other API's
router.post('/LoginPortal', authController.LoginPortal);







module.exports = router;
