const User = require("../../models/users");
const { Repository } = require("./Repository");

class UserRepository extends Repository {
    constructor() {
        super(User);
    }
}

module.exports = { UserRepository }