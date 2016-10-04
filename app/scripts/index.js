var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');

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
  $('album-container').append(template(album))
});


// $('#album-container').html(template(context));
// $('#album-container').append(template());  //it just keeps adding the above line
// $('#album-container').append(template());
// $('#album-container').append(template());
