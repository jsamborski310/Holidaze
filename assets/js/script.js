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

var searchInput = "Christmas Eve"
var holidayListing;
var holidayListingEl;

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
              <p><span class="celebrated">Celebrated in:</span class="hol-country">${searchedHolCountry}</p>
          </div>
        </section>`
      
      // Render search listing to page
      holidayListingEl = document.createElement('div');
      holidayListingEl.innerHTML = holidayListing;
      
      document.getElementById('search-results').appendChild(holidayListingEl);
    }
  })
}

getHolidays();






  



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