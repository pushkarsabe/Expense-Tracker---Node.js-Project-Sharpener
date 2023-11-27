//importing error to handle it
const { Sequelize } = require('sequelize');
const { User } = require('../models/user');

//to post the records to database
exports.postAddUser = async (req, res, next) => {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        console.log('name = ' + name);
        console.log('email = ' + email);
        console.log('password = ' + password);

        const newUser = await User.create({
            name: name,
            email: email,
            password: password,
        });
        //will send json response back to the client
        res.status(201).json({ newUserDetails: newUser });
    }
    catch (err) {
        //this is to handle duplicate email error and you can handle particular sequelize error
        if (err === '') {
            res.status(400).json({
                error: 'duplicate email',
            })
        }
        console.log('Post user is failing' + JSON.stringify(err));
        res.status(500).json({
            error: err,
        })
    }
}