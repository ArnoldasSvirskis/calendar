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

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
  days.textContent = "";
  let firstDayOfMonth = new Date(yearNow, monthNow, 1).getDay();

  for (let i = 0; i < amountOfDays + firstDayOfMonth; i++) {
    if (i < firstDayOfMonth) {
      let emptyBlock = document.createElement("div");
      emptyBlock.classList.add("empty");
      days.appendChild(emptyBlock);
    } else {
      let li = document.createElement("div");
      li.setAttribute(
        "data-day",
        new Date(yearNow, monthNow, i + 1 - firstDayOfMonth)
      );

      li.textContent = i + 1 - firstDayOfMonth;
      li.classList.add("day");
      days.appendChild(li);
    }
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
let clicked = "";
let daysNodeList = document.querySelectorAll(".day");

const submitForm = (id) => {
  clicked = id;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(clicked);

    events.push({
      id: id,
      title: title.value,
      date: new Date(date.value),
      startTime: startDate.value,
      endTime: endDate.value,
      type: type.value,
      description: description.value,
    });

    loadEvent();

    console.log(events);
  });
};

const formModal = document.querySelector(".form_modal");

const showFormModal = () => {
  daysNodeList.forEach((val) => {
    val.addEventListener("click", (e) => {
      if ((val.classList.contains = "false")) {
        formModal.classList.toggle("hidden");

        submitForm(e.target.dataset.day);
      }
    });
  });
};

showFormModal();

const loadEvent = () => {
  daysNodeList.forEach((day) => {
    events.forEach((val) => {
      console.log(val.id);
      console.log(day.dataset.day);
      console.log(day);

      if (String(val.id) == String(day.dataset.day)) {
        console.log("true");
        day.classList.add("super");
      }
    });
  });
};

// const f = "Thu Jan 06 2022 00:00:00 GMT+0200 (Eastern European Standard Time)";
// const g = "Thu Jan 06 2022 00:00:00 GMT+0200 (Eastern European Standard Time)";

// if (f == g) console.log("true");
// else console.log("false");
