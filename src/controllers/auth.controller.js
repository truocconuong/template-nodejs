const User = require("../models/users");
const jwt = require('jsonwebtoken');
const { jwtOptions } = require("../config/opt_passport");

async function register(req, res) {
    const data = req.body;
    const result = await User.create(data)
    res.json(result)
}

//login route
async function login(req, res) {
    const { username, password } = req.body;
    if (username && password) {
        let user = await getUser({ username: username });
        if (!user) {
            res.status(401).json({ message: 'No such user found' });
        }
        if (user.password === password) {
            // from now on we'll identify the user by the id and the id is the 
            // only personalized value that goes into our token
            let payload = { id: user.id };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({token: token });
        } else {
            res.status(401).json({ msg: 'Password is incorrect' });
        }
    }
}

const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};



function checkAuthentication(req, res, next) {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
        var decoded = jwt.verify(token, jwtOptions.secretOrKey);
        if (decoded) {
            req.user = decoded.id
            return next()
        }
    } catch (error) {
        return res.status(401).send('Authorization');

    }

}

module.exports = {
    checkAuthentication,
    register,
    login
}