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
    // getHomeworkTasks()
    // getChores()
    // getBedtimeTasks()
});


//  **************************** requests to backend ************************************************
function getAllTasks() {
    fetch(BASE_URL + '/tasks')
    .then(response => response.json())
    .then(tasks => {
        if (tasks.routine === "Morning") {
            morningUl.innerHTML = makeTaskList(task)
        }
     debugger
    })
}



//  ********** helpers for generating HTML and adding event listeners *******************************

function makeTaskList(task) {
    debugger
    return (
        `<li>
            <a href="" data-id="${task.id}">${task.name}</a> - ${task.completed ? "Completed" : "Not Completed"}
        </li>`
    )
};