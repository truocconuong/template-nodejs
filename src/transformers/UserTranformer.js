const User = require("../models/users")
const { Transformer } = require("./transformer")

class UserTranformer extends Transformer {
    constructor(data) {
        this.data = data
        super(['username'])
    }
}

module.exports = { UserTranformer }