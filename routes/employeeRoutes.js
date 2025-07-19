const express = require('express');
const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(auth); // protect all routes below
router.post('/', createEmployee);
router.get('/', getAllEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
