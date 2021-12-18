var apiKey = 'Baea669456e5e8582bc6fcb7e15ee38bc52cc480'

// Varaibles for holiday seach and getHolidays function
var searchField = document.querySelector('#search-field');
var serachBar = document.querySelector('#searchbar');
var searchInput = "";
var holidayListing;
var holidayListingEl;

// Variables to dislay search history from local storage
var searchesArray = [];
var searchesArrayTrue = JSON.parse(localStorage.getItem('searches'));

if (searchesArrayTrue) {
  searchesArray = searchesArrayTrue;
}

var pastSearches;

// Variables to display holidays in overview page
var holidayItem;
var holidayDetailsGroup = [];

var holidayNameOver = "";
var holidayDateOver = "";
var holidayDescriptionOver = "";
var holidayCountryOver = "";

///////////

// Get holidays matching text search and render results to page
function getHolidays() {
  var getHolidaysURL = `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=US&year=2021`
  var searchedHolDate;
  var searchedHolName;
  var searchedHolDescription;
  var searchedHolCountry;
  // var searchedHolType; to be used later if type added to filter search

  // Fetch request for holiday data (default: country = US, year = current year)
  fetch(getHolidaysURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      // Iterate to find holiday name that matches
      for (searchedHolidayData of data.response.holidays) {
        if (!searchedHolidayData.name.toLowerCase().includes(searchInput.toLowerCase())) continue;


        printHolidayResult(searchedHolidayData.date.iso,searchedHolidayData.name,searchedHolidayData.description,searchedHolidayData.country.name,searchedHolidayData.states, searchedHolidayData.type)
      }
    })
}

// Event listener for holiday search, clears results, calls function with search term(s)
searchField.addEventListener('submit', function (event) {
  event.preventDefault();
  searchInput = document.getElementById('searchbar').value.trim();
  if (searchInput.length == 0) { return }
  else {
    document.getElementById('search-results').innerHTML = "";

    // Add current search to search history in local storage
    searchesArray.push(searchInput);
    localStorage.setItem('searches', JSON.stringify(searchesArray));

    // Render current search as button in search history
    var searchHistBut = document.createElement('button');
    searchHistBut.classList.add('btn', 'waves-effect', 'waves-light', 'prevSearchBtn');
    searchHistBut.textContent = searchInput;
    searchHistBut.addEventListener('click', searchFromHistory);
    document.querySelector('#search-history').appendChild(searchHistBut);

    getHolidays(searchInput);
  }
})


// Initializing Materialize DatePicker
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems);
});

var thisYearData;
var nextYearData;

// Get holidays matching filter search and render results to page
function fetchFilteredHolidays(event) {
  event.preventDefault();
  document.getElementById('search-results').innerHTML = "";

  // initialize thisYearData and nextYearData
  thisYearData = false;
  nextYearData = false;

  // find this year
  var thisYear = parseInt(moment().format("yyyy"));

  // get the selected country
  var countrySelectEL = document.querySelector("#country-select");
  var country = countrySelectEL.value;

  if (country === "") {
    country = "US"
  }

  // get this year
  fetch("https://calendarific.com/api/v2/holidays?&api_key=" + apiKey + "&country=" + country + "&year=" + thisYear)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      thisYearData = data;

      getFilteredHolidays();
    })

  // get next year
  fetch("https://calendarific.com/api/v2/holidays?&api_key=" + apiKey + "&country=" + country + "&year=" + (thisYear + 1))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      nextYearData = data;

      getFilteredHolidays();
    })
}


function getFilteredHolidays() {
  // returns if either thisYearData or nextYearData isn't loaded
  // when either fetch request finishes it will call this function, so the first one should always fail this
  if (!thisYearData || !nextYearData) {
    return;
  }

  var startTimeFilterData = document.querySelector("#datepicker-input-start").value; // TODO make these have the value of the date filter elements
  var endTimeFilterData = document.querySelector("#datepicker-input-end").value;

  var filteredData = thisYearData.response.holidays.concat(nextYearData.response.holidays);



  if (startTimeFilterData !== "" && endTimeFilterData !== "") {
    var startTimeMoment = moment(startTimeFilterData);
    var endTimeMoment = moment(endTimeFilterData);

    var tempData = []

    for (var i = 0; i < filteredData.length; i++) {

      var holidayMoment = moment(filteredData[i].date.iso);


      if (startTimeMoment.isBefore(holidayMoment) && holidayMoment.isBefore(endTimeMoment)) {
        tempData.push(filteredData[i]);
      }
    }

    filteredData = tempData;
  }


  //print each element in filteredData 
  for (var i = 0; i < filteredData.length; i++) {
    printHolidayResult(filteredData[i].date.iso, filteredData[i].name, filteredData[i].description, filteredData[i].country.name, filteredData[i].states, filteredData[i].type);
  }
}

