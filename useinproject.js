const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid');
const $contain1 = $('<div>').addClass('container container-fluid d-flex flex-row pl-5');
const $h1 = $('<h1>').addClass('pb-3 pl-5').text('Welcome to Your OpenWeather');
const $btn = $('<button>').addClass('btn btn-dark flex-shrink-0').text('See Your Weather');
const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter your location, ex: Columbus, OH'}).addClass('form-control aria-label text');
const $location = $('<div>').addClass('h2 pt-3 pb-2');
$contain1.append($searchInput, $btn);
$jumboDiv.append($h1, $contain1);
$('body').append($jumboDiv);

const showLocation = () => {
  $location.addClass('text-capitalize').text($searchInput.val());
  $('body').append($location);
};

let n = 0;
const getWeather = () => {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${$searchInput.val()},us&appid=9b1d4def9f4c5a84bc5a47775e26390d`,
    method: 'GET',
  }).then((response) => {
    console.log(response);
  });
  
  localStorage.setItem('location' + n, $searchInput.val());
  n++;
};

const getForecast = () => {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${$searchInput.val()}&appid=9b1d4def9f4c5a84bc5a47775e26390d`,
    method: 'GET',
  }).then((response) => {
    console.log(response);
  });
};

const uvIndex = () => {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=9b1d4def9f4c5a84bc5a47775e26390d`,
    method: 'GET',
  }).then((response) => {
    console.log(response)
  })
};

$btn.on('click', () => {showLocation(), getWeather(), getForecast(), uvIndex()});

$searchInput.on('keypress', (e) => {
  if (e.which === 13) {
    showLocation();
    getWeather();
    getForecast();
    uvIndex();
  };
});

const $contain2 = $('<div>').addClass('container container-fluid d-flex flex-row float-left');
for (i = 0; i < 5; i++) {
    const $card = $('<div>').addClass('card m-1 p-5').text('');
    $contain2.append($card);
};
$('body').append($contain2);