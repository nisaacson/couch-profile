Store profile information in couchdb

[![Dependency Status](https://david-dm.org/nisaacson/couch-profile/status.png)](https://david-dm.org/nisaacson/couch-profile)
Dependency tracking by [David](https://david-dm.org/)


# Installation
```bash
npm install couch-profile
```

# Usage
To use the module you will first need to setup a [cradle](https://github.com/cloudhead/cradle) connection.

## Instatiate Views
```javascript
var couchProfile = require('couch-profile');
var db = <cradle database connection>
var viewData = {
  db: db
}
couchProfile.createViews(viewData, function(err) {
  if (err) {
    inspect(err, 'error creating couch profile views');
    return;
  }
  inspect('couch-profile views created correctly');
});
```


## Get Profile
This will automatically create a new profile if needed. Use **findProfile** if you just want to lookup a profile without creating one
```javascript
var couchProfile = require('couch-profile');
var db = <cradle database connection>
var profileData = {
  db: db,
  email: 'foo@example.com'
}
couchProfile.getProfile(profileData, function(err, profile) {
  if (err) {
    inspect(err, 'error getting profile');
    return;
  }
  inspect(profile, 'got couch profile');
});
```


## Find Profile
Lookup a profile but don't create new ones
```javascript
var couchProfile = require('couch-profile');
var db = <cradle database connection>
var profileData = {
  db: db,
  email: 'foo@example.com'
}
couchProfile.getProfile(profileData, function(err, profile) {
  if (err) {
    inspect(err, 'error getting profile');
    return;
  }
  inspect(profile, 'got couch profile');
});
```
