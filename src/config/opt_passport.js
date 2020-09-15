const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';


module.exports.jwtOptions = jwtOptions;
