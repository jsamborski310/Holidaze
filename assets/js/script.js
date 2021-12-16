var apiKey = 'Baea669456e5e8582bc6fcb7e15ee38bc52cc480'

// Initializing Materialize DropDown
/////////////////////////////////////////////
//NOTE: During initial set-up, this was throwing an error. I removed "options" from the parameter in order to get it working. The commented out code is the original code. 


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('select');
  //   var instances = M.FormSelect.init(elems, options);
  // });


// Varaibles for holiday seach and getHolidays function
var searchField = document.querySelector('#search-field');
var serachBar = document.querySelector('#searchbar');
var searchInput = "Christmas Eve";
var holidayListing;
var holidayListingEl;

// Variables to dislay search history from local storage
searchesArray = [];
var pastSearches = JSON.parse(localStorage.getItem('searches'));

// Get holidays matching search and render results to page
function getHolidays() {
  var getHolidaysURL = `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=US&year=2021`
  var searchedHolDate;
  var searchedHolName;
  var searchedHolDescription;
  var searchedHolCountry;
  var searchedHolType;

   // Fetch request for holiday data (default: country = US, year = current year)
  fetch(getHolidaysURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("data from getHolidays is:");
    console.log(data);

    // Add current search to search history in local storage
    searchesArray.push(searchInput);    
    localStorage.setItem('searches', JSON.stringify(searchesArray));
    console.log("pastSearches is " + searchesArray);

    // Render current search as button in search history
    var searchHistBut = document.createElement('button');
    searchHistBut.classList.add('btn', 'waves-effect', 'waves-light', 'prevSearchBtn');
    searchHistBut.textContent = searchInput;
    // TODO: searchHistBut.addEventListener ('click', searchFromHistory);
    document.querySelector('#search-history').appendChild(searchHistBut);

    // Iterate to find holiday name that matches
    for (searchedHolidayData of data.response.holidays) {
      if (searchInput !== searchedHolidayData.name) continue;
      console.log("data from searchedHolidayData is:")
      console.log(searchedHolidayData)

      // Set variables to pass to displayHolidays
      searchedHolDate = searchedHolidayData.date.iso;
      searchedHolName = searchedHolidayData.name;
      searchedHolDescription = searchedHolidayData.description;
      searchedHolCountry = searchedHolidayData.country.name;
      searchedHolType = searchedHolidayData.type[0];
    
      // Template literal for search result listing
      holidayListing = `
        <section class="holiday-list-item holiday-type-federal mainContent">
          <div class="holiday-content">
              <h5 class="date hol-date">${searchedHolDate}</h5>
              <h2 class="hol-name">${searchedHolName}</h2>
              <p class="hol-desc">${searchedHolDescription}</p>
              <p><span class="celebrated">Celebrated in:</span class="hol-country"> ${searchedHolCountry}</p>
          </div>
        </section>`
      
      // Render search listing to page
      holidayListingEl = document.createElement('div');
      holidayListingEl.innerHTML = holidayListing;

      document.getElementById('search-results').appendChild(holidayListingEl);
  
    }
  })
}

// Event listener for holiday search, clears results, calls function with search term(s)
searchField.addEventListener('submit', function(event) {
  event.preventDefault();
  searchInput = document.getElementById('searchbar').value.trim();
  document.getElementById('search-results').innerHTML = "";
  getHolidays(searchInput);

})

/////////////////////////////////////
// Event listener for holiday listing.


// var selectedHoliday = document.getElementById('search-results');
// var holidayDetails = document.getElementById('holiday-details');
// var holidayDetailsContent;
// var nameOfHoliday;



// selectedHoliday.addEventListener('click', function(event) {
//   event.preventDefault();

//   nameOfHoliday = event.target.children[1];

//   window.location.href = 'overview.html';

//   getHolidays(nameOfHoliday);
  
 
//   // holidayDetails.innerHTML = holidayDetailsContent;
  
      
//   // document.getElementById('search-results').appendChild(holidayDetails);

 

// })
/////////////////////////////////////
  



// Initializing Materialize DatePicker
/////////////////////////////////////////////
//NOTE: During initial set-up, this was throwing an error. I removed "options" from the parameter in order to get it working. The commented out code is the original code.


  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
  });

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.datepicker');
  //   var instances = M.Datepicker.init(elems, options);
  // });

var thisYearData;
var nextYearData;

function fetchFilteredHolidays(event)
{
  // stops page reload on submit
  event.preventDefault();

  // initialize thisYearData and nextYearData
  thisYearData = false;
  nextYearData = false;

  // find this year
  var thisYear = parseInt( moment().format("yyyy"));

  // get the selected country
  var country = ""// Make this value equal the value from the country selector element

  if (country === "")
  {
    country = "US"
  }

  // get this year
  fetch("https://calendarific.com/api/v2/holidays?&api_key=" + apiKey + "&country="+country+"&year="+thisYear)
  .then(function (response){
    return response.json();
  })
  .then(function (data)
  {
    thisYearData = data;

    getFilteredHolidays();
  })

  // get next year
  fetch("https://calendarific.com/api/v2/holidays?&api_key=" + apiKey + "&country="+country+"&year="+(thisYear+1))
  .then(function (responce){
    return responce.json();
  })
  .then(function (data)
  {
    nextYearData = data;

    getFilteredHolidays();
  })
}


function getFilteredHolidays()
{
  // returns if either thisYearData or nextYearData isn't loaded
  // when either fetch request finishes it will call this function, so the first one should always fail this
  if (! thisYearData || !nextYearData)
  {
    return;
  }

  var startTimeFilterData = "2021-02-05"; // TODO make these have the value of the date filter elements
  var endTimeFilterData = "2021-07-15";

  var filteredData = thisYearData.response.holidays.concat(nextYearData.response.holidays);

  

  if (startTimeFilterData !== "" && endTimeFilterData !== "")
  {
    var startTimeMoment = moment(startTimeFilterData);
    var endTimeMoment = moment(endTimeFilterData);

    var tempData = []

    for (var i = 0; i < filteredData.length; i++)
    {
      
      var holidayMoment = moment(filteredData[i].date.iso);


      if (startTimeMoment.isBefore(holidayMoment) && holidayMoment.isBefore(endTimeMoment))
      {
        tempData.push(filteredData[i]);
      }
    }

    filteredData = tempData;
  } 

  //TODO print each element in filteredData using Nicks function
}

document.querySelector("form").addEventListener("submit",fetchFilteredHolidays)

// Display search history from local storage
function displaySearchHistory() {
  var pastSearches = JSON.parse(localStorage.getItem('searches'));
  if (pastSearches) {
    for (i = 0; i < pastSearches.length; i++) {
      var searchHistBut = document.createElement('button');
      searchHistBut.classList.add('btn', 'waves-effect', 'waves-light', 'prevSearchBtn');
      searchHistBut.textContent = pastSearches[i];
      // TODO: searchHistBut.addEventListener ('click', searchFromHistory);
      document.querySelector('#search-history').appendChild(searchHistBut);
    }
  }
};

displaySearchHistory();