# Ordr.in Node Library

## About

A node library for the ordr.in API
See full API documentation at http://hackfood.ordr.in

## Installation

This library can be installed with npm:

    npm install ordrin-api

## Usage

### Initialization

```js
var ordrinApi = require("ordrin-api");
var ordrin = new ordrinApi.APIs("YOUR-ORDRIN-API-KEY", ordrinApi.TEST)
```

### Callbacks

Because node is async, every function call you make to the ordrin api includes a
callback. This callback will be called when the API has finished processing the
request. This callback takes two arguments, `error` and `data`. If the request
fails, then `error` will be an `Error` object; otherwise it will be falsy. The
`data` argument contains the JavaScript object returned by the API.


### Order Endpoints

#### Guest Order

    ordrin.order_guest(data, callback)

##### Arguments

 - `data.rid` : Ordr.in's unique restaurant identifier for the restaurant.
 - `data.em` : The customer's email address
 - `data.tray` : Represents a tray of menu items in the format '[menu item id]/[qty],[option id],...,[option id]'
 - `data.tip` : Tip amount in dollars and cents
 - `data.first_name` : The customer's first name
 - `data.last_name` : The customer's last name
 - `data.phone` : The customer's phone number
 - `data.zip` : The zip code part of the address
 - `data.addr` : The street address
 - `data.addr2` : The second part of the street address, if needed
 - `data.city` : The city part of the address
 - `data.state` : The state part of the address
 - `data.card_name` : Full name as it appears on the credit card
 - `data.card_number` : Credit card number
 - `data.card_cvc` : 3 or 4 digit security code
 - `data.card_expiry` : The credit card expiration date.
 - `data.card_bill_addr` : The credit card's billing street address
 - `data.card_bill_addr2` : The second part of the credit card's biling street address.
 - `data.card_bill_city` : The credit card's billing city
 - `data.card_bill_state` : The credit card's billing state
 - `data.card_bill_zip` : The credit card's billing zip code
 - `data.card_bill_phone` : The credit card's billing phone number

###### Either

 - `data.delivery_date` : Delivery date
 - `data.delivery_time` : Delivery time
###### OR

 - `data.delivery_date` : Delivery date

#### User Order

    ordrin.order_user(data, callback)

##### Arguments

 - `data.rid` : Ordr.in's unique restaurant identifier for the restaurant.
 - `data.tray` : Represents a tray of menu items in the format '[menu item id]/[qty],[option id],...,[option id]'
 - `data.tip` : Tip amount in dollars and cents
 - `data.first_name` : The customer's first name
 - `data.last_name` : The customer's last name
 - `data.email` : The user's email
 - `data.current_password` : The user's current password

###### Either

 - `data.phone` : The customer's phone number
 - `data.zip` : The zip code part of the address
 - `data.addr` : The street address
 - `data.addr2` : The second part of the street address, if needed
 - `data.city` : The city part of the address
 - `data.state` : The state part of the address
###### OR

 - `data.nick` : The delivery location nickname. (From the user's addresses)
###### Either

 - `data.card_name` : Full name as it appears on the credit card
 - `data.card_number` : Credit card number
 - `data.card_cvc` : 3 or 4 digit security code
 - `data.card_expiry` : The credit card expiration date.
 - `data.card_bill_addr` : The credit card's billing street address
 - `data.card_bill_addr2` : The second part of the credit card's biling street address.
 - `data.card_bill_city` : The credit card's billing city
 - `data.card_bill_state` : The credit card's billing state
 - `data.card_bill_zip` : The credit card's billing zip code
 - `data.card_bill_phone` : The credit card's billing phone number
###### OR

 - `data.card_nick` : The credit card nickname. (From the user's credit cards)
###### Either

 - `data.delivery_date` : Delivery date
 - `data.delivery_time` : Delivery time
###### OR

 - `data.delivery_date` : Delivery date


### Restaurant Endpoints

#### Delivery Check

    ordrin.delivery_check(data, callback)

##### Arguments

 - `data.datetime` : Delivery date and time
 - `data.rid` : Ordr.in's unique restaurant identifier for the restaurant.
 - `data.addr` : Delivery location street address
 - `data.city` : Delivery location city
 - `data.zip` : The zip code part of the address


#### Delivery List

    ordrin.delivery_list(data, callback)

##### Arguments

 - `data.datetime` : Delivery date and time
 - `data.addr` : Delivery location street address
 - `data.city` : Delivery location city
 - `data.zip` : The zip code part of the address


#### Fee

    ordrin.fee(data, callback)

##### Arguments

 - `data.datetime` : Delivery date and time
 - `data.rid` : Ordr.in's unique restaurant identifier for the restaurant.
 - `data.subtotal` : The cost of all items in the tray in dollars and cents.
 - `data.tip` : The tip in dollars and cents.
 - `data.addr` : Delivery location street address
 - `data.city` : Delivery location city
 - `data.zip` : The zip code part of the address


#### Restaurant Details

    ordrin.restaurant_details(data, callback)

##### Arguments

 - `data.rid` : Ordr.in's unique restaurant identifier for the restaurant.



### User Endpoints

#### Change Password

    ordrin.change_password(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.password` : The user's new password
 - `data.current_password` : The user's current password


#### Create Account

    ordrin.create_account(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.pw` : The user's password
 - `data.first_name` : The user's first name
 - `data.last_name` : The user's last name


#### Create Address

    ordrin.create_addr(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.nick` : The nickname of this address
 - `data.phone` : The customer's phone number
 - `data.zip` : The zip code part of the address
 - `data.addr` : The street address
 - `data.addr2` : The second part of the street address, if needed
 - `data.city` : The city part of the address
 - `data.state` : The state part of the address
 - `data.current_password` : The user's current password


#### Create Credit Card

    ordrin.create_cc(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.nick` : The nickname of this address
 - `data.card_number` : Credit card number
 - `data.card_cvc` : 3 or 4 digit security code
 - `data.card_expiry` : The credit card expiration date.
 - `data.bill_addr` : The credit card's billing street address
 - `data.bill_addr2` : The second part of the credit card's biling street address.
 - `data.bill_city` : The credit card's billing city
 - `data.bill_state` : The credit card's billing state
 - `data.bill_zip` : The credit card's billing zip code
 - `data.bill_phone` : The credit card's billing phone number
 - `data.current_password` : The user's current password


#### Remove address

    ordrin.delete_addr(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.nick` : The nickname of this address
 - `data.current_password` : The user's current password


#### Remove Credit Card

    ordrin.delete_cc(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.nick` : The nickname of this address
 - `data.current_password` : The user's current password


#### Get Account Information

    ordrin.get_account_info(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.current_password` : The user's current password


#### Get All Saved Addresses

    ordrin.get_all_saved_addrs(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.current_password` : The user's current password


#### Get all saved credit cards

    ordrin.get_all_saved_ccs(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.current_password` : The user's current password


#### Get an Order

    ordrin.get_order(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.oid` : Ordr.in's unique order id number.
 - `data.current_password` : The user's current password


#### Get Order History

    ordrin.get_order_history(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.current_password` : The user's current password


#### Get a single saved address

    ordrin.get_saved_addr(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.nick` : The nickname of this address
 - `data.current_password` : The user's current password


#### Get a single saved credit card

    ordrin.get_saved_cc(data, callback)

##### Arguments

 - `data.email` : The user's email address
 - `data.nick` : The nickname of this address
 - `data.current_password` : The user's current password


