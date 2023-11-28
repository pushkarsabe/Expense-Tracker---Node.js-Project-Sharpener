//importing error to handle it
const User = require('../models/user');
const bcrypt = require('bcrypt');

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

    //number of hashing or strengthen
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        console.log('err = ' + err);
        console.log('hash = ' + hash);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hash,
        });

        res.status(201).json({ newUserDetails: newUser, meassage: ' SignUpSuccessful' });
    })

    //will send json response back to the client
}

//to get the records from db
exports.postSignUser = async (req, res, next) => {
    //get always uses param
    const email = req.body.email;
    const password = req.body.password;
    console.log('email = ' + email);
    console.log('password = ' + password);

    if (email == '' || email == undefined) {
        return res.status(400).json({ success: false, message: 'email required' });
    }

    const userData = await User.findAll({
        where: { email: email }
    })
    if (userData.length == 0) {
        return res.status(400).json({ success: false, message: 'Email not found' });
    }

    const getUserData = userData[0];
    console.log('userData = ' + JSON.stringify(userData));
    console.log('user password = ' + getUserData.password);

    bcrypt.compare(password, getUserData.password, (err, response) => {
        if (!err) {
            //will send json response back to the client
            res.status(201).json({ success: true, userDetails: userData });
        }
        else {
            return res.status(400).json({ success: false, message: 'Password is incorrect' });
        }
    });
}
