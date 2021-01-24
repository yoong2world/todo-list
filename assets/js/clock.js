const dateTitle = document.querySelector('.js-date');
const clockTitle = document.querySelector('.js-clock');
const date = new Date();

function getDate() {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();

  dateTitle.innerText = `${year}. ${month}. ${day}`;
}

function getTime() {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${
    hours < 10 ? `0${hours}` : hours
    }:${
    minutes < 10 ? `0${minutes}` : minutes
    }:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

function init() {
  getDate();
  getTime();
  setInterval(getTime, 1000);
}

init();