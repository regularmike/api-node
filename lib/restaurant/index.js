var requests = require("../tools").requests;

exports.getDeliveryList = function(dateTime, address, callback){
  console.log("called");
  requests.makeApiRequest("restaurant", "/dl/" + dateTime + "/77840/Westport/2+Burnham+Hill", "GET", {}, {}, function(error, data){
    if (error){
      console.log("oops", error);
    }else{
      console.log("success", data);
    }
  });
}
