const User = require("../models/users");
const { sendSuccess, matrixGenerateProduct } = require('../common/util');
const { questions } = require("../test/mock/question");
const { answerOfUser } = require("../test/mock/answer_user");
async function getAllUser(req, res) {
    const users = await User.findAll();
    res.json(sendSuccess(users))
}



async function getProductsUser(req, res) {
    const question = questions;
    const answers = answerOfUser.answers
    const products = matrixGenerateProduct(question, answers)
    res.json(sendSuccess(products))
}


module.exports = {
    getProductsUser,
    getAllUser
}