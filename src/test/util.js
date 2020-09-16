const faker = require('faker')
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/users');
chai.use(chaiHttp);


function getUserName() {
    return faker.internet.userName()
}
function getPassword() {
    return faker.internet.password()
}


async function register() {
    const data = {
        username: getUserName(),
        password: getPassword()
    }
    const register = await chai.request(server).post('/api/v1/auth/register').send(data)
    return register.body
}



async function login() {
    const registerUser = await register();
    const login = await chai.request(server).post('/api/v1/auth/login').send({ username: registerUser.username, password: registerUser.password })
    return `Bearer ${login.body.token}`
}


async function removeAllUser() {
    const users = await User.findAll();
    for (const user of users) {
        await user.destroy()
    }
}
function isDuplicateProducts(products) {
    return new Set(products).size !== products.length;
}

module.exports = {
    isDuplicateProducts,
    removeAllUser,
    login,
    register,
    getUserName,
    getPassword
}