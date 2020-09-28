const express = require('express');
const router = express.Router();

const controller = require('../../../../controllers')
const User = controller.User;
const Auth = controller.Auth;



router.get('/', User.getAllUser);
router.get('/products', User.getProductsUser)

module.exports = router;