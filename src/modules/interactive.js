import Function from './functions.js';

const Status = document.querySelector('#checkbox');
if(Status.checked) {
    this.completed = 'true';
    this.saveTasksToLocalStorage();
}
else {
    this.completed = 'false';
}


Function();


export default Status;
