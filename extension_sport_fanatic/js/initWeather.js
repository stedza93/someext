$(document).ready(function() {
  $.getJSON('https://json.geoiplookup.io/api?callback=?', function(data) {
    var coordinates = data.latitude + ',' + data.longitude;
    var unit = 'c';
    //console.log(JSON.stringify(data, null, 2));
    loadWeather(coordinates,'', unit);
  }); //@params location, woeid
});

function loadWeather(location, woeid, unit) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: unit,
    success: function(weather) {
      console.log(weather)
      html = '<img class="weather-icon" src="' + weather.image + '"/>';
      html += '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.country+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>Tomorrow: '+ weather.forecast[0].high + '&deg;' + weather.units.temp +'</li></ul>';  
      
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
   
  });
}
