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
    const strdiv = document.createElement('div');
    const btndiv = document.createElement('div'); 
  
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    const listItem = document.createElement('li');
    const edit = document.createElement('button');
    edit.className = 'editbtn';
    edit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    edit.addEventListener('click', () => {
      listItem.contentEditable = "true";
    }); 

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
    remove.className = 'removebtn';
    remove.innerHTML = '<i class="fas fa-trash"></i>';
    remove.addEventListener('click', () => {
      // Remove button click functionality here!
      tasks.splice(id, 1); 
      renderList();
      saveTasksToLocalStorage();
    });

    strdiv.appendChild(checkbox);
    strdiv.appendChild(document.createTextNode(task.description));
    btndiv.appendChild(edit);
    btndiv.appendChild(remove);
    listItem.appendChild(strdiv);
    listItem.appendChild(btndiv);

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