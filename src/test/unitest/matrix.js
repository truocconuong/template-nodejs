const chai = require('chai');
const expect = chai.expect;
const should = chai.should()
const { answerOfUser } = require('../mock/answer_user');
const { questions } = require('../mock/question');
const { matrixGenerateProduct } = require('../../common/util');
const { isDuplicateProducts } = require('../util');
describe('Test matrix', function () {
    it('Matrix quiz should return array product and product no duplicate', function (done) {
        const question = questions;
        const answer = answerOfUser.answers
        const products = matrixGenerateProduct(question, answer);
        expect(products).to.be.a('array');
        should.equal(isDuplicateProducts(products), false);
        done();
    })
})