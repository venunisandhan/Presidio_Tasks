
const express = require('express');

const router = express.Router();

const {
    createEmployee ,
    getAllEmployees ,
    getEmployeeById ,
    updateEmployee ,
    deleteEmployee ,
} = require('../controllers/employeeController');

const { validateEmployee } = require('../middlewares/validator');

router
      .route('/')
      .get(getAllEmployees)
      .post(validateEmployee, createEmployee);

router
      .route('/:id')
      .get(getEmployeeById)
      .put(validateEmployee, updateEmployee)
      .delete(deleteEmployee);

module.exports = router ;