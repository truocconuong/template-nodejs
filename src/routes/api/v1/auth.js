const express = require('express');
const router = express.Router();
const controller = require('./../../../controllers')
const Auth = controller.Auth;
router.post('/register', Auth.register);
router.post('/login', Auth.login);
module.exports = router