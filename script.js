// Adds Jumbotron, search input, search button and forecast divs, input and styling using Bootstrap
const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid');
const $forecastCol = $('<div>').addClass('container container-fluid flex-row float-left w-75');
const $searchCol = $('<div>').addClass('container container-fluid flex-row float-left w-25');
const $contain1 = $('<div>').addClass('container container-fluid pl-5');
const $h1 = $('<h1>').addClass('h-1 pb-3 pl-5').text('Welcome to Your OpenWeather');
const $btn = $('<button>').addClass('btn btn-dark flex-shrink-0 w-25');
const $magGlass = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></svg>';
$btn.append($magGlass);
const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter your location, ex: Columbus, OH'}).addClass('form-control aria-label text w-75 float-left');
const $contain2 = $('<div>').addClass('container container-fluid d-flex flex-row').attr('id', 'contain2');

$searchCol.append($searchInput, $btn);
$jumboDiv.append($h1);
$forecastCol.append($contain1, $contain2);
$('body').append($jumboDiv, $searchCol, $forecastCol);

// Adds 5-day forecast cards
for (i = 0; i < 5; i++) {
  const $card = $('<div>').addClass('card m-2').attr('id', i)
  $contain2.append($card);
};

// Pairs up weather condition codes with icon codes/filenames and sets icon URL up to wildcard position
const weatherIcons = {
  "Clear": "01d",
  "Clouds": "02d",
  "Drizzle": "09d",
  "Rain": "10d",
  "Thunderstorm": "11d",
  "Snow": "13d",
  "Atmosphere": "50d",
};

let iconURL = "<img src='http://openweathermap.org/img/wn/";

// Adds current conditions, 5-day forecast and UVI
const getWeather = () => {
  // 5d forecast
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${$searchInput.val()},us&units=imperial&appid=9b1d4def9f4c5a84bc5a47775e26390d`,
    method: 'GET',
  }).then((response) => {
    // Empties each card; adds date +1; adds temp and humidity, then finds the appropriate condition in weatherIcons object and adds the icon
    $('.card').empty();
    $('#0').append(moment().add(1, 'days').format('MM/DD'));
    $('#0').append("</br>" + response.list[6].main.temp + "° F");
    $('#0').append("</br>" + response.list[6].main.humidity + "% humidity");
    $('#0').append(iconURL + weatherIcons[response.list[6].weather[0].main] + ".png'>");
    $('#1').append(moment().add(2, 'days').format('MM/DD'));
    $('#1').append("</br>" + response.list[14].main.temp + "° F");
    $('#1').append("</br>" + response.list[14].main.humidity + "% humidity");
    $('#1').append(iconURL + weatherIcons[response.list[14].weather[0].main] + ".png'>");
    $('#2').append(moment().add(3, 'days').format('MM/DD'));
    $('#2').append("</br>" + response.list[22].main.temp + "° F");
    $('#2').append("</br>" + response.list[22].main.humidity + "% humidity");
    $('#2').append(iconURL + weatherIcons[response.list[22].weather[0].main] + ".png'>");
    $('#3').append(moment().add(4, 'days').format('MM/DD'));
    $('#3').append("</br>" + response.list[30].main.temp + "° F");
    $('#3').append("</br>" + response.list[30].main.humidity + "% humidity");
    $('#3').append(iconURL + weatherIcons[response.list[30].weather[0].main] + ".png'>");
    $('#4').append(moment().add(5, 'days').format('MM/DD'));
    $('#4').append("</br>" + response.list[38].main.temp + "° F");
    $('#4').append("</br>" + response.list[38].main.humidity + "% humidity");
    $('#4').append(iconURL + weatherIcons[response.list[38].weather[0].main] + ".png'>");
  });

  $.ajax({
    // Retrieves today's weather
    url: `https://api.openweathermap.org/data/2.5/weather?q=${$searchInput.val()},us&units=imperial&appid=9b1d4def9f4c5a84bc5a47775e26390d`,
    method: 'GET',
    success: function(data) {
      // Gets latitude and longitude for use in UVI API
      lat = data.coord.lat;
      lon = data.coord.lon;
    }
    }).then((response) => {
      // Retrieves UVI and sets it in localStorage for use in the UVI section
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=9b1d4def9f4c5a84bc5a47775e26390d`,
        method: 'GET',
        success: function(data) {
        localStorage.setItem('uv_index', data.value)}
      });

      // Clears current city (if any), adds new city/current date
      $('#city-title').remove();
      $contain1.prepend($('<h2>').text(response.name + ' ' + moment().format("MM/DD/YY")).attr('id', 'city-title').addClass('w-100'));
      
      // Gets UVI from localStorage and sets status (low/mod/high)
      let uv_index = localStorage.getItem('uv_index');
      let uv_stat;
      if (uv_index <= 2) {
        uv_stat = "low";
      } else if (uv_index >2 && uv_index <=5) {
        uv_stat = "moderate";
      } else {
        uv_stat = "high";
      };

      // Clears all current statuses, 
      $('#stats').remove();
      $contain1.append($('<div>').attr('id', 'stats').addClass('w-100'));
      $('#stats').append($('<textarea readonly>').text(`Temperature: ${response.main.temp}° F (feels like ${response.main.feels_like}° F)\nHumidity: ${response.main.humidity}%\nWind Speed: ${response.wind.speed} mph`));
      $('#stats').append(`<div class='box' id='index-box'>UV Index: ${uv_index} (${uv_stat})</div>`);
      $('#stats').append(`<div class='box' id='now-icon' + ".png'>`);
      $('#now-icon').append(iconURL + weatherIcons[response.weather[0].main] + ".png'>");
      
      if (uv_stat === "low") {
        $('#index-box').css('background-color', 'darkgreen')
      } else if (uv_stat === "moderate") {
        $('#index-box').css('background-color', 'goldenrod')
      } else {
        $('#index-box').css('background-color', 'red')
      };

      if (!(response.name in localStorage)) {
          localStorage.setItem(response.name, response.name);
          $searchCol.append($('<button>').addClass('w-100 searchHist').text(response.name).attr('id', response.name))
          };
      });

      $searchInput.val('')
};

$btn.on('click', () => {getWeather(), getForecast()});
$searchInput.on('keypress', (e) => {
  if (e.which === 13) {
    getWeather();
  };
});

$searchCol.on('click', '.searchHist', function() {
  $searchInput.val($(this).text());
  getWeather();
});

