var inspect = require('eyespect').inspector({maxLength: 200000});
var rk = require('required-keys');
module.exports = function (data, cb) {
  var keys = ['db', 'email'];
  var err = rk.truthySync(data, keys);
  if (err) { return cb(err); }
  var db = data.db;
  var email = data.email;
  db.view('profile/byEmail', {key: email}, function (err, docs) {
    if (err) { return cb(err); }
    if (docs.length === 0) {
      return cb();
    };
    var doc = docs[0].value;
    inspect(doc, 'found user profile');
    cb(null, doc);
  });
};
