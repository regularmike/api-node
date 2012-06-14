var https = require("https");

/*
 * Base function to make a request to the ordr.in api
 * api is either order, restaurant, or user
 * uri is a full uri string, so everthing after ordr.in
 * method is either GET or POST
 * data is any additional data to be included in the request body or query string
 * headers are additional headers beyond the X-NAAMA-Authentication
 * TODO make a function that builds on this to do authenticated requests
 */
exports.makeApiRequest = function(host, uri, method, data, headers, callback){
  headers["X-NAAMA-CLIENT-AUTHENTICATION"] = "id=\"" + globals.apiKey + "\", version=\"1\"";
  var requestOptions = {
    host: host,
    port: 443,
    path: uri,
    method: method,
    headers: headers
  };

  var req = https.request(requestOptions, function(res){
    var data = "";
    res.on("data", function(chunk){
      data += chunk;
    });
    res.on("end", function(){
      callback(false, data);
    });
  });
  req.end();

  req.on("error", function(error){
    callback(error); // for now just pass node's error through
  });


}

exports.buildUriString = function(baseUri, params){
  for (var i = 0; i < params.length; i++){
    baseUri += "/" + encodeURIComponent(params[i]);
  }
  return baseUri;
}
