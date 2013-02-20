var inspect = require('eyespect').inspector({maxLength: 200000});
var cradle = require('cradle');
module.exports = function (config, cb) {
  var host = config.get('couch:host');
  var port = config.get('couch:port');
  var database = config.get('couch:database');
  var opts = {
    cache: false,
    raw: false
  };

  inspect(database,'database');
  var username = config.get('couch:username');
  var password = config.get('couch:password');
  if (username) {
    opts.auth = {
      username: username,
      password: password
    };
  }

  var c = new(cradle.Connection)(host, port, opts);
  var db = c.database(database);
  db.exists(function (err, exists) {
    if (err) { return cb(err); }
    if (exists) {
      return cb(null, db);
    }
    return cb('database: ' + database + ' does not exist');
  });
};
