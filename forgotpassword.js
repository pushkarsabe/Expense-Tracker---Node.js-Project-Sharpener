const express = require('express');

const userAuthorization = require('../middlware/auth');

const router = express.Router();

const forgotpasswordController = require('../controllers/forgotpassword');

router.get('/forgotpassword/:email', forgotpasswordController.getUserDeatils);

module.exports = router;