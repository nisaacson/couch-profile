var inspect = require('eyespect').inspector({maxLength: 200000});
var rk = require('required-keys');
module.exports = function (data, cb) {
  var keys = ['db', 'email'];
  var err = rk.truthySync(data, keys);
  if (err) { return cb(err); }
  var db = data.db;
  var email = data.email;
  var userProfile = {
    email: email,
    confirmed: false,
    resource: 'Profile'
  };
  db.save(userProfile, function (err, reply) {
    if (err) { return cb(err); }
    userProfile.id = reply.id;
    userProfile.rev = reply.rev;
    cb(null, userProfile);
  });
};
