var inspect = require('eyespect').inspector({maxLength: 200000});
var should = require('should');
var getDB = require('./getDB');
var path = require('path');
var fs = require('fs');
var assert = require('assert');

var configFilePath = path.join(__dirname, 'config.json');
assert.ok(fs.existsSync(configFilePath), 'config file not found at path: ' + configFilePath);
var config = require('nconf').argv().env().file({ file: configFilePath });

var createViews = require('../lib/createViews');
before(function (done) {
  getDB(config, function (err, db) {
    var data = { db: db};
    createIfNeeded(db, function (err, reply) {
      should.not.exist(err)
      createViews(data, function (err, reply) {
        should.not.exist(err);
        done();
      });
    });
  });
});


function createIfNeeded(db, cb) {
  db.exists(function (err, reply) {
    should.not.exist(err)
    if (reply) {
      return cb();
    }
    db.create(function (err, reply) {
      should.not.exist(err);
      db.exists(function (err, exists) {
        should.not.exist(err)
        assert.ok(exists, 'db should exist now')
        cb();
      })
    })
  })
}
