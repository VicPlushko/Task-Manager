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
let taskStatus;
let instructions;

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
        clearMorningUl()
        clearHomeworkUl()
        clearChoresUl()
        clearBedtimeUl()
        clearMiscUl()
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

        const taskInstance = new Task(task)

        if (task.routine === "Morning") {
            clearMorningUl()
            taskInstance.renderSingleTask()
        } else if (task.routine === "Homework") {
            clearHomeworkUl()
            taskInstance.renderSingleTask()
        } else if (task.routine === "Chore") {
            clearChoresUl()
            taskInstance.renderSingleTask()
        } else if (task.routine === "Bedtime") {
            clearBedtimeUl()
            taskInstance.renderSingleTask()
        } else if (task.routine === "") {
            clearMiscUl()
            taskInstance.renderSingleTask()
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
        completed: document.getElementById('completed').checked,
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
        clearFormDiv()
        const taskInstance = new Task(task)

        if (task.routine === "Morning") {
            clearMorningUl()
            morningUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "Homework") {
               clearHomeworkUl()
               homeworkUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "Chore") {
               clearChoresUl()
               choresUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "Bedtime") {
               clearBedtimeUl()
               bedtimeUl.innerHTML += taskInstance.renderTask()
           } else if (task.routine === "") {
               clearMiscUl()
               miscUl.innerHTML += taskInstance.renderTask() 
           }
           clickOnTasks()
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
    .then(() => {
        instructions = document.querySelectorAll('.instructions-check')
        taskStatus = document.getElementById('completed')
        for(var i = 0; i < instructions.length; i++) {
             instructions[i].addEventListener('click', updateDisplay)
        }
    })
}

function updateTask() {
    event.preventDefault()
    const taskId = event.target.dataset.id
    let editInstructions = document.querySelectorAll('.instruction-detail')
    let instructionArray = []
    editInstructions.forEach(instruction => instructionArray.push({
        id: instruction.querySelector(":scope > .edit-task-instructions").id,
        description: instruction.querySelector(":scope > .edit-task-instructions").value,
        completed: instruction.querySelector(":scope > .instructions-check").checked
    }))

    const task = {
        name: event.target.querySelector('#task-name').value,
        completed: event.target.querySelector('#completed').checked,
        routine: event.target.querySelector('#edit-task-routine').value,
        descriptions: instructionArray
    }
    console.log(task)

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
        
        const taskInstance = new Task(task)

        if (task.routine === "Morning") {
            clearFormDiv()
            clearMorningUl()
            morningUl.innerHTML = taskInstance.renderTask()
           } else if (task.routine === "Homework") {
               clearFormDiv()
               clearHomeworkUl()
               homeworkUl.innerHTML = taskInstance.renderTask()
           } else if (task.routine === "Chore") {
               clearFormDiv()
               clearChoresUl()
               choresUl.innerHTML = taskInstance.renderTask()
           } else if (task.routine === "Bedtime") {
               clearFormDiv()
               clearBedtimeUl()
               bedtimeUl.innerHTML = taskInstance.renderTask()
           } else if (task.routine === "") {
               clearFormDiv()
               clearMiscUl()
               miscUl.innerHTML = taskInstance.renderTask()
           }
        clickOnTasks()
    })
}

function updateInstruction() {
    const taskId = document.querySelector('.show-task').id
    let editInstructions = document.querySelectorAll('.instruction-detail')
    let instructionArray = []
    editInstructions.forEach(instruction => instructionArray.push({
        id: instruction.querySelector(":scope > .checkbox").id,
        description: instruction.querySelector(":scope > .description").textContent,
        completed: instruction.querySelector(":scope > .checkbox").checked
    }))

    const task = {
        name: document.querySelector('.show-task h3').textContent,
        completed: (instructionArray.filter(inst => inst.completed === false).length === 0) ? true : false,
        routine: document.querySelector('.instruction-detail').id,
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
        
        if (task.instructions.filter(instruction => instruction.completed === false).length === 0) {
            
            const taskInstance = new Task(task)

            if (task.routine === "Morning") {
                morningUl.innerHTML = taskInstance.renderTask()
               } else if (task.routine === "Homework") {
                   homeworkUl.innerHTML = taskInstance.renderTask()
               } else if (task.routine === "Chore") {
                   choresUl.innerHTML = taskInstance.renderTask()
               } else if (task.routine === "Bedtime") {
                   bedtimeUl.innerHTML = taskInstance.renderTask()
               } else if (task.routine === "") {
                   miscUl.innerHTML = taskInstance.renderTask()
               }
            clickOnTasks()
        } else {
            console.log("Do nothing, not all instructions are completed")
        }
    })
}

//  ********** helpers for generating HTML and adding event listeners *******************************

function taskForm() {
    return (`
        <form>
            <label for="name">Task:</label>      
            <input type="text" id="task-name" placeholder="Task Name">
            <label>Click Box If Task Is Complete:</label>
            <input type="checkbox" id="completed"><br>
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
    addBtn.id = "add-input"
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
    taskFormDiv.innerHTML = taskFormHTML
    addFormInputs()
    document.querySelector("form").addEventListener('submit', createTask)
    
};

function clickOnTasks() {
    const liLinks = document.querySelectorAll("li a")

    liLinks.forEach(aTag => {
        aTag.addEventListener('click', showTask)
    })
    
    newTaskForm.addEventListener('click', showNewForm)
    document.querySelectorAll('#delete').forEach(task => task.addEventListener('click', deleteTask))
    document.querySelectorAll('#update-task').forEach(task => task.addEventListener('click', editTask))
}

function updateDisplay() {
    let checkedCount = 0;
    for(var i = 0; i < instructions.length; i++) {
        if(instructions[i].checked) {
          checkedCount++
        }
    }
        if(checkedCount === instructions.length) {
          taskStatus.checked = true
        } else {
          taskStatus.checked = false
        }   
}


    

function clearFormDiv() {
    taskFormDiv.innerHTML = ''
}

function clearMorningUl() {
    morningUl.innerHTML = ''
}

function clearHomeworkUl() {
    homeworkUl.innerHTML = ''
}

function clearChoresUl() {
    choresUl.innerHTML = ''
}

function clearBedtimeUl() {
    bedtimeUl.innerHTML = ''
}

function clearMiscUl() {
    miscUl.innerHTML = ''
}