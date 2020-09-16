const User = require("../models/users");
const {sendSuccess} = require('../common/util')
async function getAllUser(req, res) {
   const users = await User.findAll();
    res.json(sendSuccess(users))
}

module.exports = {
    getAllUser
}