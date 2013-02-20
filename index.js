var add = require('./lib/add');
var getProfile = require('./lib/getProfile');
var update = require('./lib/update');
var remove = require('./lib/remove');
module.exports = {
  getProfile: getProfile,
  add: add,
  update: update,
  remove: remove
};
