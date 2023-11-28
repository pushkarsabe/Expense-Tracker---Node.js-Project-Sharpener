//importing error to handle it
const User = require('../models/user');

//to post the records to database
exports.postAddUser = async (req, res, next) => {
    //post always uses bosy
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log('name = ' + name);
    console.log('email = ' + email);
    console.log('password = ' + password);
    if (name == '' || name == undefined || email == '' || email == undefined || password == '' || password == undefined) {
        return res.status(400).json({ err: 'Input fields are empty' })
    }

    const newUser = await User.create({
        name: name,
        email: email,
        password: password,
    });
    //will send json response back to the client
    res.status(201).json({ newUserDetails: newUser });
}

//to get the records from db
exports.postSignUser = async (req, res, next) => {
    //get always uses param
    const email = req.body.email;
    const password = req.body.password;
    console.log('email = ' + email);
    console.log('password = ' + password);

    if (email == '' || email == undefined) {
        return res.status(400).json({ err: 'email required' });
    }

    const userData = await User.findAll({
        where: { email: email }
    })

    if (userData.length == 0) {
        return res.status(400).json({ err: 'User not found' });
    }
    //will send json response back to the client
    res.status(201).json({ userDetails: userData });
}
