var eventEl = document.getElementById('event');
var eventYearEL = document.getElementById('event-year');

var deathEventEL = document.getElementById('death-event');
var deathYearEL = document.getElementById('death-year');


var eventInfo;
var eventYear;

var deathEvent;
var deathYear;


var holidayEl;
  
  
///////////////////////////////////////

var holidayOverview = document.getElementById("holiday-overview");

function showHolidayOverview () {

 var  holidayDetails = JSON.parse(localStorage.getItem('details'));

 holidayDate = moment(holidayDetails.date, 'YYYY-MM-DD').format('MMMM DD');

  
  holidayEl = `

  <h5 class="date">${holidayDate}</h5>
  <h2>${holidayDetails.holname}</h2>
  <p>${holidayDetails.description}</p>
  <p><span class="celebrated">Celebrated in:</span> ${holidayDetails.country}</p>
 
  `

  holidayContent = document.createElement('div');
  holidayContent.setAttribute("class", "holiday-content");
  holidayContent.innerHTML = holidayEl;
  
  holidayOverview.append(holidayContent);

}

showHolidayOverview ()


///////////////////////////////////////


var getHistory = function () {

  thisDay = moment(holidayDate, 'MMMM DD').format('M/DD');
    var history = "https://history.muffinlabs.com/date/" + thisDay;
  
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



