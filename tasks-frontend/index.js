//  ***************************** global constants **************************************************
const BASE_URL = 'http://localhost:3000'
const morningRoutine = document.getElementById('morning-routine')
const homework = document.getElementById('homework')
const chores = document.getElementById('chores')
const bedtime = document.getElementById('bedtime')
const newTaskForm = document.getElementById('new-task-form')
const taskFormDiv = document.getElementById('task-form')
const morningUl = morningRoutine.querySelector('ul')
const homeworkUl = homework.querySelector('ul')
const choresUl = chores.querySelector('ul')
const bedtimeUl = bedtime.querySelector('ul')

//  ***************************** start up routine **************************************************
document.addEventListener("DOMContentLoaded", () =>{
    getAllTasks()
});


//  **************************** requests to backend ************************************************
function getAllTasks() {
    taskFormDiv.innerHTML = ''
    fetch(BASE_URL + '/tasks')
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(function(task) {
           if (task.routine === "Morning") {
            morningUl.innerHTML += makeTaskList(task)
           } else if (task.routine === "Homework") {
               homeworkUl.innerHTML += makeTaskList(task)
           } else if (task.routine === "Chore") {
               choresUl.innerHTML += makeTaskList(task)
           } else if (task.routine === "Bedtime") {
               bedtimeUl.innerHTML += makeTaskList(task)
           }
        });
        clickOnTasks()
    });
};

function showTask() {
    event.preventDefault()
    const taskId = event.target.dataset.id

    fetch(BASE_URL + '/tasks/' + taskId)
    .then(response => response.json())
    .then(task => {
        if (task.routine === "Morning") {
            morningRoutine.innerHTML = ""
            morningUl.innerHTML += showSingleTask(task)
        } else if (task.routine === "Homework") {
            homework.innerHTML = ""
            homeworkUl.innerHTML += showSingleTask(task)
        } else if (task.routine === "Chore") {
            chores.innerHTML = ""
            choresUl.innerHTML += showSingleTask(task)
        } else if (task.routine === "Bedtime") {
            bedtime.innerHTML = ""
            bedtimeUl.innerHTML += showSingleTask(task)
        }

    });
};


//  ********** helpers for generating HTML and adding event listeners *******************************

function makeTaskList(task) {
    return (
        `<li>
            <a href="" data-id="${task.id}">${task.name}</a> - ${task.completed ? "Completed" : "Not Completed"}
        </li>`
    )
};

function clickOnTasks() {
    const liLinks = document.querySelectorAll("li a")

    liLinks.forEach(aTag => {
        aTag.addEventListener('click', showTask)
    })
    
    // newTaskForm.addEventListener('click', showNewForm)
}
