const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const middleware = require('../helper/middleware.js')

/// view datas based on token 
router.get('/viewDetails' , userController.viewDetails)



module.exports = router;
