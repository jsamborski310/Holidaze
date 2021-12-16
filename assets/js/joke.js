
var norrisJoke = $('#joke');


var getQuotes = function () {

  var requestUrl = 'https://api.chucknorris.io/jokes/random';

  fetch(requestUrl)

    .then(function (response) {

      return response.json();
    })
    .then(function (data) {

      diplayJoke(data.value);
    });

}
getQuotes();


var diplayJoke = function (data) {

  var jokeData = `<h6>${data}</h6>`;

  norrisJoke.prepend(jokeData);



}
