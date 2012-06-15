exports.init = function(options){
  globals = options; // this object will contain all global variables. Such as api key, and server urls.

  return {
    restaurant: require("./restaurant"),
    order: require("./order"),
    user: require("./user"),
    Address: Address,
    UserLogin   : UserLogin
  }
}

UserLogin    = function(email, pass){
  this.email     = email;
  this.password  = pass;
}

Address = function (addr, city, state, zip, phone, addr2){
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
