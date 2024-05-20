const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_details/index');

router.get('/employee', employeeController.getEmployee);
router.post('/employee/create', employeeController.createEmployee);
router.put('/employee/update/:id', employeeController.updateEmployee);
router.delete('/employee/delete/:id', employeeController.deleteEmployee);

module.exports = router;
