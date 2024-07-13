import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "",
  projectId: "lifevision-",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const table = document.getElementById("checkInTable");

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

function generateTable(querySnapshot) {
  table.innerHTML = "";

  const headerRow = table.insertRow(0);
  [
    "근무자",
    "ID",
    "Belt",
    "Helmet",
    "Shoes",
    "Alcohol",
    "HeartBeat",
    "Temp",
    "Time",
  ].forEach(function (field) {
    const th = document.createElement("th");
    th.textContent = field;
    headerRow.appendChild(th);
    headerRow.classList.add("upper");
  });

  querySnapshot.forEach(function (doc) {
    const data = doc.data();
    const row = table.insertRow();
    row.insertCell(0).textContent = doc.id;
    row.insertCell(1).textContent = data.ID;
    row.insertCell(2).textContent = data.Belt;
    row.insertCell(3).textContent = data.Helmet;
    row.insertCell(4).textContent = data.Shoes;
    row.insertCell(5).textContent = data.Alcohol;
    row.insertCell(6).textContent = data.HeartBeat;
    row.insertCell(7).textContent = data.Temp;
    row.insertCell(8).textContent = data.Time.toDate().toLocaleTimeString(
      "kr-KR",
      { hour12: true }
    );
    const hasFalseData =
      data.Shoes === false ||
      data.Helmet === false ||
      data.Belt === false ||
      data.Alcohol > 200 ||
      data.HeartBeat > 130 ||
      parseFloat(data.Temp.split("°")[0]) > 37.5;
    if (hasFalseData) row.classList.add("tab_r");
    else row.classList.add("tab");
  });
}

function initialize() {
  const today = getToday();

  onSnapshot(collection(db, today), (querySnapshot) => {
    generateTable(querySnapshot);
    console.log("Check " + getToday());
    $(".datepicker").datepicker("setDate", "today");
  });
}

initialize();
document.addEventListener("dateSelected", async function () {
  const querySnapshot = await getDocs(collection(db, selectedDate));
  generateTable(querySnapshot);
});
