var inspect = require('eyespect').inspector({maxLength: 200000});
var should = require('should');
var getDB = require('./getDB');
var path = require('path');
var fs = require('fs');
var assert = require('assert');
var configFilePath = path.join(__dirname, 'config.json');
assert.ok(fs.existsSync(configFilePath), 'config file not found at path: ' + configFilePath);
var config = require('nconf').argv().env().file({ file: configFilePath });


var couchProfile = require('../index');
describe('get cradle database connection', function () {
  it('should get database', function (done) {
    getDB(config, function (err, db) {
      removeIfNeeded(db, function (err, reply) {
        db.create(function (err, reply) {
          should.not.exist(err);
          var data = { db: db};
          couchProfile.createViews(data, function (err, reply) {
            done();
            should.not.exist(err);
          });
        });
      });
    });
  });
});


function removeIfNeeded(db, cb) {
  db.exists(function (err, exists) {
    if (!exists) {
      return cb();
    }
    db.destroy(cb);
  });
}
