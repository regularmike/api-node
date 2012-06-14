var https = require("https");


/*
 * Base function to make a request to the ordr.in api
 * api is either order, restaurant, or user
 * uri is a fll uri string, so everthing after ordr.in/
 * method is either GET or POST
 * data is any additional data to be included in the request body or query string
 * headers are additional headers beyond the X-NAAMA-Authentication
 * TODO make a function that builds on this to do authenticated requests
 */
exports.makeApiRequest = function(api, uri, method, data, headers, callback){
  headers["X-NAAMA-CLIENT-AUTHENTICATION"] = "id=\"" + globals.apiKey + "\", version=\"1\"";
  var requestOptions = {
    host: globals[api + "Url"],
    port: 443,
    path: uri,
    method: method,
    headers: headers
  };
  //console.log("options", api, requestOptions);

  var req = https.request(requestOptions, function(res){
    console.log("status", res.statusCode);
    var data = "";
    res.on("data", function(chunk){
      console.log("data", chunk);
      data += chunk;
    });
    res.on("end", function(){
      console.log("request done");
      callback(false, data);
    });
  });
  req.end();
  console.log(req);

  req.on("error", function(error){
    callback(error); // for now just pass node's error through
  });


}
