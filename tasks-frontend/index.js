//  ***************************** global constants **************************************************
const BASE_URL = 'http://localhost:3000'
const tasks = document.getElementById('tasks')
const newTaskForm = document.getElementById('new-task-form')
const taskFormDiv = document.getElementById('task-form')
const morningUl = document.querySelector('div#morning-routine ul')
const homeworkUl = document.querySelector('div#homework ul')
const choresUl = document.querySelector('div#chores ul')
const bedtimeUl = document.querySelector('div#bedtime ul')
const miscUl = document.querySelector('div#misc ul')

//  ***************************** start up routine **************************************************
document.addEventListener("DOMContentLoaded", () =>{
    getAllTasks()
    tasks.addEventListener('click', () => {
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
        miscUl.innerHTML = ''
        allTasks.forEach(task => {
            
            const taskInstance = new Task(task)
           
            if (task.routine === "Morning") {
            morningUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "Homework") {
               homeworkUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "Chore") {
               choresUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "Bedtime") {
               bedtimeUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "") {
               miscUl.innerHTML += taskInstance.renderTask()
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
        } else if (task.routine === "") {
            miscUl.innerHTML = ""
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

        const taskInstance = new Task(task)

        if (task.routine === "Morning") {
            taskFormDiv.innerHTML = ''
            morningUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "Homework") {
               taskFormDiv.innerHTML = ''
               homeworkUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "Chore") {
               taskFormDiv.innerHTML = ''
               choresUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "Bedtime") {
               taskFormDiv.innerHTML = ''
               bedtimeUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "") {
               taskFormDiv.innerHTML = ""
               miscUl.innerHTML += taskInstance.renderTask() 
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

function editTask() {
    event.preventDefault()
    const taskId = event.target.dataset.id
    fetch(BASE_URL + `/tasks/${taskId}`)
    .then(response => response.json())
    .then(task => {

        const taskInstance = new Task(task)

        const editForm = taskInstance.renderEditForm()
        taskFormDiv.innerHTML = editForm
        document.querySelector("form").addEventListener('submit', updateTask)
    })
}

function updateTask() {
    event.preventDefault()
    const taskId = event.target.dataset.id
    let editInstructions = document.querySelectorAll('.edit-task-instructions')
    let instructionArray = []
    editInstructions.forEach(instruction => instructionArray.push({
        id: instruction.id,
        description: instruction.value
    }))
    // debugger

    const task = {
        name: event.target.querySelector('#task-name').value,
        completed: event.target.querySelector('#completed').checked,
        routine: event.target.querySelector('#edit-task-routine').value,
        descriptions: instructionArray
    }

    const configObj = {
        method: 'PATCH',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    fetch(BASE_URL + `/tasks/${taskId}`, configObj)
    .then(response => response.json())
    .then(task => {
        // const updatedTask = 
        // `<li>
        // <a href="" data-id="${task.id}">${task.name}</a> - ${task.completed ? "Completed" : "Not Completed"}
        // <button id="delete" data-id="${task.id}">Delete</button>
        // <button id="update-task" data-id="${task.id}">Update</button>
        // </li>`

        const taskInstance = new Task(task)

        if (task.routine === "Morning") {
            taskFormDiv.innerHTML = ''
            morningUl.innerHTML += taskInstance.renderUpdatedTask()
           } else if (task.routine === "Homework") {
               taskFormDiv.innerHTML = ''
               homeworkUl.innerHTML += taskInstance.renderUpdatedTask()
           } else if (task.routine === "Chore") {
               taskFormDiv.innerHTML = ''
               choresUl.innerHTML += taskInstance.renderUpdatedTask()
           } else if (task.routine === "Bedtime") {
               taskFormDiv.innerHTML = ''
               bedtimeUl.innerHTML += taskInstance.renderUpdatedTask()
           } else if (task.routine === "") {
               taskFormDiv.innerHTML = ''
               miscUl.innerHTML += taskInstance.renderUpdatedTask()
           } else if (task.routine === "") {
               taskFormDiv.innerHTML = ""
               miscUl.innerHTML += taskInstance.renderUpdatedTask() 
        }
        
        clickOnTasks()
    })
}

//  ********** helpers for generating HTML and adding event listeners *******************************

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
        } else if (task.routine === "") {
            miscUl.appendChild(div)
        }
    }
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


/////////////////////////////////////// CLASSES ////////////////////////////////////////////////////

class Task {
    constructor(task) { //object from json
        this.id = task.id
        this.name = task.name
        this.routine = task.routine
        this.completed = task.completed
        this.instructions = task.instructions
    };

    renderTask() {
        console.log('this is', this)
        return (`
            <li>
              <a href="" data-id="${this.id}">${this.name}</a> - ${this.completed ? "Completed" : "Not Completed"}
              <button id="delete" data-id="${this.id}">Delete</button>
              <button id="update-task" data-id="${this.id}">Update</button>
            </li>`
        )
    }

    renderEditForm() {
        const editForm1 = `
    <form data-id=${this.id}>
      <label for="name">Task:</label>      
      <input type="text" id="task-name" value="${this.name}">
      <label for="completed">Click Box If Task Is Not Complete:</label>
      <input type="checkbox" id="completed" ${this.completed ? "checked" : ""}><br>`

    let editForm2 = ``
    let instructions = this.instructions
    for(let i = 0; i < instructions.length; i++) {
       editForm2 += `<label for="instruction">Instruction</label>
                   <input type="text" id="${instructions[i].id}" class="edit-task-instructions" value="${instructions[i].description}"><br>`
    }
    
    const editForm3 = `
    <label for="routine">Routine:</label>
    <select name="routine" id="edit-task-routine">
       <option disable selected value>-- Select A Routine --</option>
       <option value="Morning">Morning</option>
       <option value="Homework">Homework</option>
       <option value="Chore">Chores</option>
       <option value="Bedtime">Bedtime</option>
    </select><br>
    <input type="submit">
    </form>`

    return editForm1 + editForm2 + editForm3
    }

    renderUpdatedTask() {
        `<li>
        <a href="" data-id="${this.id}">${this.name}</a> - ${this.completed ? "Completed" : "Not Completed"}
        <button id="delete" data-id="${this.id}">Delete</button>
        <button id="update-task" data-id="${this.id}">Update</button>
        </li>`
    }
}