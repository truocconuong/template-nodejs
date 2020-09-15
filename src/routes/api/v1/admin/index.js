const express = require('express')
const router = express.Router()
const users = require('./users')

const controller = require('../../../../controllers')
const Auth = controller.Auth;

router.use('*', Auth.checkAuthentication)
router.use('/users', users)

module.exports = router;