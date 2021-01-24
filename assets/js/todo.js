const todoForm = document.querySelector('.js-toDoForm'),
  toDoInput = todoForm.querySelector('input'),
  toDoPendingList = document.querySelector('.js-toDoPending'),
  toDoFinishedList = document.querySelector('.js-toDoFinished');
const TODOS_PENDING = 'PENDING';
const TODOS_FINISHED = 'FINISHED';
let arrToDosPending = [];
let arrToDosFinished = [];
let idNumber = 1;

function init() {
  loadToDos();
  todoForm.addEventListener('submit', handleSubmit);
}

function loadToDos() {
  const loadedToDosPending = localStorage.getItem(TODOS_PENDING);
  const loadedToDosFinished = localStorage.getItem(TODOS_FINISHED);

  if (loadedToDosPending !== null) {
    const parsedToDosPending = JSON.parse(loadedToDosPending);

    parsedToDosPending.forEach(function (toDo) {
      addToDo('pending', toDo.text);
    });
  }
  if (loadedToDosFinished !== null) {
    const parsedToDosFinished = JSON.parse(loadedToDosFinished);

    parsedToDosFinished.forEach(function (toDo) {
      addToDo('finished', toDo.text);
    });
  }
}

function addToDo(status, text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const rightBtn = document.createElement('button');
  const span = document.createElement('span');
  const todoList = (status === 'pending') ? toDoPendingList : toDoFinishedList;
  const toDos = (status === 'pending') ? arrToDosPending : arrToDosFinished;
  let id = idNumber;
  idNumber += 1;

  delBtn.value = 'delete';
  delBtn.innerText = '삭제';
  if (status === 'pending') {
    rightBtn.value = 'finished';
    rightBtn.innerText = '완료';
  } else {
    rightBtn.value = 'back';
    rightBtn.innerText = '이전';
  }
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(rightBtn);
  li.id = id;
  todoList.appendChild(li);

  const toDoObj = {
    id: id,
    text: text
  };

  toDos.push(toDoObj);
  saveToDos();

  delBtn.addEventListener('click', deleteToDo);
  rightBtn.addEventListener('click', moveToDo);
}

function handleSubmit(event) {
  event.preventDefault();

  const currentValue = toDoInput.value;

  addToDo('pending', currentValue);
  toDoInput.value = '';
}

function saveToDos() {
  localStorage.setItem(TODOS_PENDING, JSON.stringify(arrToDosPending));
  localStorage.setItem(TODOS_FINISHED, JSON.stringify(arrToDosFinished));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  const status = ul.classList[0];
  const toDos = (status === 'js-toDoPending') ? arrToDosPending : arrToDosFinished;

  ul.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  if (status === 'js-toDoPending') arrToDosPending = cleanToDos;
  else arrToDosFinished = cleanToDos;

  saveToDos();
}

function moveToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  const status = ul.classList[0];
  const text = li.childNodes[0].innerText;
  const toDos = (status === 'js-toDoPending') ? arrToDosPending : arrToDosFinished;

  ul.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  if (status === 'js-toDoPending') {
    arrToDosPending = cleanToDos;
    addToDo('finished', text);
  } else {
    arrToDosFinished = cleanToDos;
    addToDo('pending', text);
  }

  saveToDos();
}

init();
