var rk = require('required-keys');
var findUserProfile = require('./findUserProfile');
var createUserProfile = require('./findUserProfile');
module.exports = function (data, cb) {
  var keys = ['db', 'email'];
  var err = rk.truthySync(data, keys);
  if (err) { return cb(err); }
  findUserProfile(data, function (err, reply) {
    if (err) { return cb(err); }
    if (reply) { return reply(); }
    createUserProfile(data, cb);
  });
};
