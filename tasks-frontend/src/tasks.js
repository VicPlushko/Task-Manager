class Task {
    constructor(task) { //object from json
        this.id = task.id
        this.name = task.name
        this.routine = task.routine
        this.completed = task.completed
        this.instructions = task.instructions
    };

    renderTask() {
        return (`
            <li>
              <a href="" data-id="${this.id}">${this.name}</a> - ${this.completed ? "Completed" : "Not Completed"}
              <button id="update-task" data-id="${this.id}">Update</button>
              <button id="delete" data-id="${this.id}">Delete</button>
            </li>`
        )
    }


    renderEditForm() {
        const editForm1 = `
    <form data-id=${this.id}>
      <label for="name">Task:</label>      
      <input type="text" id="task-name" value="${this.name}">
      <label for="completed">Click Box If Task Is Complete:</label>
      <input type="checkbox" id="completed" ${this.completed ? "checked" : ""}><br>`

    let editForm2 = ``
    let instructions = this.instructions
    for(let i = 0; i < instructions.length; i++) {
        const checked = instructions[i].completed ? "checked" : ""
       editForm2 += `<div class="instruction-detail">
                   <label for="instruction">Instruction</label>
                   <input type="text" id="${instructions[i].id}" class="edit-task-instructions" value="${instructions[i].description}">
                   <label for="checkbox">Completed?:</label>
                   <input type="checkbox" class="instructions-check" ${checked}></div><br>`
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

    renderSingleTask() {
        const div = document.createElement('div');
        div.className = "show-task"
        div.id = `${this.id}`
        let taskH3 = document.createElement('h3')
        taskH3.innerHTML = `${this.name}`
        let ul = document.createElement('ul')
    
        let instructions = this.instructions
    
        for (let i = 0; i < instructions.length; i++) {
            const instructionDetail = document.createElement('div')
            instructionDetail.className = 'instruction-detail'
            instructionDetail.id = `${this.routine}`
            const li = document.createElement('li')
            const checkbox = document.createElement('input')
            checkbox.type = "checkbox"
            checkbox.className = "checkbox"
            checkbox.checked = instructions[i].completed
            checkbox.id = instructions[i].id
            checkbox.addEventListener('click', updateInstruction)
            instructionDetail.appendChild(checkbox)
            
            const text = document.createElement('label')
            text.className = "description"
            text.innerHTML = `${instructions[i].description}`
            instructionDetail.appendChild(text)
        
            ul.appendChild(li)
            li.appendChild(instructionDetail)
            div.appendChild(taskH3)
            div.appendChild(ul)
            if (this.routine === "Morning") {
             morningUl.appendChild(div)
            } else if (this.routine === "Homework") {
                homeworkUl.appendChild(div)
            } else if (this.routine === "Chore") {
                choresUl.appendChild(div)
            } else if (this.routine === "Bedtime") {
                bedtimeUl.appendChild(div)
            } else if (this.routine === "") {
                miscUl.appendChild(div)
            }
        }

    }


}