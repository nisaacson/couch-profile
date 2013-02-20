var rk = require('required-keys');
module.exports = function (data, cb) {
  var keys = ['db'];
  var err = rk.truthySync(data, keys);
  if (err) { return cb(err); }
  var db = data.db;
  db.view('user_profile/byEmail', {key: 'foo'}, function (err, doc) {
    if (!err) {
      return cb();
    }
    db.save('_design/user_profile', {
      byEmail: {
        map: function(doc) {
          if (doc.email) {
            emit(doc.email, doc);
          }
        }
      }
    }, cb);
  });
};
