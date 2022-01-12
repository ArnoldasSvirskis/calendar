"use strict";

//////////////EVENT STATE

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
  // days.textContent = "";
  for (let i = 1; i <= amountOfDays; i++) {
    let li = document.createElement("div");
    li.setAttribute("data-day", new Date(yearNow, monthNow, i));
    li.textContent = i;
    li.classList.add("day");
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

    amountOfDays = 32 - new Date(yearNow, monthNow, 32).getDate();

    renderDays();
  });

  btnPrev.addEventListener("click", () => {
    if (monthNow == 0) yearNow--;
    currYear.textContent = yearNow;
    if (monthNow == 0) {
      monthNow = 11;
    } else monthNow--;
    currMonth.textContent = months[monthNow];
    amountOfDays = 32 - new Date(yearNow, monthNow, 32).getDate();

    renderDays();
  });
};

renderMonth();

////////////////////EVENT STATE//////////////////////////////////////////////////
const events = [];

const eventData = {
  title: "",
  date: "date",
  startTime: "",
  endTime: "",
  type: "dropdown",
  description: "60mins",
};

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

  renderEventInCalendar();
});

const b = document.querySelectorAll(".day");
console.log(b);

const renderEventInCalendar = () => {
  b.forEach((val) => {
    if (val.dataset.day == events.date) {
      val.classList.add("active");
    }
  });
};

renderEventInCalendar();
