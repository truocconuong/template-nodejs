const User = require("../models/users");

async function getAllUser(req, res) {
   const users = await User.findAll();
    res.json(users)
}

module.exports = {
    getAllUser
}