"use strict";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currMonth = document.querySelector(".month_current");
const currYear = document.querySelector(".year_current");
const days = document.querySelector(".days");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
let yearNow = new Date(Date.now()).getFullYear();
let monthNow = new Date(Date.now()).getMonth();
currYear.textContent = yearNow;
currMonth.textContent = months[monthNow];

let amountOfDays = 32 - new Date(yearNow, monthNow, 32).getDate();

const renderDays = () => {
  for (let i = 1; i <= amountOfDays; i++) {
    let li = document.createElement("li");
    li.setAttribute("data-day", new Date(yearNow, monthNow, i));
    li.textContent = i;
    days.appendChild(li);
  }
};

renderDays();

const renderMonth = () => {
  btnNext.addEventListener("click", () => {
    if (monthNow == 11) yearNow++;
    currYear.textContent = yearNow;
    if (monthNow == 11) {
      monthNow = 0;
    } else monthNow++;
    currMonth.textContent = months[monthNow];

    days.textContent = "";
    const amountOfDays = 32 - new Date(yearNow, monthNow, 32).getDate();

    for (let i = 1; i <= amountOfDays; i++) {
      let li = document.createElement("li");
      li.setAttribute("data-day", new Date(yearNow, monthNow, i));
      li.textContent = i;
      days.appendChild(li);
    }
  });

  btnPrev.addEventListener("click", () => {
    currYear.textContent = yearNow;
    console.log(monthNow);
    console.log(yearNow);

    if (monthNow == 0) yearNow--;
    currYear.textContent = yearNow;
    if (monthNow == 0) {
      monthNow = 11;
    } else monthNow--;
    currMonth.textContent = months[monthNow];

    days.textContent = "";
    const amountOfDays = 32 - new Date(yearNow, monthNow, 32).getDate();

    console.log(amountOfDays);

    for (let i = 1; i <= amountOfDays; i++) {
      let li = document.createElement("li");
      li.textContent = i;
      days.appendChild(li);
    }
  });
};

renderMonth();

const events = [];

const eventData = {
  title: "",
  date: "date",
  startTime: "",
  endTime: "",
  type: "dropdown",
  description: "60mins",
};

console.log(events);

const form = document.getElementById("form");
const date = document.getElementById("date");
const title = document.getElementById("title");
const startDate = document.getElementById("start_date");
const endDate = document.getElementById("end_date");
const type = document.getElementById("type");
const description = document.getElementById("description");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  events.push({
    title: title.value,
    date: new Date(date.value),
    startTime: startDate.value,
    endTime: endDate.value,
    type: type.value,
    description: description.value,
  });
  console.log(events);
  renderEventInCalendar();
});

const b = document.querySelectorAll("li");

const renderEventInCalendar = () => {
  b.forEach((val) => {
    if (val.dataset.day == events.date) {
      val.classList.add("active");
    }
    console.log(val.dataset.day);
    console.log(events.date);
  });
};

console.log(b);
renderEventInCalendar();

console.log(b);
console.log(events);
