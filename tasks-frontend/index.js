//  ***************************** global constants **************************************************
const BASE_URL = 'http://localhost:3000'
const morningRoutine = document.getElementById('morning-routine')
const homework = document.getElementById('homework')
const chores = document.getElementById('chores')
const bedtime = document.getElementById('bedtime')
const tasks = document.getElementById('tasks')
const newTaskForm = document.getElementById('new-task-form')
const taskFormDiv = document.getElementById('task-form')
const morningUl = morningRoutine.querySelector('ul')
const homeworkUl = homework.querySelector('ul')
const choresUl = chores.querySelector('ul')
const bedtimeUl = bedtime.querySelector('ul')

//  ***************************** start up routine **************************************************
document.addEventListener("DOMContentLoaded", () =>{
    getAllTasks()
    tasks.addEventListener('click', () => {
        console.log(event.target)
        event.preventDefault()
        getAllTasks()

       
    })
});


//  **************************** requests to backend ************************************************
function getAllTasks() {
    taskFormDiv.innerHTML = ''
    
    fetch(BASE_URL + '/tasks')
    .then(response => response.json())
    .then(allTasks => {
        morningUl.innerHTML = ''
        homeworkUl.innerHTML = ''
        choresUl.innerHTML = ''
        bedtimeUl.innerHTML = ''
        allTasks.forEach(function(task) {
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
            showSingleTask(task)
        } else if (task.routine === "Homework") {
            homework.innerHTML = ""
            showSingleTask(task)
        } else if (task.routine === "Chore") {
            chores.innerHTML = ""
            showSingleTask(task)
        } else if (task.routine === "Bedtime") {
            bedtime.innerHTML = ""
            showSingleTask(task)
        }
        debugger

    });
};

function createTask() {
    event.preventDefault()

    const task = {
        name: document.getElementById('task-name').value,
        completed: document.getElementById('completed').value,
        routine: document.getElementById('task-routine').value,
        instructions: document.getElementById('instruction-1').value
    }

    const configObj = {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    fetch(BASE_URL + "/tasks", configObj)
    .then(response => response.json())
    .then(task => {
        if (task.routine === "Morning") {
            morningUl.innerHTML += makeTaskList(task)
           } else if (task.routine === "Homework") {
               homeworkUl.innerHTML += makeTaskList(task)
           } else if (task.routine === "Chore") {
               choresUl.innerHTML += makeTaskList(task)
           } else if (task.routine === "Bedtime") {
               bedtimeUl.innerHTML += makeTaskList(task)
           }
    })
}





//  ********** helpers for generating HTML and adding event listeners *******************************

function makeTaskList(task) {
    return (
        `<li>
            <a href="" data-id="${task.id}">${task.name}</a> - ${task.completed ? "Completed" : "Not Completed"}
        </li>`
    )
};

function taskForm() {
    return (`
        <form id="new-form">
            <label for="name">Task:</label>      
            <input type="text" id="task-name" placeholder="Task Name">
            <label for="completed">Completed?:</label>
            <input type="checkbox" id="completed" value="true"><br>
            <label for="routine">Routine:</label>
            <select name="routine" id="task-routine">
               <option value="Morning">Morning</option>
               <option value="Homework">Homework</option>
               <option value="Chore">Chores</option>
               <option value="Bedtime">Bedtime</option>
            </select><br>
            <label for="instruction">Instruction:</label>
            <input type="text" id="instruction-1" placeholder="Add Instruction Here"><br><br>
            <input type="submit">
        </form>
    `)
}

function showNewForm() {
    const taskFormHTML = taskForm()
    taskFormDiv.innerHTML += taskFormHTML
    document.getElementById("new-form").addEventListener('submit', createTask)
    
}



function showSingleTask(task) {

    const div = document.createElement('div');
    div.className = "show-task"
    let taskH3 = document.createElement('h3')
    taskH3.innerHTML = `${task.name}`
    let ul = document.createElement('ul')
    
    let instructions = task.instructions
    
    for (let i = 0; i < instructions.length; i++) {
        const li = document.createElement('li')
        const checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.className = "checkbox"
        checkbox.checked = false
        li.appendChild(checkbox)

        const text = document.createTextNode(`${instructions[i].description}`)
        li.appendChild(text)
        
        ul.appendChild(li)
        div.appendChild(taskH3)
        div.appendChild(ul)
        if (task.routine === "Morning") {
            morningRoutine.appendChild(div)
        } else if (task.routine === "Homework") {
            homework.appendChild(div)
        } else if (task.routine === "Chore") {
            chores.appendChild(div)
        } else if (task.routine === "Bedtime") {
            bedtime.appendChild(div)
        }
    }

}

function clickOnTasks() {
    const liLinks = document.querySelectorAll("li a")

    liLinks.forEach(aTag => {
        aTag.addEventListener('click', showTask)
    })
    
    newTaskForm.addEventListener('click', showNewForm)
}

// function clickOnCheckbox() {
//     const cb = document.querySelectorAll(".checkbox")
    
//     cb.addEventListener('click', changeCompletedStatus)
//     debugger
// }

// function changeCompletedStatus(instructions) {
//     document.querySelectorAll(".checkbox").onclick = function() {
//         if (this.checked) {
//             instructions.completed = true
//         } else {
//             instructions.completed = false
//         }
        
//     }
// }