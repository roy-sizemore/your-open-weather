const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid');
const $contain1 = $('<div>').addClass('container d-flex flex-row');
const $h1 = $('<h1>').addClass('h-1 pl-5').text('Welcome to Your OpenWeather');
// const $searchForm = $('<form>').addClass('col-9 pt-1 form-control aria-label text').text('Enter your location, ex: Baali');
const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter your location, ex: Baali'}).addClass('col-9 pt-1 form-control aria-label text');
$contain1.append($searchInput);
$searchInput.submit(() => {$('#input :input')});
const $btn = $('<button>').addClass('col-2 btn btn-dark').text('See Your Weather');
$contain1.append($btn);
$jumboDiv.append($h1, $contain1);
$('body').append($jumboDiv);

