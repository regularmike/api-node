var tools = require("../tools");

exports.getUser = function(user, callback){
  tools.makeAuthenticatedApiRequest(globals.userUrl, "/u", "GET", {pass: user.pass}, {}, user.email, user.pass, function(error, data){
    if (error){
      console.log("error", error);
    }else{
      console.log("data", data);
    }
  });
}

function makeUserRequest(uri, params, data, method, callback){
}
