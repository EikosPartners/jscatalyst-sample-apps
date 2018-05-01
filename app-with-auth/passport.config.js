const userDB = require('./mock_backend/users.json')

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};

module.exports = function(passport, JwtStrategy) {
  var opts = {};
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = 'secret';
  passport.use(new JwtStrategy(opts, function(payload, done) {
    var user = userDB.users.filter(user => user.username === username)
    if (user) {
      var currentTime = Math.floor(Date.now() / 1000);
      if(payload.exp - currentTime < 300) {
        done({expiresSoon: true}, user)
      } else {
        done(null, user);
      }
    } else {
      done(null, false);
    }
  }));
  return passport
};
