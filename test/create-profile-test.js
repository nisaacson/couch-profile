var inspect = require('eyespect').inspector();
var createUserProfile = require('../lib/createUserProfile');
var should = require('should');
var getDB = require('./getDB');
var path = require('path');
var fs = require('fs');
var assert = require('assert');
var configFilePath = path.join(__dirname, 'config.json');
assert.ok(fs.existsSync(configFilePath), 'config file not found at path: ' + configFilePath);
var config = require('nconf').argv().env().file({ file: configFilePath });
describe('create profile test', function () {
  var db;
  var email = 'foo@example.com';
  before(function (done) {
    getDB(config, function (err, reply) {
      should.not.exist(err);
      should.exist(reply);
      db = reply;
      var removeData = {
        db: db,
        email: email
      };
      inspect('removing profiles');
      removeIfNeeded(removeData, function (err) {
        should.not.exist(err);
        done();
      });
    });

  });
  it('should create views if needed', function (done) {

    var data = {
      db: db,
      email: email
    };
    createUserProfile(data, function (err, reply) {
      should.not.exist(err);
      reply.should.have.property('id');
      reply.should.have.property('rev');
      var id = reply.id;
      db.get(id, function (err, reply) {
        should.not.exist(err);
        should.exist(reply);
        email.should.eql(reply.email);
        done();
      });
    });
  });
});


function removeIfNeeded(data, cb) {
  var db = data.db;
  var email = data.email;
  db.view('user_profile/byEmail', {key: email}, function (err, docs) {
    if (err) { return cb(err); }
    if (docs.length === 0) {
      return cb();
    };
    for (var i in docs) {
      var doc = docs[i];
      var id = doc.value._id;
      var rev = doc.value._rev;
      db.remove(id, rev, function (err, reply) {
        if (err) { return cb(err); }

      });
    }
    inspect('done removing profiles');
    cb();
  });
}
