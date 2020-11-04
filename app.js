// SELECTORS

const titleInput = document.querySelector('.todo-title-input');
const descInput = document.querySelector('.todo-desc-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];


// EVENTS

addBtn.onclick = addTodo;

// FUNCTIONS

// Render Todos

function renderTodos() {
 todoList.innerHTML = '';

 todos.forEach(function(todo) {
  
  var todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Add Title
  var todoTitle = document.createElement('p');
  todoTitle.innerText = todo.title;
  todoTitle.classList.add('title');
  todoDiv.appendChild(todoTitle);

  // Add Description
  if(todo.description != '') {
    var todoDesc = document.createElement('p');
    todoDesc.innerText = todo.description;
    todoDesc.classList.add('description');
    todoDiv.appendChild(todoDesc);
  }
 
  createButtons(todo, todoDiv);

  todoList.appendChild(todoDiv);
 });
}

renderTodos();

// ADD TODOS

function addTodo() {
 const todoTitle = titleInput.value;
 const todoDesc = descInput.value;

 const myTodo = {
  title: todoTitle,
  description: todoDesc
 };

 todos.push(myTodo);

 titleInput.value = '';
 descInput.value = '';

 renderTodos();
 saveToStorage();
}

// DELETE TODOS

function deleteTodo(pos) {
  todos.splice(pos, 1);
  renderTodos();
  saveToStorage();
}


function saveToStorage() {
 localStorage.setItem('list_todos', JSON.stringify(todos));
}


function createButtons(todo, todoDiv) {
  // Create Buttons Div
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons');
  
  // Done Todo
  const doneButton = document.createElement('button');
  
  doneButton.innerHTML = '<i class="fas fa-check"></i>';
  doneButton.onclick = function() {
    todoDiv.classList.add('check');
  }
  
  doneButton.classList.add('done-btn');
  
  buttonsDiv.appendChild(doneButton);

  // Trash Mark
  const trashButton = document.createElement('button');

  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('delete-btn');

  var pos = todos.indexOf(todo);
  trashButton.onclick = function() {
    deleteTodo(pos);
  }

  buttonsDiv.appendChild(trashButton);
  
  todoDiv.appendChild(buttonsDiv);
}

