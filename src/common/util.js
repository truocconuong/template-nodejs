const { answerOfUser } = require("./mock/answer_user");
const { questions } = require("./mock/question");
const _ = require('lodash')
function sendSuccess(response) {
  return {
    data: response
  }
}


function getListProductOfUser() {
  const answers = answerOfUser.answers
  const getQuestion = questions;
  const result = matrixGenerateProduct(getQuestion, answers);
  return result
}


function matrixGenerateProduct(questions, answers) {
  let products = [];
  for (const answer of answers) {
    const getQuestion = _.find(questions, question => question.question_short === answer.question_short);
    if (getQuestion) {
      _.filter(getQuestion.answers, answer => answer.title === answer.title && !_.isNil(answer.products) ? products.push(...answer.products) : '')
    }
  }
  // remove duplicate product
  products = [...new Set(products)];
  return products;
}





module.exports = {
  matrixGenerateProduct,
  getListProductOfUser,
  sendSuccess,
}