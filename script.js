const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid');
const $contain1 = $('<div>').addClass('container d-flex flex-row float-left pl-5 ');
const $h1 = $('<h1>').addClass('h-1 pb-3 pl-5').text('Welcome to Your OpenWeather');
const $btn = $('<button>').addClass('col-2 btn btn-dark').text('See Your Weather');
const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter your location, ex: Baali'}).addClass('col-9 form-control aria-label text');
$contain1.append($searchInput);
$searchInput.submit(() => {$('#input :input')});

$contain1.append($btn);
$jumboDiv.append($h1, $contain1);
$('body').append($jumboDiv);

const userLocation = $searchInput.get('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=9b1d4def9f4c5a84bc5a47775e26390d', (data) => {
    localStorage.setItem('location', JSON.stringify(userLocation));
});

const weathContain = 

// OpenWeather 5 day, 4 hour API for city, state, country api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}
// OneCall API: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// don't forget to revert the commit in tune tips

