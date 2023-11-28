const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');

router.post('/add-expense', expenseController.postAddExpense);

router.delete('/delete-expense/:id', expenseController.deleteExpense);

router.get('/get-expense', expenseController.getExpense);

module.exports = router;