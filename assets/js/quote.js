var quoteApiKey = '95a099bf03a9d4932348cfbe9052348b6a5350ae' 

var quoteData;

function getQuotes() {

var requestUrl = 'https://zenquotes.io/api/today/';

fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

}
getQuotes();