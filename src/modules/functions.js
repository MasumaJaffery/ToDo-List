import List from './list.js';
import { form, listContainer, clearButton, input } from './global.js';

let tasks = [];
let id = 0;

// Function to handle form submission
function handleFormSubmit() {
  const todo = new List(input.value, Boolean(), id);
  tasks.push(todo);
  id += 1;
  saveTasksToLocalStorage(); // Call saveTasksToLocalStorage() after adding a task
  updateListUI(); // Update the UI
  input.value = ''; // Clear the input field
}

function renderList(tasks) {
  return tasks.map((task) => {
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
      listItem.contentEditable = 'true';
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
    });

    remove.className = 'removebtn';
    remove.innerHTML = '<i class="fas fa-trash"></i>';
    remove.addEventListener('click', () => {
      // Handle remove task functionality here
    });

    listItem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        listItem.contentEditable = 'false';
        task.description = listItem.innerText.trim();
      }
    });

    // Append elements to listItem
    listItem.appendChild(strdiv);
    listItem.appendChild(btndiv);
    strdiv.appendChild(checkbox);
    strdiv.appendChild(document.createTextNode(task.description));
    btndiv.appendChild(edit);
    btndiv.appendChild(remove);

    return listItem;
  });
} 

function updateListUI() {
  const listItems = renderList();
  listContainer.innerHTML = '';
  listItems.forEach((item) => {
    listContainer.appendChild(item);
  });
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    id = tasks.length;
  }
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  handleFormSubmit();
});

// Event listener for button click with ID "enter"
const enterBtn = document.getElementById('enter');
enterBtn.addEventListener('click', () => {
  handleFormSubmit();
});

// Event listener for Clear Completed Tasks Button
clearButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage();
  updateListUI(); // Update the UI
});

// Load tasks from local storage and render the list
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  updateListUI(); // Update the UI
});

// Add event listener for the "keydown" event on the listItem
listContainer.addEventListener('keydown', (e) => {
  const listItem = e.target.closest('li');
  const taskIndex = Array.from(listContainer.children).indexOf(listItem);
  if (e.key === 'Enter') {
    e.preventDefault();
    listItem.contentEditable = 'false';
    tasks[taskIndex].description = listItem.innerText.trim();
    saveTasksToLocalStorage(); // Call saveTasksToLocalStorage() after modifying the task description
  }
});

console.log('tasks', tasks);

export default Function;
