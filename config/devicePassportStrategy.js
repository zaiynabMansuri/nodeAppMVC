/**
 * devicePassportStrategy.js
 */

const {
  Strategy, ExtractJwt 
} = require('passport-jwt');
const { JWT } = require('../constants/authConstant');
const user = require('../model/user');

/**
 * @description : exports authentication strategy for device using passport.js
 * @params {obj} passport : passport object for authentication
 * @return {callback} : returns callback to be used in middleware
 */
const devicePassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = JWT.DEVICE_SECRET;
  passport.use('device-rule',
    new Strategy(options, (payload, done) => {
      user.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, { ...user.toJSON() });
        }
        return done('No User Found', {});
      });
    })
  );
};

module.exports = { devicePassportStrategy, };