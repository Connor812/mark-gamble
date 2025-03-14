// JavaScript Document
// define variables
var nativePicker = document.querySelector('.nativeDatePicker');
var fallbackPicker = document.querySelector('.fallbackDatePicker');

var yearSelect = document.querySelector('[name=year]');
var monthSelect = document.querySelector('[name=month]');

// Test whether a new date input falls back to a text input
var testElement = document.createElement('input');
testElement.type = 'date';

// If it does, run the code inside the if () {} block
if (testElement.type === 'text') {
  // hide the native picker and show the fallback
  nativePicker.hidden = true;
  fallbackPicker.hidden = false;

  // populate the days and years dynamically
  // (the months are always the same, therefore hardcoded)
  populateDays(monthSelect.value);
  populateYears();
}

function populateDays(month) {
  const daySelect = document.querySelector('[name=day]');
  const month = monthSelect.value;
  
  // Create variable to hold new number of days to inject
  let dayNum;

  // 31 or 30 days?
  switch (month) {
    case 'April': case 'June': case 'September': case 'November':
      dayNum = 30;
    break;
    case 'February':
      // If month is February, calculate whether it is a leap year or not
      const year = yearSelect.value;
      const isLeap = new Date(year, 1, 29).getMonth() === 1;
      dayNum = isLeap ? 29 : 28;
    break;
    default:
      dayNum = 31;
  }

  // inject the right number of new <option>s into the <select>
  daySelect.options = Array.from({ length: dayNum }, function(index) {
    return index + 1;
  });

  // if previous day has already been set, set daySelect's value
  // to that day, to avoid the day jumping back to 1 when you
  // change the year
  if (previousDay) {
    daySelect.value = previousDay;

    // If the previous day was set to a high number, say 31, and then
    // you chose a month with fewer days in it (like February),
    // this code ensures that the highest day available
    // is selected, rather than showing a blank daySelect
    if (previousDay > daySelect.length + 1) {
      daySelect.selectedIndex = daySelect.length;
    }
  }
}

function populateYears() {
  // get this year as a number
  var year = (new Date()).getFullYear();

  // Make this year and the 100 years before it available in the <select>
  daySelect.options = Array.from({ length: 100 }, function(index) {
    return index + year;
  });
}

// when the month or year <select> values are changed, rerun populateDays()
// in case the change affected the number of available days
yearSelect.onchange = populateDays;
monthSelect.onchange = populateDays;

// preserve day selection
var previousDay;

// update what day has been set to previously
// see end of populateDays() for usage
daySelect.onchange = function() {
  previousDay = daySelect.value;
}