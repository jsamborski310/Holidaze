var eventsEl = document.getElementById('events');

var eventsInfo;

var getHistory = function () {

    var history = "https://history.muffinlabs.com/date/2/14";
  
    fetch(history)
      .then(function (response) {
        return response.json();
      })
      .then(function (source) {
        
        
        eventsInfo = document.createElement('p');
        eventsInfo.textContent = source.data.Events[0].text;
        eventsEl.append(eventsInfo);

        console.log("events" + source.data.Events.year);
        
      });
  
  };

  getHistory();