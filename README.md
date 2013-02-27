Store profile information in couchdb

[![Build Status](https://travis-ci.org/nisaacson/couch-profile.png)](https://travis-ci.org/nisaacson/couch-profile)
[![Dependency Status](https://david-dm.org/nisaacson/couch-profile/status.png)](https://david-dm.org/nisaacson/couch-profile)
Dependency tracking by [David](https://david-dm.org/)


# Installation
```bash
npm install couch-profile
```

# Usage
To use the module you will first need to setup a [cradle](https://github.com/cloudhead/cradle) connection.

## API
Look at index.js to see the full public api available. The following functions are available for use

- createViews
- findProfile
- getOrCreateProfile
- checkPassword
- hashPassword

## Instatiate Views
```javascript
var couchProfile = require('couch-profile')
var db = <cradle database connection>
var viewData = {
  db: db
}
couchProfile.createViews(viewData, function(err) {
  if (err) {
    inspect(err, 'error creating couch profile views')
    return
  }
  inspect('couch-profile views created correctly')
})
```


## Get Or Create Profile
This will automatically create a new profile if needed. Use **findProfile** if you just want to lookup a profile without creating one
```javascript
var couchProfile = require('couch-profile')
var db = <cradle database connection>
var profileData = {
  db: db,
  email: 'foo@example.com',
  password: 'barPass' // this will be salted and hashed before storage
}
couchProfile.getOrCreateProfile(profileData, function(err, profile) {
  if (err) {
    inspect(err, 'error getting profile')
    return
  }
  inspect(profile, 'got couch profile')
})
```


## Find Profile
Lookup a profile but don't create new ones
```javascript
var couchProfile = require('couch-profile')
var db = <cradle database connection>
var profileData = {
  db: db,
  email: 'foo@example.com'
}
couchProfile.getProfile(profileData, function(err, profile) {
  if (err) {
    inspect(err, 'error getting profile')
    return
  }
  inspect(profile, 'got couch profile')
})
```


## Passwords
If you create a profile with a **password** field, it will be salted and hashed and stored in a hash field. The actual password value is not stored. Hashing is done with the native nodejs bcrypt implementation [https://github.com/shaneGirish/bcrypt-nodejs](https://github.com/shaneGirish/bcrypt-nodejs)

```javascript
var bcrypt = require('bcrypt-nodejs')
var couchProfile = require('couch-profile')
var password = 'fooBarPass'
couchProfile.hashPassword(profileData, function(err, profile) {
  if (err) {
    inspect(err, 'error hashing password')
    return
  }
  inspect(password, 'original raw password')
  inspect(reply, 'hashed password')
  bcrypt.compare(password, hash, function (err, reply) {
    if (err) {
      inspect(err, 'erorr checking if hashed password matches')
      return
    }
    inspect(reply, 'does hash check out? ')
  })
})
```
