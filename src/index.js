import './style.css';
import List from './modules/list.js';

const form = document.getElementById('list-form');
const listContainer = document.getElementById('list-container');
let tasks = [];
let id = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('input-id');
  const todo = new List(input.value, Boolean(), id);
  tasks.push(todo);
  id += 1;
  renderList();
  saveTasksToLocalStorage();
});

function renderList() {
  listContainer.innerHTML = '';

  tasks.forEach((task,id) => {
    const checkbox = document.createElement('input');
    const remove = document.createElement('button');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const listItem = document.createElement('li');
    listItem.contentEditable = "true";

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      if (checkbox.checked) {
        listItem.style.textDecoration = 'line-through';
        listItem.style.fontStyle = 'italic';
      } else {
        listItem.style.textDecoration = 'none';
        listItem.style.fontStyle = 'normal';
      }
      saveTasksToLocalStorage();
    });

    remove.textContent = '<i class="bi bi-backspace"></i>';
    remove.addEventListener('click', () => {
      // Remove button click functionality here!
      tasks.splice(id, 1); 
      renderList();
      saveTasksToLocalStorage();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(task.description));
    listItem.appendChild(remove);

    listContainer.appendChild(listItem);
  });
}



function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    id = tasks.length;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  renderList();
});

console.log('tasks', tasks);