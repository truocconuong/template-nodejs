const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../server');
const { getUserName, getPassword, register, login, removeAllUser } = require('../util');
chai.use(chaiHttp);
describe('Test endpoint users', function () {
    beforeEach(async function () {
        await removeAllUser()
    });
    it('Should return a new user', function (done) {
        const data = {
            username: getUserName(),
            password: getPassword()
        }
        chai.request(server).post('/api/v1/auth/register').send(data).end(function (error, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })

    })
    it('Login should return a token', function (done) {
        const registerUser = register();
        registerUser.then((result) => {
            const data = {
                username: result.username,
                password: result.password
            }
            chai.request(server).post('/api/v1/auth/login').send(data).end(function (err, res) {
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('token')
                done();
            })
        })
    })

    it('Should return all users', function (done) {
        const getTokenUser = login();
        getTokenUser.then((token) => {
            chai.request(server).get('/api/v1/admin/users').set({ "Authorization": token }).end(function (error, res) {
                res.should.have.status(200);
                res.body.should.to.be.an('array')
                done();
            })
        })
    })
})