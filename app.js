// Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListener();

//load all event listeners

function loadEventListener(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add Task
    form.addEventListener('submit', addTask);
    //Remove Task
    taskList.addEventListener('click', removeTask);
    //Clear Task
    clearBtn.addEventListener('click', clearTasks);
    //Filter Task
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks Fromm LS

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create element li
    const li = document.createElement('li');
    

    // Add class Name to li
    li.className='collection-item';

    // create text node for li and append it to li
    li.appendChild(document.createTextNode(task));

    // create link element
    const link = document.createElement('a');

    // Add class Name to link element
    link.className='delete-item secondary-content';

    // Add Icon
    link.innerHTML= '<i class="fa fa-remove"></i>';

    // Append Link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
    });
}
// Add Task Function

function addTask(e){

    //case 1: If nothing is entered but clicked submit alert to enter a value
    if(taskInput.value === '') {
        alert('Add a Task');
    }

    //create element li
    const li = document.createElement('li');
    

    // Add class Name to li
    li.className='collection-item';

    // create text node for li and append it to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create link element
    const link = document.createElement('a');

    // Add class Name to link element
    link.className='delete-item secondary-content';

    // Add Icon
    link.innerHTML= '<i class="fa fa-remove"></i>';

    // Append Link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //clear Input
    taskInput.value = '';

    e.preventDefault();
}

//Store Task in Local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Remove Task

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from Local Storage
            removeTaskFromLocalStorage(
                e.target.parentElement.parentElement
            );
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){

        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    }); 

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks

function clearTasks() {
    //one way
    //taskList.innerHTML = '';

    // Second way - fast (while loop)
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // CLear Task from LS
    clearTasksFromLocalStorage();
}

//Clear Task from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else{
                task.style.display = 'none';
            }
        }
    );
}