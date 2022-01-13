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
const calendar = document.querySelector(".calendar_view");
let yearNow = new Date(Date.now()).getFullYear();
let monthNow = new Date(Date.now()).getMonth();
currYear.textContent = yearNow;
currMonth.textContent = months[monthNow];
let amountOfDays = 32 - new Date(yearNow, monthNow, 32).getDate();

const renderCalendarDays = () => {
  days.textContent = "";
  let firstDayOfMonth = new Date(yearNow, monthNow, 1).getDay();

  for (let i = 0; i < amountOfDays + firstDayOfMonth; i++) {
    if (i < firstDayOfMonth) {
      let emptyBlock = document.createElement("div");
      emptyBlock.classList.add("empty");
      days.appendChild(emptyBlock);
    } else {
      let day = document.createElement("div");
      day.setAttribute(
        "data-day",
        new Date(yearNow, monthNow, i + 1 - firstDayOfMonth)
      );

      day.textContent = i + 1 - firstDayOfMonth;
      day.classList.add("day");
      days.appendChild(day);
    }
  }
};

renderCalendarDays();

const renderMonth = () => {
  btnNext.addEventListener("click", () => {
    if (monthNow == 11) yearNow++;
    currYear.textContent = yearNow;
    if (monthNow == 11) {
      monthNow = 0;
    } else monthNow++;
    currMonth.textContent = months[monthNow];

    amountOfDays = 32 - new Date(yearNow, monthNow, 32).getDate();

    renderCalendarDays();
    showFormModal();
  });

  btnPrev.addEventListener("click", () => {
    if (monthNow == 0) yearNow--;
    currYear.textContent = yearNow;
    if (monthNow == 0) {
      monthNow = 11;
    } else monthNow--;
    currMonth.textContent = months[monthNow];
    amountOfDays = 32 - new Date(yearNow, monthNow, 32).getDate();

    renderCalendarDays();
    showFormModal();
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
const btnDelete = document.querySelector(".btn_delete");
let clicked = "";
let daysNodeList = document.querySelectorAll(".day");

const submitForm = (id) => {
  clicked = id;
  form.addEventListener("submit", (e) => {
    e.preventDefault();

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
    renderDetailsView();

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
      if (String(val.id) == String(day.dataset.day)) {
        let eventEl = document.createElement("div");
        eventEl.classList.add(val.type);
        eventEl.classList.add("active_events");
        day.appendChild(eventEl);
        eventEl.textContent = val.title;
        eventEl.setAttribute("data-id", val.id);

        day.classList.add("active");
      }
    });
  });
};

const renderDetailsView = () => {
  document.querySelectorAll(".active_events").forEach((event) => {
    console.log(event);

    event.addEventListener("click", () => {
      const findEvent = events.find((val) => val.id == event.dataset.id);
      console.log(findEvent);

      calendar.insertAdjacentHTML(
        "afterend",
        `<div class="event_details"> 
      <h2>${findEvent.title}</h2>
      <b>Date:  <br /> Start time: <br /> End time: <br /> </h3>
        <p>Description</p>
        
    </div>`
      );
      deleteEvent();
    });
  });
};

const deleteEvent = () => {
  btnDelete.addEventListener("click", () => {
    console.log(btnDelete.parentElement.dataset.id);
  });
};
