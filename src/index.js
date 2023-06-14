import './style.css';
const form = document.getElementById('list-form');
const lists = document.getElemenybyId('list-container');
const inputfield = document.getElementById('input-id');
const refresh = document.getElementById('refresh');
const enter = document.getElementById('enter');
const remove = document.getElementById('clear');
const tasks = [];
form.addEventListener('submit', (e) => {
   e.preventDefault();
   var id = i;
   i++;
   const todo = new List(input.value,Boolean,id);
   this.tasks = [...tasks, List];
   console.log(todo);
});
//Object Instances;
class List {
    constructor(description,complete,id) {
    this.description = description,
    this.complete = Boolean,
    this.id = id
    }
  }