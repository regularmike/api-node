(function(){
  "use strict";

  var _ = require("underscore");

  var ordrin = require("./");
  var api_key = "2HGAzwbK5IWNJPRN_c-kvbqtfGhS-k2a6p-1Zg2iNN4";
  var ordrin_api = new ordrin.APIs(api_key);

  var data = {
    addr : "900 Broadway",
    city : "New York",
    zip : "10003",
    state : "NY",
    phone : "555-555-5555"
  }
  var addr = "900 Broadway";
  var city = "New York";
  var addr_zip = "10003";

  var address = {'addr' : addr,
                 'city' : city,
                 'state' : 'NY',
                 'zip' : addr_zip,
                 'phone' : '555-555-5555'};
  var address_nick = 'addr1';

  var first_name = 'Test';
  var last_name = 'User';
  var credit_card = {'card_name' : first_name+' '+last_name,
                 'card_expiry' : '01/2016',
                 'card_number' : '4111111111111111',
                 'card_cvc' : '123',
                 'card_bill_addr' : address["addr"],
                 'card_bill_city' : address["city"],
                 'card_bill_state' : address["state"],
                 'card_bill_zip' : address["zip"],
                 'card_bill_phone' : address["phone"]};
  var credit_card_save = {'card_expiry' : '01/2016',
                      'card_number' : '4111111111111111',
                      'card_cvc' : '123',
                      'bill_addr' : addr,
                      'bill_city' : city,
                      'bill_state' : address["state"],
                      'bill_zip' : addr_zip,
                      'bill_phone' : address["phone"]};
  var credit_card_nick = 'cc1';

  var unique_id = Date.now();
  var email = 'node+'+unique_id+'@ordr.in';
  var password = 'password';
  var login = {'email' : email,
               'current_password' : password};
  var alt_first_name = 'Example';
  var alt_email = 'node+'+unique_id+'alt@ordr.in';
  var alt_login = {'email' : alt_email,
                   'current_password' : password};
  var new_password = 'password1';

  function find_item_to_order(item_list){
    var result = null;
    _.each(item_list, function(item){
      if(item.is_orderable){
        if(parseFloat(item.price)>=5.00){
          result = item.id;
        }
      } else {
        if(_.has(item, "children")){
          var item_id = find_item_to_order(item.children);
          if(item_id != null){
            result = item_id;
          }
        }
      }
    });
    return result;
  }

  ordrin_api.delivery_list(_.extend(_.clone(address), {datetime:"ASAP"}), function(err, delivery_list){
    if(err){
      console.log(err);
      return;
    }
    var restaurant_id = delivery_list[0].id.toString();
    ordrin_api.restaurant_details({rid : restaurant_id}, function(err, detail){
      if(err){
        console.log(err);
        return;
      }
      var item_id = find_item_to_order(detail.menu);
      var tray = item_id+"/10";
      var data = {}
      _.extend(data, address);
      _.extend(data, credit_card);
      _.extend(data, {rid : restaurant_id,
                      em : email,
                      tray : tray,
                      tip : "5.00",
                      first_name : first_name,
                      last_name : last_name,
                      delivery_date : "ASAP"})
      ordrin_api.order_guest(data, function(err, response){
        if(err){
          throw err;
        }
        console.log(response);
      });

      ordrin_api.create_account({email:email,
                                 pw:password,
                                 first_name:first_name,
                                 last_name:last_name},
                                function(err, login_resp){
                                  if(err){
                                    console.log(err);
                                  }
                                  console.log(login_resp);
                                });
    });
  });
}());
