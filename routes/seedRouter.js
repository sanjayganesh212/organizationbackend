const express = require('express');
const seedController = require('../controllers/dataseedController');

const router = express.Router();



router.get('/seedOrganizationDetails' ,seedController.seedorgData )
router.get('/seedAdminSignupData' , seedController.seedAdminSignupData)



module.exports = router;