function printHolidayResult(searchedHolDate, searchedHolName, searchedHolDescription, searchedHolCountry, searchedHolState, searchedHolType) {

  //figuring out what should be displayed for states

  var statesData = "";

  if (searchedHolState !== "All")
  {
    statesData = " - ";

    for (var i = 0; i < searchedHolState.length; i++)
    {
      statesData += searchedHolState[i].name + ", ";
    }

    statesData = statesData.substring(0,statesData.length-2);
  }

  // Template literal for search result listing
  var holidayListing = `
    <section class="holiday-list-item holiday-type-federal mainContent">
      <div class="holiday-content">        
          <h5 class="date hol-date">${moment( searchedHolDate).format("MMMM DD, YYYY")}</h5>         
          <h2 class="hol-name">${searchedHolName}</h2>
          <p class="hol-desc">${searchedHolDescription}</p>
          <p class="celebrated-type"><span class="celebrated">Celebrated in:</span class="hol-country"> ${searchedHolCountry + statesData}</p>
          <p class="type-holiday"><span class="celebrated">Type:</span class="hol-country"> ${searchedHolType[0]}</p>
      </div>
    </section>`

  holidayListingEl = document.createElement('div');
  holidayListingEl.innerHTML = holidayListing;
  holidayListingEl.setAttribute("class", "holidayItem");

  document.getElementById('search-results').appendChild(holidayListingEl);

  displayHolidays();
}

document.querySelector("#filter-search").addEventListener("submit", fetchFilteredHolidays)

// Initializing Materialize DropDown
document.addEventListener('DOMContentLoaded', function () {

  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

document.querySelector("#filter-search").addEventListener("submit", fetchFilteredHolidays);


// Display search history from local storage
function displaySearchHistory() {
  pastSearches = JSON.parse(localStorage.getItem('searches'));
  if (pastSearches) {
    for (i = 0; i < pastSearches.length; i++) {
      var searchHistBut = document.createElement('button');
      searchHistBut.classList.add('btn', 'waves-effect', 'waves-light', 'prevSearchBtn');
      searchHistBut.textContent = pastSearches[i];
      searchHistBut.addEventListener('click', searchFromHistory);
      document.querySelector('#search-history').appendChild(searchHistBut);
    }
  }
};

displaySearchHistory();

// Search from search history
function searchFromHistory(event) {
  event.preventDefault();
  searchInput = event.target.textContent;
  document.getElementById('search-results').innerHTML = "";
  getHolidays(searchInput);
}

function displayHolidays() {
  holidayItem = document.querySelectorAll(".holidayItem");

  holidayItem.forEach((holidayItems) => {

    holidayItems.setAttribute("style", "cursor: pointer;")

    holidayItems.addEventListener('click', function (event) {

      holidayNameOver = event.target.parentNode.childNodes[0].nextElementSibling.nextElementSibling.firstChild.textContent;
      holidayDateOver = event.target.parentNode.childNodes[0].nextElementSibling.firstChild.textContent;
      holidayDescriptionOver = event.target.parentNode.childNodes[0].nextElementSibling.nextElementSibling.nextElementSibling.firstChild.textContent;
      holidayCountryOver = event.target.parentNode.childNodes[0].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[1].textContent;
      holidayTypeOver = event.target.parentNode.childNodes[0].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[1].textContent;


      var holidayDetails = {
        holname: holidayNameOver,
        date: holidayDateOver,
        description: holidayDescriptionOver,
        country: holidayCountryOver,
        type: holidayTypeOver

      };


      holidayDetailsGroup.push(holidayDetails);

      localStorage.setItem('details', JSON.stringify(holidayDetails));

      window.location.href = "overview.html";
    });

  })
}
