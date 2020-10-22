//  ***************************** global constants **************************************************
const BASE_URL = 'http://localhost:3000'
const morningRoutine = document.getElementById('morning-routine')
const homework = document.getElementById('homework')
const chores = document.getElementById('chores')
const bedTime = document.getElementById('bedtime')
const newTaskForm = document.getElementById('new-task-form')
const taskFormDiv = document.getElementById('task-form')

//  ***************************** start up routine **************************************************
document.addEventListener("DOMContentLoaded", () =>{
    getMorningTasks()
    getHomeworkTasks()
    getChoresTasks()
    getBedtimeTasks()
});


//  **************************** requests to backend ************************************************
function getMorningTasks() {
    fetch(BASE_URL + '/tasks')
    .then(response => response.json())
    .then(tasks => {
       let morningTask = tasks.find(task => task.routine === "Morning")
        morningRoutine.innerHTML += tasks.map(task => console.log(task))

       
    })
}



//  ********** helpers for generating HTML and adding event listeners *******************************