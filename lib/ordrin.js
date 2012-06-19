(function(){
  "use strict";

  var restaurantLib = require("./restaurant");
  var userLib = require("./user");
  var orderLib = require("./order");
  var crypto   = require("crypto");


  exports.init = function(options){
    var globals = options; // this object will contain all global variables. Such as api key, and server urls.

    return {
      restaurant: new restaurantLib.Restaurant(globals),
      user: new userLib.User(globals),
      order: new orderLib.Order(globals),
      Address: Address,
      UserLogin: UserLogin,
      CreditCard: CreditCard,
      TrayItem: TrayItem,
      Tray: Tray
    }
  }

  var UserLogin    = function(email, pass){
    this.email     = email;
    this.password  = pass;


    this.encodePassword = function(){
      if (this.password != false){
        this.password = crypto.createHash("SHA256").update(this.password).digest("hex");
      }
    }

    this.encodePassword();
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
      var phoneString = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6);
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

    this.formatExpirationDate = function(){
      this.formatExpirationMonth();
      return this.expiryMonth + "/" + this.expiryYear;
    }

    this.formatExpirationMonth = function(){
      if (String(this.expiryMonth).length == 1){
        this.expiryMonth = "0" + String(this.expiryMonth);
      }
    }
    this.formatExpirationMonth();

  }

  var TrayItem = function(itemId, quantity, options){
    this.itemId   = itemId;
    this.quantity = quantity;
    this.options  = options;

    this.buildItemString = function(){
      var string = this.itemId + "/" + this.quantity;

      for (var i = 0; i< this.options.length; i++){
        string += "," + this.options[i];
      }
      return string;
    }

  }

  var Tray = function(items){
    this.items = items;

    this.buildTrayString = function(){
      var string = "";
      for (var i = 0; i < this.items.length; i++){
        string += "+" + this.items[i].buildItemString();
      }
      return string.substring(1); // remove that first plus
    };
  }
}());
