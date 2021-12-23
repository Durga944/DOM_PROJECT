var studentRoll = document.getElementById("roll").value;
var studentName = document.getElementById("name").value;
var studentSubject = document.getElementById("sub").value;
var storageType = document.getElementById("storage").value;
console.log(studentRoll,studentName,studentSubject,storageType);
var userData = [];

function displayData() {
  var table = "";
  console.log(userData);
  for (index of userData) {
    table += `
      <tr>
        <td>${index.roll}</td>
        <td>${index.name}</td>
        <td>${index.sub}</td>
        <td>${index.storage}</td>
        <td>
          <button onclick="editButton(${index.roll})" class="Updater">Edit</button>
          <button onclick="deleteButton(${index.roll})" class="Updater">Delete</button>
        </td>
      </tr>
    `;
  }

  var displayData = document.getElementById("displayData");
  displayData.innerHTML = `
      <table id="details">
        <thead>
        <tr>
          <th>Roll-No</th>
          <th>Student-Name</th>
          <th>Subject</th>
          <th>Storage-Type</th>
          <th>Updater</th>
        <tr>
        </thead>
        <tbody>${table}</tbody>
    </table>
  `;
}
function submitButton(data) {
    var studentRoll = document.getElementById("roll");
    var studentName = document.getElementById("name");
    var studentSubject = document.getElementById("sub");
    var storageType = document.getElementById("storage");
    if (studentRoll.value == "" || studentName.value == "" || studentSubject.value == ""){
      alert("Please fill your input box.")
      return ""
    }
    var rollList =userData.map((index)=>index.roll)
    if (rollList.includes(studentRoll.value)){
      alert("You already used this roll no.")
      return ""
    }
    let studentData = {
      roll: studentRoll.value,
      name:  studentName.value,
      sub: studentSubject.value,
      storage: storageType.value,
    };
    studentRoll.value = "";
    studentName.value = "";
    studentSubject.value = "";
  
    userData.push(studentData);
    displayData();
    storeData();
  };
document.addEventListener("DOMContentLoaded", function (event) {
    showData()
    displayData();
});
function storeData() {
  localStorage.setItem(
    "localDetails",
    JSON.stringify(userData.filter((student) => student.storage == "Local"))
  );
  sessionStorage.setItem(
    "sessionDetails",
    JSON.stringify(userData.filter((student) => student.storage == "Session"))
  );
  // document.cookie = JSON.stringify(
  //   userData.filter((student) => student.storage == "Cookies")
  // );
  cookieStorage.setItem(
    "cookiesDetails",
    JSON.stringify(userData.filter((student) => student.storage == "Cookies"))
  );
}
function showData() {
  console.log(document.cookie);
  var cookiesData = document.cookie != "" ? JSON.parse(document.cookie) : [];
  var localData = JSON.parse(localStorage.getItem("localDetails"));
  var sessionData = JSON.parse(sessionStorage.getItem("sessionDetails"));
  // var cookieData = JSON.parse(cookieStorage.getItem("sessionDetails"));
  console.log(cookiesData, localData, sessionData);

  if (cookiesData != null) {
    for (index of cookiesData) {
        userData.push(index);
    }
  }
  if (localData != null) {
    for (index of localData) {
        userData.push(index);
    }
  }
  if (sessionData != null) {
    for (index of sessionData) {
        userData.push(index);
    }
  }
}

function deleteButton(num){
  if (!confirm("Do you want to delete your data?")){
    return ""
  }
  var newArray = []
  for (var index of userData){
      if (index.roll != num){
        newArray.push(index)
      }
  }
  userData = newArray;
  displayData()
  storeData()
}

function editButton(num){
  var studentRoll = document.getElementById("roll");
  var studentName = document.getElementById("name");
  var studentSubject = document.getElementById("sub");
  var storageType = document.getElementById("storage");
  var student = userData.filter((index1)=>index1.roll == num)[0]

  console.log(student);

  studentRoll.value = student.roll
  studentName.value = student.name
  studentSubject.value = student.sub
  storageType.value = student.storage

  var submitB = document.getElementById("submit_btn")
  submitB.style.display = "none"
  var updateB = document.getElementById("update_btn")
  updateB.style.display = "block"
}
function updateButton(){
    var studentRoll = document.getElementById("roll");
    var studentName = document.getElementById("name");
    var studentSubject = document.getElementById("sub");
    var storageType = document.getElementById("storage");
  if (studentRoll.value == "" || studentName.value == "" || studentSubject.value == ""){
    alert("Please fill your input box.")
    return ""
  }
  var rollList = userData.map((index)=>index.roll)
  var newArray = []
  for (var index of userData){
    if (index.roll != studentRoll.value){
        newArray.push(index)
    }
  }
  userData = newArray;
  if (rollList.includes(studentRoll.value)){
    alert("You didn't used this roll no.")
    return ""
  }
  let studentData = {
    roll: studentRoll.value,
    name: studentName.value,
    sub: studentSubject.value,
    storage: storageType.value,
  };

  studentRoll.value ="";
  studentName.value ="";
  studentSubject.value ="";
  
  var submitB = document.getElementById("submit_btn")
  submitB.style.display = "block"
  var updateB = document.getElementById("update_btn")
  updateB.style.display = "none"
  userData.push(studentData);
  displayData();
  storeData();
} 

