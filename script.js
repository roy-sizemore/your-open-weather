const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid');
const $contain1 = $('<div>').addClass('container container-fluid d-flex flex-row float-left pl-5');
const $h1 = $('<h1>').addClass('h-1 pb-3 pl-5').text('Welcome to Your OpenWeather');
const $btn = $('<button>').addClass('btn btn-dark flex-shrink-0').text('See Your Weather');
const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter your location, ex: Baali'}).addClass('form-control aria-label text');
$searchInput.submit(() => {$('#input :input')});
$contain1.append($searchInput);
$contain1.append($btn);
$jumboDiv.append($h1, $contain1);
$('body').append($jumboDiv);

$.ajax({
  url: 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=9b1d4def9f4c5a84bc5a47775e26390d',
  method: 'GET',
}).then(function (response) {
  console.log(response);
});

const $contain2 = $('<div>').addClass('container container-fluid d-flex flex-row float-left p-5');
for (i = 0; i < 5; i++) {
    const $card = $('<div>').addClass('card p-5').text('placeholder');
    $contain2.append($card);
};
$jumboDiv.append($contain2);

// OpenWeather 5 day, 4 hour API for city, state, country api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}
// OneCall API: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=9b1d4def9f4c5a84bc5a47775e26390d



