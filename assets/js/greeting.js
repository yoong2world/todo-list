const greetForm = document.querySelector('.js-greetingForm'),
  greetInput = greetForm.querySelector('input'),
  greeting = document.querySelector('.js-greetings');
const USER_LS = 'currentUser';
const SHOWING_CN = 'showing';

function init() {
  loadName();
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function paintGreeting(text) {
  greetForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text} !`;
}

function askForName() {
  greetForm.classList.add(SHOWING_CN);
  greetForm.addEventListener('submit', handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = greetInput.value;
  paintGreeting(currentValue);
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}


init();