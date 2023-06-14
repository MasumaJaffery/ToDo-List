import './style.css';
import List from './modules/list.js';

const form = document.getElementById('list-form');
const listContainer = document.getElementById('list-container');
//const refresh = document.getElementById('refresh');
//const enter = document.getElementById('enter');
//const remove = document.getElementById('clear');
const tasks = [];
let id = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('input-id');
  const todo = new List(input.value, Boolean(), id); // Corrected line
  tasks.push(todo);
  id += 1;
  renderList();
});

function renderList() {
  // Clear existing list
  listContainer.innerHTML = '';

  // Render each task
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.textContent = task.description;
    listContainer.appendChild(listItem);
  });
}

// Render the list on page load
document.addEventListener('DOMContentLoaded', () => {
  renderList();
});

console.log('tasks', tasks);
