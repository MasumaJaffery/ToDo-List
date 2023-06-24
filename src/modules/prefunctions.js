const List = require('./list.js');

// Pure function to handle list rendering
function renderList(tasks, listContainer) {
  listContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const checkbox = document.createElement('input');
    const remove = document.createElement('button');
    const strdiv = document.createElement('div');
    const btndiv = document.createElement('div');

    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = task.completed;
    const listItem = document.createElement('li');
    const edit = document.createElement('button');
    edit.className = 'editbtn';
    edit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

    checkbox.addEventListener('change', () => {
      tasks = updateTaskCompletion(tasks, index, checkbox.checked);
      renderList(tasks, listContainer);
      saveTasksToLocalStorage(tasks);
    });

    remove.className = 'removebtn';
    remove.innerHTML = '<i class="fas fa-trash"></i>';
    remove.addEventListener('click', () => {
      tasks = removeTask(tasks, index);
      renderList(tasks, listContainer);
      saveTasksToLocalStorage(tasks);
    });

    listItem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        listItem.contentEditable = "false";
        tasks = updateTaskDescription(tasks, index, listItem.innerText.trim());
        saveTasksToLocalStorage(tasks);
      }
    });

    edit.addEventListener('click', () => {
      listItem.contentEditable = "true";
      listItem.focus();
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

// Pure function to update task completion
function updateTaskCompletion(tasks, index, completed) {
  return tasks.map((task, i) => {
    if (i === index) {
      return {
        ...task,
        completed
      };
    }
    return task;
  });
}

// Pure function to remove a task
function removeTask(tasks, index) {
  return tasks.filter((task, i) => i !== index);
}

// Pure function to update task description
function updateTaskDescription(tasks, index, description) {
  return tasks.map((task, i) => {
    if (i === index) {
      return {
        ...task,
        description
      };
    }
    return task;
  });
}

// Pure function to save tasks to local storage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Pure function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return [];
}

// Pure function to handle form submission
function handleFormSubmit(tasks, input, id, listContainer) {
  const todo = new List(input.value, Boolean(), id);
  tasks.push(todo);
  id += 1;
  renderList(tasks, listContainer);
  saveTasksToLocalStorage(tasks);
}

// Pure function to clear all completed tasks
function clearCompletedTasks(tasks, listContainer) {
  const updatedTasks = tasks.filter(task => !task.completed);
  renderList(updatedTasks, listContainer);
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}

// Pure function to handle the entire list functionality
function handleList() {
  const form = document.getElementById('list-form');
  const listContainer = document.getElementById('list-container');
  const input = document.getElementById('input-id');
  const clearBtn = document.getElementById('clear-btn');
  const clearAllBtn = document.getElementById('clear');
  let tasks = loadTasksFromLocalStorage();
  let id = tasks.length;

  // Event listener for form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit(tasks, input, id, listContainer);
  });

  // Event listener for button click with ID "enter"
  const enterBtn = document.getElementById('enter');
  enterBtn.addEventListener('click', () => {
    handleFormSubmit(tasks, input, id, listContainer);
  });

  // Event listener for clear button click
  clearBtn.addEventListener('click', () => {
    tasks = clearCompletedTasks(tasks, listContainer);
  });

  // Event listener for clear all button click
  clearAllBtn.addEventListener('click', () => {
    tasks = [];
    renderList(tasks, listContainer);
    saveTasksToLocalStorage(tasks);
  });

  // Load tasks from local storage and render the list
  renderList(tasks, listContainer);

  console.log('tasks', tasks);
}

handleList();

// eslint-disable-next-line no-undef
module.exports = Function;
