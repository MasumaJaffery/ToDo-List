import './style.css';
import List from './modules/list.js';

const form = document.getElementById('list-form');
const listContainer = document.getElementById('list-container');
const tasks = [];
let id = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('input-id');
  const todo = new List(input.value, Boolean(), id); 
  tasks.push(todo);
  // Pushing Objests in Task Array!
  id += 1;
  renderList();
});

function renderList() {
  // Clear the list container
  listContainer.innerHTML = '';

  // Render each task as a checkbox
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const label = document.createElement('label');
    label.textContent = task.description;

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
        label.style.fontStyle ='italic';
      } else {
        label.style.textDecoration = 'none';
      }
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listContainer.appendChild(listItem);
  });
}

// Render the list on page load
document.addEventListener('DOMContentLoaded', () => {
  renderList();
});

console.log('tasks', tasks);
