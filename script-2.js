const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid');
const $forecastCol = $('<div>').addClass('container container-fluid flex-row float-left w-75')
const $searchCol = $('<div>').addClass('container container-fluid flex-row float-left w-25')
const $contain1 = $('<div>').addClass('container container-fluid d-flex flex-row float-left pl-5');
const $h1 = $('<h1>').addClass('h-1 pb-3 pl-5').text('Welcome to Your OpenWeather');
const $btn = $('<button>').addClass('btn btn-dark flex-shrink-0 w-25')
const $magGlass = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></svg>';
$btn.append($magGlass)
const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter your location, ex: Columbus, OH'}).addClass('form-control aria-label text w-75 float-left');
const $contain2 = $('<div>').addClass('container container-fluid d-flex flex-row');

$searchCol.append($searchInput, $btn);
$jumboDiv.append($h1);
$forecastCol.append($contain1, $contain2)
$('body').append($jumboDiv, $searchCol, $forecastCol);

const cardFill = () => {
  for (i = 0; i < 5; i++) {
    const $card = $('<div>').addClass('card');
    const $textArea = $('<textarea>').attr({style: 'height: 200px; resize: none'}).text(`Temp: ${response.weather.wind.speed}\n\nHumidity: \n\nWind Speed: \n\nUV Index: \n`);
    $card.append($textArea);
    $contain2.append($card);
  };      
};

let n = 0;
const getWeather = () => {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${$searchInput.val()},us&appid=9b1d4def9f4c5a84bc5a47775e26390d`,
    method: 'GET',
  }).then((response) => {
    console.log(response);
    $('.city-title').text('');
    $forecastCol.prepend($('<h2>').text(response.name).addClass('city-title pt-1 pl-1 ml-1'));
    
    if (!(response.name in localStorage)) {
        localStorage.setItem(response.name, response.name);
        $searchCol.append($('<div>').addClass('w-100 border border-dark mt-1 p-1').text(response.name));
        };
    });

    n++;
    $searchInput.val('')
};

const getForecast = () => {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${$searchInput.val()},us&appid=9b1d4def9f4c5a84bc5a47775e26390d`,
    method: 'GET',
    success: function(data) {
        lat = data.city.coord.lat
        lon = data.city.coord.lon
        const $card = $('<div>').addClass('card');
        const $textArea = $('<textarea>').attr({style: 'height: 200px; resize: none'}).text(`Temp: ${$searchInput.weather.wind.speed}\n\nHumidity: \n\nWind Speed: \n\nUV Index: \n`);
        $card.append($textArea);
        $contain2.append($card);
    }
  }).then((response) => {
    console.log(response);
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=9b1d4def9f4c5a84bc5a47775e26390d`,
        method: 'GET',
      }).then((response) => {
        for (i = 0; i < 4; i++) {
          const $card = $('<div>').addClass('card');
          const $textArea = $('<textarea>').attr({style: 'height: 200px; resize: none'}).text(`Temp: ${$searchInput.weather.wind.speed}\n\nHumidity: \n\nWind Speed: \n\nUV Index: \n`);
          $card.append($textArea);
          $contain2.append($card);
        };      
      });
  });
};

$btn.on('click', () => {getWeather(), getForecast()});

$searchInput.on('keypress', (e) => {
  if (e.which === 13) {
    getWeather();
    getForecast();
  };
});

// 5 day forecast: `https://api.openweathermap.org/data/2.5/forecast?q=${$searchInput.val()}&appid=9b1d4def9f4c5a84bc5a47775e26390d`
// UV index: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=9b1d4def9f4c5a84bc5a47775e26390d`

// # 06 Server-Side APIs: Weather Dashboard

// Instructions:
// ## Your Task

// Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

// Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that provides basic setup and usage instructions. You will use `localStorage` to store any persistent data.

// ## User Story

// ```
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// ```

// ## Acceptance Criteria

// ```
// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// ```

// ## Mock-Up

// The following image shows the web application's appearance and functionality:

// ![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./Assets/06-server-side-apis-homework-demo.png)

// ## Grading Requirements

// This homework is graded based on the following criteria: 

// ### Technical Acceptance Criteria: 40%

// * Satisfies all of the above acceptance criteria plus the following:

//     * Uses the OpenWeather API to retrieve weather data.

//     * Uses `localStorage` to store persistent data.

// ### Deployment: 32%

// * Application deployed at live URL.

// * Application loads with no errors.

// * Application GitHub URL submitted.

// * GitHub repository that contains application code.

// ### Application Quality: 15%

// * Application user experience is intuitive and easy to navigate.

// * Application user interface style is clean and polished.

// * Application resembles the mock-up functionality provided in the homework instructions.

// ### Repository Quality: 13%

// * Repository has a unique name.

// * Repository follows best practices for file structure and naming conventions.

// * Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

// * Repository contains multiple descriptive commit messages.

// * Repository contains quality readme file with description, screenshot, and link to deployed application.
