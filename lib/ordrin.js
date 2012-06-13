exports.init = function(options){
  globals = options; // this object will contain all global variables. Such as api key, and server urls.

  return {
    restaurant: require("./restaurant"),
    order: require("./order"),
    user: require("./user")
  }
}
