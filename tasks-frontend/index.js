//  ***************************** global constants **************************************************
const BASE_URL = 'http://localhost:3000'
const mainDiv = document.getElementById('main-div')
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
        // debugger
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
            morningUl.innerHTML = ""
            showSingleTask(task)
        } else if (task.routine === "Homework") {
            homeworkUl.innerHTML = ""
            showSingleTask(task)
        } else if (task.routine === "Chore") {
            choresUl.innerHTML = ""
            showSingleTask(task)
        } else if (task.routine === "Bedtime") {
            bedtimeUl.innerHTML = ""
            showSingleTask(task)
        }
    
    });
    tasks.addEventListener('click', () => {
        event.preventDefault()
        getAllTasks()
    })
};

function createTask() {
    event.preventDefault()
    let instructions = document.querySelectorAll('.task-instruction')
    let newArr = []
    for (let i = 0; i < instructions.length; i++) {
       newArr.push(instructions[i].value) 
    }
     
    const task = {
        name: document.getElementById('task-name').value,
        completed: document.getElementById('completed').value,
        routine: document.getElementById('task-routine').value,
        descriptions: newArr
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
            taskFormDiv.innerHTML = ''
            morningUl.innerHTML += makeTaskList(task)
           } else if (task.routine === "Homework") {
            taskFormDiv.innerHTML = ''
               homeworkUl.innerHTML += makeTaskList(task)
           } else if (task.routine === "Chore") {
            taskFormDiv.innerHTML = ''
               choresUl.innerHTML += makeTaskList(task)
           } else if (task.routine === "Bedtime") {
            taskFormDiv.innerHTML = ''
               bedtimeUl.innerHTML += makeTaskList(task)
           }
    })
}

function deleteTask() {
    event.preventDefault()
    const configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    fetch(BASE_URL + `/tasks/${event.target.dataset.id}`, configObj)
    .then(event.target.parentElement.remove())
}

//  ********** helpers for generating HTML and adding event listeners *******************************

function makeTaskList(task) {
    return (
        `<li>
            <a href="" data-id="${task.id}">${task.name}</a> - ${task.completed ? "Completed" : "Not Completed"}
            <button id="delete" data-id="${task.id}">Delete</button>
            <button id="update-task" data-id="${task.id}">Update</button>
        </li>`
    )
};

function taskForm() {
    return (`
        <form>
            <label for="name">Task:</label>      
            <input type="text" id="task-name" placeholder="Task Name">
            <label for="completed">Click Box If Task Is Not Complete:</label>
            <input type="checkbox" id="completed" value="false"><br>
            <label for="routine">Routine:</label>
            <select name="routine" id="task-routine">
               <option disabled selected value> -- select a routine -- </option>
               <option value="Morning">Morning</option>
               <option value="Homework">Homework</option>
               <option value="Chore">Chores</option>
               <option value="Bedtime">Bedtime</option>
            </select><br>
            <input type="submit">
        </form>
    `)
};

function addFormInputs() {
    const newForm = document.querySelector('form');
    const addBtn = document.createElement('button');
    taskFormDiv.appendChild(addBtn)
    addBtn.innerHTML = "Add an Instruction"

    let counter = 0;
    let addInput = function() {
        counter++;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'task-instruction'
        input.placeholder = 'Instruction ' + counter;
        newForm.appendChild(input);

    };
    addBtn.addEventListener('click', function() {
        addInput();
    }.bind(this));
};

function showNewForm() {
    const taskFormHTML = taskForm()
    taskFormDiv.innerHTML += taskFormHTML
    addFormInputs()
    document.querySelector("form").addEventListener('submit', createTask)
    
};

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
            morningUl.appendChild(div)
        } else if (task.routine === "Homework") {
            homeworkUl.appendChild(div)
        } else if (task.routine === "Chore") {
            choresUl.appendChild(div)
        } else if (task.routine === "Bedtime") {
            bedtimeUl.appendChild(div)
        }
    }
}

function editTask() {
    event.preventDefault()
    const taskId = event.target.dataset.id
    fetch(BASE_URL + `/tasks/${taskId}`)
    .then(response => response.json())
    .then(task => {
        const editForm = editFormInputs(task)
        taskFormDiv.innerHTML = editForm
    })
}

function editFormInputs(task) {
    const string1 = `
    <form data-id=${task.id}>
      <label for="name">Task:</label>      
      <input type="text" id="task-name" value="${task.name}">
      <label for="completed">Click Box If Task Is Not Complete:</label>
      <input type="checkbox" id="completed" ${task.completed ? "checked" : ""}><br>`

    let string2 = ``
    let instructions = task.instructions
    for(let i = 0; i < instructions.length; i++) {
       string2 += `<label for="instruction">Instruction</label>
                   <input type="text" value="${instructions[i].description}"><br>`
    }
    
    const string3 = `
    <label for="routine">Routine:</label>
    <select name="routine" id="edit-task-routine">
       <option value="Morning">Morning</option>
       <option value="Homework">Homework</option>
       <option selected value="Chore">Chores</option>
       <option value="Bedtime">Bedtime</option>
    </select><br>
    <input type="submit">
    </form>`

    let taskRoutineDropdown = document.querySelector('#edit-task-routine')
    debugger
    let opt = taskRoutineDropdown.options;
    for (let i = 0; i < opt.length; i++) {
        if (opt[i].value === 'Morning') {
            opt[i].selected = true;
        } else if (opt[i].value === 'Homework') {
            opt[i].selected = true;
        } else if (opt[i].value === 'Chore') {
            opt[i].selected = true;
        } else if (opt[i].value === 'Bedtime') {
            opt[i].selected = true;
        }
    }

    return string1 + string2 + string3
}



function clickOnTasks() {
    const liLinks = document.querySelectorAll("li a")

    liLinks.forEach(aTag => {
        aTag.addEventListener('click', showTask)
    })
    
    newTaskForm.addEventListener('click', showNewForm)
    document.querySelectorAll('#delete').forEach(task => task.addEventListener('click', deleteTask))
    document.querySelectorAll('#update-task').forEach(task => task.addEventListener('click', editTask))
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