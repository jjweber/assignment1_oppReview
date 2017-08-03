console.log("I am here!");
var sS = document.getElementById('schoolField');
var sN = document.getElementById('nameField');
var sG = document.getElementById('gradesField');
var sC = document.getElementById('computerField');

var students = new Array;
// Setting Item to local Storage.
localStorage.setItem("students", JSON.stringify(students));

class Person {
  constructor(n, g, c) {
    this.name = n;
    this.grades = g;
    this.computer = c;
  }
}

Person.school = "Fullsail";

/*
(function(){
  for (var i = 0; i < 10; i++) {
    var student = new Person("max"+i, 15 * i, "mac");
    students.push(student);
  }

  Person.school = "UGB"

  var grades = [70, 80, 90];
  console.log(Utils.getAverage(grades));

  displayInfo();

  function displayInfo() {
    students.forEach(function(e){
      // This is where I need to print values to the Table.
      console.log("Student Name: " + e.name + "\nStudent Grade: " + e.grades + "\nStudent Computer: " + e.computer + "\nSchool: " + Person.school);
    })
  }

})();
*/

function populateSchoolField() {
  console.log("Loaded!");
  sS.value = Person.school;
}
window.onload = populateSchoolField;

// onClick event for Add Student Btn.
function addStudent(student) {
  if (sN.value != "" && sG.value != "" && sC.value != "") {
    console.log("Boom!");

    if (sS.value != "") {
      console.log("Changing static value!");
      Person.school = sS.value;
    }

    // Creating instance of Person Class.
    var student = new Person(sN, sG, sC);
    student.name = sN.value;
    student.grades = sG.value;
    student.computer = sC.value;

    // Pushing new student to students array.
    students.push(student);

    console.log(student);
    console.log(students);
    console.log(students.length);

    displayInfo()
    clearInputs()

    sN.focus();

    return student;
  }
}

// Creating function that takes in an input and resets it to null or default
function clearInputs() {
  sS.value = Person.school;
  sN.value = '';
  sG.value = '';
  sC.value = '';
}

// Creating function to print Students to the table when Done Btn is pressed
function showTable() {
  console.log("Will Show Table!");
}

function displayInfo() {
  //var grades = [Utils.convertToIntArray(gradesField.value)];
  var grades = gradesField.value;
  var gradeInts = Utils.convertToIntArray(grades);

  var table = document.getElementById("dataTable");
  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cellText = document.createTextNode(document.getElementById("nameField").value);
  cell.appendChild(cellText);
  row.appendChild(cell);

  var cell = document.createElement("td");
  var cellText = document.createTextNode(document.getElementById("gradesField").value);
  cell.appendChild(cellText);
  row.appendChild(cell);

  // This shoud show average grades.
  var cell = document.createElement("td");
  //var cellText = document.createTextNode(Utils.getAverage(Utils.convertToIntArray(grades)));
  //var cellText = document.createTextNode(Utils.getAverage(grades));
  var cellText = document.createTextNode(Utils.getAverage(gradeInts));
  cell.appendChild(cellText);
  row.appendChild(cell);

  var cell = document.createElement("td");
  var cellText = document.createTextNode(document.getElementById("computerField").value);
  cell.appendChild(cellText);
  row.appendChild(cell);

  // Show Static value.
  var cell = document.createElement("td");
  var cellText = document.createTextNode(Person.school);
  cell.appendChild(cellText);
  row.appendChild(cell);

  table.appendChild(row);
};
