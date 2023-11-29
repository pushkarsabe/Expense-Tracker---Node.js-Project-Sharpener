const express = require('express');

const userAuthorization = require('../middlware/auth');

const router = express.Router();

const expenseController = require('../controllers/expense');

router.post('/add-expense', userAuthorization.authenticate, expenseController.postAddExpense);

router.get('/get-expense', userAuthorization.authenticate, expenseController.getExpense);

router.delete('/delete-expense/:id', userAuthorization.authenticate, expenseController.deleteExpense);


module.exports = router;