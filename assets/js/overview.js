var eventEl = document.getElementById('event');
var eventYearEL = document.getElementById('event-year');

var deathEventEL = document.getElementById('death-event');
var deathYearEL = document.getElementById('death-year');


var eventInfo;
var eventYear;

var deathEvent;
var deathYear;

var getHistory = function () {

    var history = "https://history.muffinlabs.com/date/2/14";
  
    fetch(history)
      .then(function (response) {
        return response.json();
      })
      .then(function (source) {
        
        // Event
        eventInfo = document.createElement('p');
        eventInfo.textContent = source.data.Events[0].text;
        eventEl.append(eventInfo);

        eventYear = document.createElement('span');
        eventYear.textContent = source.data.Events[0].year;
        eventYearEL.append(eventYear);


        // Death
        deathEvent = document.createElement('p');
        deathEvent.textContent = source.data.Deaths[0].text;
        deathEventEL.append(deathEvent);

        deathYear = document.createElement('span');
        deathYear.textContent = source.data.Deaths[0].year;
        deathYearEL.append(deathYear);

        
        
      });
  
  };

  getHistory();
