var tools = require("../tools");

exports.getDeliveryList = function(dateTime, address, callback){
  var params = [
    dateTime,
    address.zip,
    address.city,
    address.addr
  ];

  makeRestaurantRequest("/dl", params, {}, "GET", callback);
}

exports.getDeliveryCheck = function(restaurantId, dateTime, address, callback){
  var params = [
    restaurantId,
    dateTime,
    address.zip,
    address.city,
    address.addr
  ]

  makeRestaurantRequest("/dc", params, {}, "GET", callback);
}

exports.getFee = function(restaurantId, subtotal, tip, dateTime, address, callback){
  var params = [
    restaurantId,
    subtotal,
    tip,
    dateTime,
    address.zip,
    address.city,
    address.addr
  ]

  makeRestaurantRequest("/fee", params, {}, "GET", callback);
}

exports.getDetails = function(restaurantId, callback){
  makeRestaurantRequest("/rd", [restaurantId], {}, "GET", callback);
}

/*
 * function to make all restaurant api requests
 * uri is the base uri so something like /dl, include the /
 * params are all parameters that go in the url. Note that this is different than the data
 * data is the data that goes either after the ? in a get request, or in the post body
 * method is either GET or POST (case-sensitive)
 */

function makeRestaurantRequest(uri, params, data, method, callback){
  var uriString = tools.buildUriString(uri, params);
  
  tools.makeApiRequest(globals.restaurantUrl, uriString, method, data, {}, callback);
}
