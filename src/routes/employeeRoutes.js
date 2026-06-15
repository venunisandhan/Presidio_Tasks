
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
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { validate } = require('../models/Employee');

router.get('/', authMiddleware, getAllEmployees);

router.get('/:id', authMiddleware, getEmployeeById);

router.post(
      '/',
      authMiddleware,
      roleMiddleware('ADMIN'),
      validateEmployee,
      createEmployee,
);

router.put(
      '/:id',
      authMiddleware,
      roleMiddleware('ADMIN'),
      validateEmployee,
      updateEmployee
);

router.delete(
      '/:id',
      authMiddleware,
      roleMiddleware('ADMIN'),
      deleteEmployee
);

module.exports = router;