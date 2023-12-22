const express = require('express');

const adminRoleController = require('../controllers/adminRoleController.js');

const router = express.Router();





/// Fetch all Employee
router.get('/getEmployeeList', adminRoleController.getEmployeeList);

/// Fetch Employee by id
router.get('/getEmployeeByID/:id' , adminRoleController.getEmployeeByID)

/// Update Employee bio-data by passing employee Id
router.patch('/updateEmployeeBioById/:id'  , adminRoleController.updateEmployeeBioById)

// / Delete  Employee by ID
router.delete('/deleteEmployeeById/:id', adminRoleController.deleteEmployeeById)

module.exports = router;
