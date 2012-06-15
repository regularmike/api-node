var tools = require("../tools");

exports.getUser = function(user, callback){
  makeUserRequest("/u", [user.email], {}, "GET", user, callback);
}

exports.getAllAddresses = function(user, callback){
  var params = [
    user.email,
    "addrs"
  ];
  makeUserRequest("/u", params, {}, "GET", user, callback);
}

exports.getAddress = function(user, addressName, callback){
  var params = [
    user.email,
    "addrs",
    addressName
  ];
  makeUserRequest("/u", params, {}, "GET", user, callback);
}

exports.setAddress = function(user, addressName, address, callback){
  var params = [
    user.email,
    "addrs",
    addressName
  ];
  data = {
    addr: address.addr,
    addr2: address.addr2,
    city: address.city,
    state: address.state,
    zip: address.zip,
    phone: address.phone
  };
  makeUserRequest("/u", params, data, "PUT", user, callback);
}

exports.removeAddress = function(user, addressName, callback){
  var params = [
    user.email,
    "addrs",
    addressName
  ];

  makeUserRequest("/u", params, {}, "DELETE", user, callback);
}

// this one's a little weird because it's not an authenticated request, so it behaves a bit differently than the others in this file.
exports.createUser = function(user, firstName, lastName, callback){
  var params    = [user.email];
  var uriString = tools.buildUriString("/u", params);
  var data      = {
    first_name: firstName,
    last_name : lastName,
    pw        : user.password
  };

  tools.makeApiRequest(globals.userUrl, uriString, "POST", data, {}, callback);
}

function makeUserRequest(uri, params, data, method, user, callback){
  var uriString = tools.buildUriString(uri, params);

  tools.makeAuthenticatedApiRequest(globals.userUrl, uriString, method, data, {}, user.email, user.password, callback);
}
