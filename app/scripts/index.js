// //****ADDING JQUERY,UNDERSCORE AND HANDLEBARS INTO THE PROJECT*****
var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');


//*****API-ETSY*********
var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=golf&includes=Images,Shop";
// console.log(url);

var source = $('#product-listings').html();
var template = handlebars.compile(source);
// console.log(source);

fetchJSONP(url, function(data) {

  var dataArray = data.results;
  // console.log(data.results);

  var itemInfo = [];

dataArray.forEach(function(items){

  var newObjectInfo={
    'images': items.Images[0].url_fullxfull,
    'title': items.title,
    'shop-name' : items.Shop.shop_name,
    'price' : items.price
  }
  itemInfo.push(newObjectInfo);
});
 console.log(itemInfo);



itemInfo.forEach(function(displayToPage){
  $('.js-block').append(template(displayToPage));
});

});


/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
