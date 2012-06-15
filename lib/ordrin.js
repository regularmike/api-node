(function(){
  "use strict";

  var restaurantLib = require("./restaurant");
  var userLib = require("./user");
  require("./order");


  exports.init = function(options){
    var globals = options; // this object will contain all global variables. Such as api key, and server urls.

    return {
      restaurant: new restaurantLib.Restaurant(globals),
      order: require("./order"),
      user: new userLib.User(globals),
      Address: Address,
      UserLogin: UserLogin,
      CreditCard: CreditCard
    }
  }

  var UserLogin    = function(email, pass){
    this.email     = email;
    this.password  = pass;
  }

  var Address = function (addr, city, state, zip, phone, addr2){
    this.addr  = addr;
    this.city  = city;
    this.state = state;
    this.zip   = zip;
    this.phone = phone;
    this.addr2 = addr2;

    this.makeAddressString = function(){
      var addressString = this.addr + ", " + this.city + " " + this.state + ", " + this.zip;
      return addressString;
    }

    this.formatPhoneNumber = function(){
      var phone       = String(this.phone);
      var phoneString = "(" + phone.substring(0, 3) + ") " + phone.substring(3, 6) + "-" + phone.substring(6);
      return phoneString;
    }
  }

  var CreditCard = function(name, expiryMonth, expiryYear, billAddress, number, cvc){
    this.name        = name;
    this.expiryMonth = expiryMonth;
    this.expiryYear  = expiryYear;
    this.billAddress = billAddress;
    this.number      = number;
    this.cvc         = cvc;
  }
}());
