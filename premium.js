
const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('sequelize');


exports.getPremiumLB = async (req, res, next) => {
    try {

        // const users = await User.findAll({
        //     attributes: ['id', 'name']
        // });
        // console.log('getPremiumLB users = ' + JSON.stringify(users));
        // const expenses = await Expense.findAll({
        //     //sum of exenses for each id and group by userid
        //     attributes: ['userid', [sequelize.fn('sum', sequelize.col('money')), 'total_cost']],
        //     group:['userid']
        // });
        // console.log('getPremiumLB expenses = ' + JSON.stringify(expenses));
       
        // var userLeaderBoardDetails = [];
        // users.forEach(user => {
        //     userLeaderBoardDetails.push({ name: user.name, total_cost: userAggreagatedExpenses[user.id] })
        // })
        // Sort userLeaderBoardDetails based on total_cost in descending order
        // userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);

        // console.log('userLeaderBoardDetails = ' + JSON.stringify(userLeaderBoardDetails));
        // res.status(200).json(expenses);



        const users = await User.findAll({
            attributes: ['id','name']
        });
        console.log('getPremiumLB users = ' + JSON.stringify(users));
        const expenses = await Expense.findAll({
            attributes: ['userid', 'money']
        });
        console.log('getPremiumLB expenses = ' + JSON.stringify(expenses));
        const userAggreagatedExpenses = {};
        console.log('expenses = ' + JSON.stringify(expenses));
        expenses.forEach(expense => {
            if (userAggreagatedExpenses[expense.userid]) {
                userAggreagatedExpenses[expense.userid] = userAggreagatedExpenses[expense.userid] + expense.money;
            } else {
                userAggreagatedExpenses[expense.userid] = expense.money;
            }
        })
        var userLeaderBoardDetails = [];
        users.forEach(user => {
            userLeaderBoardDetails.push({ name: user.name, total_cost: userAggreagatedExpenses[user.id] })
        })
        // Sort userLeaderBoardDetails based on total_cost in descending order
        userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);

        console.log('userLeaderBoardDetails = ' + JSON.stringify(userLeaderBoardDetails));
        res.status(200).json(userLeaderBoardDetails);

    }//try
    catch (err) {
        console.log('getPremiumLB err = ' + JSON.stringify(err));
    }
}//purchasePremium