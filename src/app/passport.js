const passportJWT = require('passport-jwt');
const { jwtOptions } = require('../config/opt_passport');
let JwtStrategy = passportJWT.Strategy;
// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    let user = getUser({ id: jwt_payload.id });

    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
exports.strategy = strategy