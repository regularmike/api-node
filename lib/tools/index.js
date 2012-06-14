var https    = require("https"),
    jsHashes = require("jshashes");

var SHA256   = new jsHashes.SHA256;

/*
 * Base function to make a request to the ordr.in api
 * host is the base uri, somehting like r-test.ordr.in
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
      callback(false, JSON.parse(data));
    });
  });
  req.end();

  req.on("error", function(error){
    callback(error); // for now just pass node's error through
  });
}

/*
 * Function to handle all authenticated requests
 * all params are the same as the makeApiRequest function except:
 * user: the user's email address
 * pass: a SHA256 hash of the users password
 */

exports.makeAuthenticatedApiRequest = function(host, uri, method, data, headers, user, pass, callback){
  var hash = SHA256.hex(pass + user + uri);

  headers["X-NAAMA-AUTHENTICATION"] = "username=\"" + encodeUriComponent(user) + "\", response=\"" + hash + ", version=\"1\"";
  exports.makeApiRequest(host, uri, method, data, headers, callback);
}

exports.buildUriString = function(baseUri, params){
  for (var i = 0; i < params.length; i++){
    baseUri += "/" + encodeURIComponent(params[i]);
  }
  return baseUri;
}
