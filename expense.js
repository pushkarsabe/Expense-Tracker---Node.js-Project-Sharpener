const Expense = require('../models/expense');
const User = require('../models/user');

exports.postAddExpense = async (req, res, next) => {
    //post always uses body
    try {
        const money = req.body.money;
        const description = req.body.description;
        const options = req.body.options;
        console.log('money = ' + money);
        console.log('description = ' + description);
        console.log('options = ' + options);
        console.log('userid = ' + req.user.id);
        if (money == '' || money == undefined || description == '' || description == undefined || options == '' || options == undefined) {
            return res.status(400).json({ message: 'Input fields are empty' })
        }

        const expenseData = await Expense.create({
            money: money,
            description: description,
            options: options,
            userid: req.user.id
        });
        //to keep the total money updated spend by the user every time new expense is added 
        const totalExpense = Number(req.user.totalExpenses) + Number(money);
        console.log('req.user objet= ' + JSON.stringify(req.user));
        console.log('totalExpense = ' + totalExpense);
        console.log('userid = ' + req.user.id);
        //this returns promise
        const [updatedRowsCount] = await User.update({
            totalExpenses: totalExpense
        },
            {
                where: {
                    id: req.user.id
                },

            });

        console.log('Updated rows count:', updatedRowsCount);

        res.status(200).json({ newExpenseData: expenseData, message: 'Data added successfully' })
    }
    catch (err) {
        console.log('post expense err = ' + err);
        return res.status(500).json({ error: err })
    }
}

exports.deleteExpense = async (req, res, next) => {
    //post always uses body
    const expenseID = req.params.id;
    console.log('expenseID = ' + expenseID);
    if (expenseID == '' || expenseID == undefined) {
        return res.status(400).json({ message: 'Id is empty' })
    }

    const deleteExpenseData = await Expense.destroy({ where: { id: expenseID, userid: req.user.id } });

    res.status(200).json({ message: 'Data deleted successfully' })
}

exports.getExpense = async (req, res, next) => {

    try {
        const allExpenseData = await Expense.findAll({ where: { userid: req.user.id } });
        res.status(200).json({ expenseData: allExpenseData });
    } catch (err) {
        console.log('getExpense err = ' + err);
        return res.status(400).json({ error: err })
    }
}