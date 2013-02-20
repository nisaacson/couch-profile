var should = require('should');
var getDB = require('./getDB');
var path = require('path');
var fs = require('fs');
var assert = require('assert');
var configFilePath = path.join(__dirname, 'config.json');
assert.ok(fs.existsSync(configFilePath), 'config file not found at path: ' + configFilePath);
var config = require('nconf').argv().env().file({ file: configFilePath });

describe('get cradle database connection', function () {
  it('should get database', function (done) {

    getDB(config, function (err, reply) {
      should.not.exist(err);
      should.exist(reply);
      done();
    });
  });
});
