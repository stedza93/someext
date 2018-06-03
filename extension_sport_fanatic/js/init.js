$(document).ready(function () {
  $('.sidenav').sidenav();
  console.log('ready storage');

  chrome.storage.sync.get(['settings'], function (result) {
    if (typeof result.settings === 'undefined') {
      var settings = {
        details: true,
        weather: true,
        dateTime: true
      }
      chrome.storage.sync.set({ settings: settings }, function () {
      });
    }
    else {
      if (result.settings) {
        if (!result.settings.details) { $('.footer-detailsCard').css('visibility', 'hidden'); $('.switch-check-details').removeAttr('checked'); }
        if (!result.settings.weather) { $('.footer-weatherCard').css('visibility', 'hidden'); $('.switch-check-weather').removeAttr('checked'); }
        if (!result.settings.dateTime) { $('.footer-dateTimeCard').css('visibility', 'hidden'); $('.switch-check-dateTime').removeAttr('checked'); }
      }
    }
  });

  //chrome.storage.sync.clear();
});

$('.switch-check').click(function (event) {
  var settings = {};
  var key = $(this).attr('name');
  var value = $(this).prop('checked');

  if (value == true) {
    var selector = '.footer-' + key;
    $(selector).css('visibility', 'visible');
  }
  else {
    var selector = '.footer-' + key;
    $(selector).css('visibility', 'hidden');
  }

  chrome.storage.sync.get(['settings'], function (result) {
    result.settings[key] = value;
    chrome.storage.sync.set({ settings: result.settings }, function () {
    });
  });
});

$(document).ready(function () {
  $('.sidenav').sidenav();
  console.log('ready');
  function movieRandom(movie) {
    var index = Math.floor(Math.random() * (movie.length - 1)) + 1;
    console.log(index);

    /*$('.detailsCard-name').html(photoDetails[index].name);
    $('.detailsCard-description').html(photoDetails[index].description);
    $('.detailsCard-year').html(photoDetails[index].year);*/
    $('body').css({ 'background': 'url(' + "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie[index].poster_path + ') ' });
  }
  function getPopularMovies() {
    var url =
      "https://api.themoviedb.org/3/discover/movie?sort_by=desc&api_key=9e62b31bcedb94dd85b12b37b7be33b4";

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var movie = data.results;
        console.log(movie);
        movieRandom(movie);
      })

      .catch(function (error) {
        console.log(error);
      });

  }
  getPopularMovies();
  
  function updateDateTime() {
    //handles date
    var date = new Date(), locale = "en-us";
    var localizedDate = date.toLocaleString(locale, { weekday: 'long', day: '2-digit', month: "long", year: 'numeric' });

    //handles time
    var hour = date.getHours();
    var min = date.getMinutes();
    if (min < 10) { min = '0' + min; }

    //writes out date and time
    $('.infoTime').html(hour + ':' + min);
    $('.infoDate').html(localizedDate);

    setTimeout(updateDateTime, 1000);
  }

  setTimeout(updateDateTime, 100);
});


$('.shuffle').click(function () {
  var index = Math.floor(Math.random() * 8) + 1;

  var bg_img = '/img/bg' + index + '.jpg';

  $('body').css({ 'background': 'url(' + bg_img + ') repeat center center ', 'background-size': 'auto' });
  $('.detailsCard-name').html(photoDetails[index].name);
  $('.detailsCard-description').html('Location: ' + photoDetails[index].location);
  $('.detailsCard-year').html('Capacity: ' + photoDetails[index].capacity);
});

$('#search').keyup(function (event) {

  var query = $(this).val();

  if (event.which == 13) {
    window.location.href = "http://google.com/search?q=" + query;
  }
});