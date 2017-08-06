// Creating a Person class
class Person {
  constructor(_name) {
    this.name = _name;
  }

  // polymorphism. Same function names are overridden in Employee class

  // Method to display different title string if the position title equals boss.
  getTitleString() {
    return "Get back to work!";
  }
  // Method to display different hour string if the position title equals boss.
  getHoursString () {
    return "Whenever I want!";
  }
}

// Creating an Employee class and inheriting from Person object.
class Employee extends Person {
  constructor(_name, _position, _parkingSpotNumber) {
    super(_name);
    this.parkingSpotNumber = _parkingSpotNumber;
    this.position = _position;
  }

  // Method to display different title string if the position title equals anything except boss.
  getTitleString() {
    return this.position.title;
  }
  // Method to display different hour string if the position title equals anything except boss.
  getHoursString() {
    // make sure the hour string is right
    return this.position.hours;
  }
}

// Creating a Position class
class Position {
  constructor(_title, _hours) {
    this.title = _title;
    this.hours = _hours;
  }
}

// Creating an Employer class
class Employer {
  constructor(_name) {
    this.name = _name;
  }
}

// This function will fill the employer field in with the current value.
function populateEmployerField(value) {
  console.log("Setting populateEmployerField to: ", value);
  employerInput.value = value;
}


// onClick event for Add Employee Btn.
function addEmployee() {
  if (eName.value != "" && eHours.value != "" &&
    ePosition.value != "" && eParkingSpotNumberInput.value != "")
  {
    console.log("Values not empty. Allow creation of new Employee.");

    // set the current employer objects name to the value given
    currentEmployer.name = employerInput.value;

    // Creating a variable that holds the value of the employees position converted to lowercase.
    var titleGiven = ePosition.value.toLowerCase();
    var personOrEmployee = null;

    // If statement to check if the position title entered is equal to boss.
    if(titleGiven === "boss") {
      // If it equals boss a person is created with passed values and saved to my personOrEmployee variable.
      personOrEmployee = new Person(eName.value, ePosition.value, eHours.value);
    }
    // Else for position check.
    else {
      // If the position does not equal boss a new position object is created.
      var position = new Position(ePosition.value, eHours.value);
      console.log("Created a new Position class instance: ", position);

      // A new employee is created with passed values and saved to my personOrEmployee variable.
      personOrEmployee = new Employee(eName.value, position, eParkingSpotNumberInput.value);
      console.log("Created a new Employee class instance: ", personOrEmployee);
    }

    console.log("Person or Employee object: ", personOrEmployee);

    // Pushing new Employee to employees array.
    employees.push(personOrEmployee);

    console.log("Total employees: ", employees.length);
    console.log("New array of employees: ", employees);

    displayInfo();
    clearInputs();

    eName.focus();
  }
}

// Creating function that takes in an input and resets it to null or default
function clearInputs() {
  employerInput.value = currentEmployer.name;
  eName.value = '';
  eHours.value = '';
  ePosition.value = '';
  eParkingSpotNumberInput.value = '';
}

// Creating function to print employees to the table when Calculate Totals Btn is pressed.
function calculateTotals() {
  var totalContainer = document.getElementById("totalContainer");
  // Creating a new div.
  var totalText = "<div>";

  var hourTotal = 0;
  var currentPersonOrEmployee;

  // For loop to loop through employees array.
  for( var i = 0; i < employees.length; i++ ) {
    currentPersonOrEmployee = employees[i];

    /* Calling my Utils class convertToIntArray function and passing it each
    employee. Then saving the value to my hourInts variable. */
    hourInts = Utils.convertToIntArray(currentPersonOrEmployee);

    /* Calling my Utils class getTotalHours function and passing it my hours as
    ints. Then adding the value to my hourTotal variable. */
    hourTotal += Utils.getTotalHours(hourInts);
  }

  // Adding the new div to my totalContainer and populating it with a string and the total employee hours.
  totalContainer.innerHTML = totalText + "Total Employee Hours (This Week): " + hourTotal;
}

// Creating displayInfo function to print all employee details to my table.
function displayInfo() {
  var hourInts;
  var tableBody = document.getElementById("dataBody");

  // Reseting and emptying table to get rid of any existing values.
  tableBody.innerHTML = "";

  var currentPersonOrEmployee;

  // Looping through employees array and assigning each employee to the currentPersonOrEmployee variable
  for( var i = 0; i < employees.length; i++ ) {
    currentPersonOrEmployee = employees[i];

    /* Calling my Utils class convertToIntArray function and passing it a
    employee. Then setting the value to the hourInts variable */
    hourInts = Utils.convertToIntArray(currentPersonOrEmployee);

    // Creating a table row to hold the new data/cells
    var row = document.createElement("tr");

    // Creating a table data/cell that will display the employees name.
    var cell = document.createElement("td");
    var cellText = document.createTextNode(currentPersonOrEmployee.name);
    cell.appendChild(cellText);
    row.appendChild(cell);

    /* Creating a table data/cell that will display the hours string for a person("Whenever I want!") or a
    employer which will display the hours for the week. */
    var cell = document.createElement("td");
    var cellText = document.createTextNode(currentPersonOrEmployee.getHoursString());
    cell.appendChild(cellText);
    row.appendChild(cell);

    // Creating a table data/cell and if an employee is being created then this will display the average hours for the week.
    var cell = document.createElement("td");
    var cellText = document.createTextNode(Utils.getAverage(hourInts));
    cell.appendChild(cellText);
    row.appendChild(cell);

    /* Creating a table data/cell that will display the title string for a person("Get back to work!";)
    or a employee which will show position title*/
    var cell = document.createElement("td");
    var cellText = document.createTextNode(currentPersonOrEmployee.getTitleString());
    cell.appendChild(cellText);
    row.appendChild(cell);

    // Creating a table data/cell that will display employer name.
    var cell = document.createElement("td");
    var cellText = document.createTextNode(currentEmployer.name);
    cell.appendChild(cellText);
    row.appendChild(cell);

    // Appending the new row to my table.
    tableBody.appendChild(row);
  }
};

// Variables
var employerInput = document.getElementById('employerField');
var eName = document.getElementById('employeeName');
var eHours = document.getElementById('employeeHours');
var ePosition = document.getElementById('employeePosition');
var eParkingSpotNumberInput = document.getElementById("parkingSpotNumber");

// Instantiating an instance of my Employer Object
var currentEmployer = new Employer();

// Creating an array to hold my Employees
var employees = new Array;

/* Created an Init function that sets the Employer to IBM and populates
the input field with the value. */
function init() {
  console.log("Initializing page...");
  currentEmployer.name = "IBM";
  populateEmployerField(currentEmployer.name);
}
// Running my Init function on window load.
window.onload = init();
