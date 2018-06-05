$(document).ready(function() {
  $(".sidenav").sidenav();

  console.log("ready storage");

  chrome.storage.sync.get(["settings"], function(result) {
    if (typeof result.settings === "undefined") {
      var settings = {
        details: true,
        weather: true,
        dateTime: true
      };
      chrome.storage.sync.set({ settings: settings }, function() {});
    } else {
      if (result.settings) {
        if (!result.settings.details) {
          $(".footer-detailsCard").css("visibility", "hidden");
          $(".switch-check-details").removeAttr("checked");
        }
        if (!result.settings.weather) {
          $(".footer-weatherCard").css("visibility", "hidden");
          $(".switch-check-weather").removeAttr("checked");
        }
        if (!result.settings.dateTime) {
          $(".footer-dateTimeCard").css("visibility", "hidden");
          $(".switch-check-dateTime").removeAttr("checked");
        }
      }
    }
  });

  //chrome.storage.sync.clear();
});

$(".switch-check").click(function(event) {
  var settings = {};
  var key = $(this).attr("name");
  var value = $(this).prop("checked");

  if (value == true) {
    var selector = ".footer-" + key;
    $(selector).css("visibility", "visible");
  } else {
    var selector = ".footer-" + key;
    $(selector).css("visibility", "hidden");
  }

  chrome.storage.sync.get(["settings"], function(result) {
    result.settings[key] = value;
    chrome.storage.sync.set({ settings: result.settings }, function() {});
  });
});

$(document).ready(function() {
  $(".sidenav").sidenav();
  console.log("ready");
  function bzv(t) {
    console.log("rtotoeortqae", t);
  }
  function movieRandom(movie) {
    /*$('.detailsCard-name').html(photoDetails[index].name);
    $('.detailsCard-description').html(photoDetails[index].description);
    $('.detailsCard-year').html(photoDetails[index].year);*/
    $("body").css({
      background: "url(" + movie.crestUrl + ") no-repeat center center fixed "
    });
  }
  function getTeams() {

    $.ajax({
      headers: { "X-Auth-Token": "e47643f02cc64ae58404aeed573cca8d" },
      url: "http://api.football-data.org/v1/competitions/467/teams",
      dataType: "json",
      type: "GET"
    }).done(function(response) {
      console.log(response, "TO JE RESPON");
      movieRandom(response.teams[6]);
      bzv(response.teams);
    });

    $.ajax({
      headers: { "X-Auth-Token": "e47643f02cc64ae58404aeed573cca8d" },
      url: "http://api.football-data.org/v1/competitions/467/fixtures",
      dataType: "json",
      type: "GET"
    }).done(function(response) {
      console.log(response.fixtures, "TO JE RESPON2");
      var a = response.fixtures.filter(
        fixt => fixt.homeTeamName == "Russia" || fixt.awayTeamName == "Russia"
      );
      console.log(a, "Rusija domacin");
      //za Utakmice, uzeti od izabranog tima id ili ime i filtirirati po tome
    });
    $.ajax({
      headers: { "X-Auth-Token": "e47643f02cc64ae58404aeed573cca8d" },
      url: "http://api.football-data.org/v1/competitions/467/leagueTable",
      dataType: "json",
      type: "GET"
    }).done(function(response) {
      console.log(response.standings, "TO JE RESPON3");
      //za Utakmice, uzeti od izabranog tima id ili ime i filtirirati po tome
    });
  }
  getTeams();

  function updateDateTime() {
    //handles date
    var date = new Date(),
      locale = "en-us";
    var localizedDate = date.toLocaleString(locale, {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    //handles time
    var hour = date.getHours();
    var min = date.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }

    //writes out date and time
    $(".infoTime").html(hour + ":" + min);
    $(".infoDate").html(localizedDate);

    setTimeout(updateDateTime, 1000);
  }

  setTimeout(updateDateTime, 100);
});

let selectedTeam = photoDetails.filter(photo => photo.name == "France");
console.log("Slicicce", selectedTeam);
$(".shuffle").click(function() {
  var index = Math.floor(Math.random() * selectedTeam.length) + 1;
  console.log(index, "to je index");

  var bg_img = "/img/" + selectedTeam[0].name + "/bg" + index + ".jpg";

  $("body").css({
    background: "url(" + bg_img + ") no-repeat center center fixed",
    "background-size": "cover"
  });
  $(".detailsCard-name").html(photoDetails[index].name);
  $(".detailsCard-description").html(
    "Location: " + photoDetails[index].location
  );
  $(".detailsCard-year").html("Capacity: " + photoDetails[index].capacity);
});

$(".mySelect").change(function(event) {
  let team = $(this).val();
  console.log(team);
  let selectedTeam = photoDetails.filter(photo => photo.name == team);
  console.log(selectedTeam, "to je repr");
  var index = Math.floor(Math.random()+1 * selectedTeam.length);
  console.log(index, "to je index");

  var bg_img = "/img/" + selectedTeam[0].name + "/bg" + index + ".jpg";

  $("body").css({
    background: "url(" + bg_img + ") no-repeat center center fixed",
    "background-size": "100% 100%"
  });
});

$("#search").keyup(function(event) {
  var query = $(this).val();

  if (event.which == 13) {
    window.location.href = "http://google.com/search?q=" + query;
  }
});
