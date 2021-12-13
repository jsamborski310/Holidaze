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

  // get this year
  fetch("https://calendarific.com/api/v2/holidays?&api_key=" + apiKey + "&country=US&year="+thisYear)
  .then(function (responce){
    return responce.json();
  })
  .then(function (data)
  {
    thisYearData = data;

    getFilteredHolidays();
  })

  // get next year
  fetch("https://calendarific.com/api/v2/holidays?&api_key=" + apiKey + "&country=US&year="+(thisYear+1))
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

  var countryFilterData = "";
  var typeFilterData = "";
  var startTimeFilterData = "2021-02-05";
  var endTimeFilterData = "2021-07-15";


  var allData = thisYearData.response.holidays.concat(nextYearData.response.holidays);

  var filteredData = [];

  

  if (startTimeFilterData != "" && endTimeFilterData != "")
  {
    var startTimeMoment = moment(startTimeFilterData);
    var endTimeMoment = moment(endTimeFilterData);


    console.log(allData);
    console.log(allData.lenth);
    for (var i = 0; i < allData.lenth; i++)
    {
      
      var holidayMoment = moment(allData[i].date.iso);


      if (startTimeMoment.isBefore(holidayMoment) && holidayMoment.isBefore(endTimeMoment))
      {
        filteredData.push(allData[i]);
      }
    }
  } 


  console.log(filteredData);

}

document.querySelector("form").addEventListener("submit",fetchFilteredHolidays)
