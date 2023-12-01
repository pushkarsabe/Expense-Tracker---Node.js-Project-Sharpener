const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database')

exports.postAddExpense = async (req, res, next) => {
    //any post request if faces any problem but gets saved in database then transaction is used and keeps track of CRUD operations and if anything goes wrong it will roll back and if nothing happens it will commmit
    const t = await sequelize.transaction();

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
        }, { transanction: t });
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
                where: { id: req.user.id },
                transanction: t
            });

        console.log('Updated rows count:', updatedRowsCount);
        //successfully save the chnages to the database
        await t.commit();
        res.status(200).json({ newExpenseData: expenseData, message: 'Data added successfully' })
    }
    catch (err) {
        //do not save the chnages to the database
        await t.rollback();
        console.log('post expense err = ' + err);
        return res.status(500).json({ error: err })
    }
}

exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        //post always uses body
        const t = await sequelize.transaction();

        const expenseID = req.params.id;
        console.log('expenseID = ' + expenseID);
        if (expenseID == '' || expenseID == undefined) {
            return res.status(400).json({ message: 'Id is empty' })
        }

        // console.log('deleteExpense req.user object = ' + JSON.stringify(req.user));
        const expenseMoneyOFParticularUserid = await Expense.findAll({ where: { id: expenseID } });
        console.log('deleteExpense expenseMoneyOFParticularUserid = ' + JSON.stringify(expenseMoneyOFParticularUserid[0].money));
        //this will reduce the amount money from totalexpense column
        const totalExpense = Number(req.user.totalExpenses) - expenseMoneyOFParticularUserid[0].money;
        console.log('deleteExpense totalExpense = ' + totalExpense);
        //this will update the totalExpenses column in user table
        const [updatedRowsCount] = await User.update({
            totalExpenses: totalExpense
        },
            {
                where: { id: req.user.id },
                transanction: t
            });

        console.log('deleteExpense Updated rows count:', updatedRowsCount);
        const deleteExpenseData = await Expense.destroy({ where: { id: expenseID, userid: req.user.id }, transanction: t });
        await t.commit();

        res.status(200).json({ message: 'Data deleted successfully' })
    }
    catch (err) {
        //do not save the chnages to the database
        await t.rollback();
        console.log('deleteExpense err = ' + err);
        return res.status(400).json({ error: err })
    }
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