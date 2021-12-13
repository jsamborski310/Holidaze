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

// Template literal for search result listing
var holidayListing = `
  <section class="holiday-list-item holiday-type-federal">
    <h5 class="hol-date">October 15, 2021</h5>
    <h2 class="hol-name">Christmas</h2>
    <p class="hol-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti voluptatum asperiores iste veritatis voluptatem ducimus ipsam esse vitae, voluptatibus itaque suscipit maiores aliquam ullam,libero mollitia! Sunt quaerat similique corrupti.</p>
    <p>Celebrated in: <span class="hol-country">Canada</span></p>
  </section>`

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

      // console.log("All variables passing from getHolidays to displayHolidays:")
      // console.log(searchedHolDate, searchedHolName, searchedHolDescription, searchedHolCountry, searchedHolType)
      
      // displayHolidays(searchedHolDate, searchedHolName, searchedHolDescription, searchedHolCountry, searchedHolType);
      // displayHolidays(searchedHolidayData)
      document.querySelector('.hol-date').textContent = `${searchedHolDate}`;
      document.querySelector('.hol-name').textContent = `${searchedHolName}`;
      document.querySelector('.hol-desc').textContent = `${searchedHolDescription}`;
      document.querySelector('.hol-country').textContent = `${searchedHolCountry}`;
      // document.querySelector('.hol-type').textContent = `${searchedHolType}`;
    

    }
  })
}

getHolidays();



// Render search results to page
function displayHolidays(searchedHolDate, searchedHolName, searchedHolDescription, searchedHolCountry, searchedHolType) {
// function displayHolidays(searchedHolidayData) {
//   for (i = 0; i < 5; i++) {
//     var holidayListingEl = document.createElement('div');
//     holidayListingEl = holidayListing;
    
//     document.getElementById('#search-results').appendChild(holidayListingEl);
    
    document.querySelector('.hol-date').textContent = `${searchedHolDate}`;
    document.querySelector('.hol-name').textContent = `${searchedHolName}`;
    document.querySelector('.hol-desc').textContent = `${searchedHolDescription}`;
    document.querySelector('.hol-country').textContent = `${searchedHolCountry}`;
    // document.querySelector('.hol-type').textContent = `${searchedHolType}`;
    

  // }
};


  



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