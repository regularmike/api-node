# Ordr.in Node Library

## About
A node library for the ordr.in API  
See full API documantation at <a href="http://ordr.in/developers">http://ordr.in/developers</a>

## Installation
The simplest way to install is with npm:  
<pre>
  npm install ordrin-api
</pre>


## Usage  

### Initialization
<pre>
  var ordrinApi = require("ordrin-api");

  var ordrin = ordrinApi.init({
    apiKey: "YOUR-ORDRIN-API-KEY",
    restaurantUrl: "r-test.ordr.in",
    userUrl: "u-test.ordr.in",
    orderUrl: "o-test.ordr.in"
  });
</pre>
Note that for the Urls https:// and the trailing / are all implied. DO NOT include them in the Url strings. The ordr.in API only supports https requests.

### Callbacks
Because node is async every function call you make to the ordrin api includes a callback. This will be called when the api has finished your request. The format of this callback is always the same.  
It takes two parameters: error and data.  
If there's no error than error will be false, otherwise it will be an object.  
Data is an object containing the data returned from the ordr.in api as described in the API documentation located at <a href="http://ordr.in/developers">http://ordr.in/developers</a>.

Example function callback:  
<pre>
  var callback = function(error, data){
    if (error){
      console.error("Ordr.in API error", error.msg);
    }else{
      // program logic
    }
  }
</pre>

### Data Structures
The following classes are part of the library and are used whenever there is an address, credit card, user, tray item, or tray.  
They are both returned by and should be passed into every one of the library's function calls.

<pre>
  Address = {
    addr: String,
    city: String,
    state: String,
    zip: Number,
    phone: Number,
    addr2: String
  }

  CreditCard = {
    name: String,
    expiryMonth: Number,
    expiryYear: Number,
    billAddress: String, // An object of the above address class
    number: Number,
    cvc: Number
  }

  UserLogin = {
    email: String,
    password: String // this is always an unencoded password 
  }

  trayItem = {
    itemId: Number,
    quantity: Number,
    options: Array // array of option ids
  }

  tray = {
    items: Array // array of trayItem objects of the above class
  }
</pre>
You can create an object of one of these classes like so:
<pre>
  var user = new Ordrin.UserLogin("example@example.com", "password");
</pre>


### Restaurant API
<pre>
  ordrin.restaurant.getDeliveryList(dateTime, address, callback);
  
  ordrin.restaurant.getDeliveryCheck(restaurantId, dateTime, address, callback);

  ordrin.restaurant.getFee(restaurantId, subtotal, tip, dateTime, address, callback);

  ordrin.restaurant.getDetails(restuarantId, callback);
</pre>

### User API
<pre>
  ordrin.user.getUser(userLogin, callback);

  ordrin.user.createUser(userLogin, firstName, lastName, callback);

  ordrin.user.getAllAddresses(userLogin, callback);

  ordrin.user.getAddress(userLogin, addressName, callback);

  ordrin.user.setAddress(userLogin, addressName, address, callback);

  ordrin.user.removeAddress(userLogin, addressName, callback);

  ordrin.user.getAllCreditCards(userLogin, callback);

  ordrin.user.getCreditCard(userLogin, cardName, callback);

  ordrin.user.setCreditCard(userLogin, cardName, creditCard, callback);

  ordrin.user.removeCreditCard(userLogin, cardName, callback);

  ordrin.user.getOrderHistory(userLogin, callback);

  ordrin.user.getOrderDetails(userLogin, orderId, callback);

  ordrin.user.setPassword(userLogin, newPassword, callback);
</pre>

### Order API
The Order API includes the ability to create a new user when you place the order. If you want to do that just pass in the new user's login credentials in the user object, and set createUser to true.

If you don't want the order to be associated with a user account then pass in false as the password inside the user object, and setCreateUser to false.

<pre>
  ordrin.order.placeOrder(restaurantId, tray, tip, deliveryTime, firstName, lastName, address, creditCard, user, createUser, callback)
</pre>
