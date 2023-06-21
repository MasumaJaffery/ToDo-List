import List from './list.js';

function handleFormSubmit(inputValue, tasks) {
  const todo = new List(inputValue, Boolean(), tasks.length);
  const updatedTasks = [...tasks, todo];
  return updatedTasks;
}

function renderList(tasks) {
  return tasks.map((task) => {
    const listItem = createListItem(task);
    return listItem;
  });
}

function createListItem(task) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');

  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  // ... Continue setting up event listeners

  listItem.appendChild(checkbox);
  // ... Append other elements

  return listItem;
}

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return [];
}

function handleFormSubmission(event, tasks) {
  event.preventDefault();
  const input = document.getElementById('input-id');
  const updatedTasks = handleFormSubmit(input.value, tasks);
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}

function handleClickEvent(event, tasks) {
  const input = document.getElementById('input-id');
  const updatedTasks = handleFormSubmit(input.value, tasks);
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}

function handleClearButtonClick(tasks) {
  const updatedTasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}

function updateListContainer(listContainer, tasks) {
  listContainer.innerHTML = '';
  const listItems = renderList(tasks);
  listItems.forEach((listItem) => {
    listContainer.appendChild(listItem);
  });
}

function initializeApp() {
  const form = document.getElementById('list-form');
  const enterBtn = document.getElementById('enter');
  const clearButton = document.getElementById('clear');
  const listContainer = document.getElementById('list-container');

  let tasks = loadTasksFromLocalStorage();

  form.addEventListener('submit', (event) => {
    tasks = handleFormSubmission(event, tasks);
    updateListContainer(listContainer, tasks);
  });

  enterBtn.addEventListener('click', (event) => {
    tasks = handleClickEvent(event, tasks);
    updateListContainer(listContainer, tasks);
  });

  clearButton.addEventListener('click', () => {
    tasks = handleClearButtonClick(tasks);
    updateListContainer(listContainer, tasks);
  });

  updateListContainer(listContainer, tasks);

  console.log('tasks', tasks);
}

initializeApp();

export default Function;