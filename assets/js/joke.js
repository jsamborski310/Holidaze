
var randomQuote = $('#joke');


var getQuotes = function () {

  var requestUrl = 'http://quotes.stormconsultancy.co.uk/random.json';

  fetch(requestUrl)

    .then(function (response) {

      return response.json();
    })
    .then(function (data) {
console.log(data)
      diplayQuote(data.quote);
     
      diplayQuote('-' + data.author);
    });

}
getQuotes();


var diplayQuote= function (data) {

  var quoteData = `<h6>${data}</h6>`;
  var authorName = `<p>${data}<p>`;
  randomQuote.append(quoteData);



}
