//*****API-ETSY*********
var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

fetchJSONP(url, function(data) {
  // do something with data
  //something like...... [displayProduct(data)]
});

//****ADDING JQUERY,UNDERSCORE AND HANDLEBARS INTO THE PROJECT*****
var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');

//*****START OF THE CODE********
var source = $('#photo-album').html();
var template = handlebars.compile(source);
console.log(source);

var context = {
  'title': 'Cat Album',
}


var albums =[
  {
    'title': 'Cat Album',
  },{
    'title': 'Dog Album',
  },{
    'title': 'Bird Album',
  },{
    'title': 'Bear Album',
  }

];

_.each(albums, function(album){
  $('#album-container').append(template(album))
});


// $('#album-container').html(template(context));
// $('#album-container').append(template());  //it just keeps adding the above line
// $('#album-container').append(template());
// $('#album-container').append(template());



















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
