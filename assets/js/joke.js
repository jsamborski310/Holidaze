
var norrisJoke = document.getElementById('joke')


var getQuotes = function () {

var requestUrl = 'https://api.chucknorris.io/jokes/random';

fetch(requestUrl)
   
    .then(function (response) {
   
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

}
getQuotes();


var diplayJoke = function () {

var jokedata = document.createElement('div');


}