// DOM ELEMENT

const todoForm = document.querySelector('#todo-form')
const todoList = document.querySelector('.todos')
const totalTasks = document.querySelector('#total-tasks')
const completedTasks = document.querySelector('#completed-tasks')
const remainingTasks = document.querySelector('#remaining-tasks')
const mainInput = document.querySelector('#todo-form input')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
/*render all task in local storage */
if (localStorage.getItem('tasks')){
    tasks.map((task) => {
        createTask(task)
    })
}

todoList.addEventListener('keydown', (e) => {
    if (e.keyCode == 13){
        e.preventDefault()

        e.target.blur(  )
    }
})

// add task

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputValue = mainInput.value

    if (inputValue == ''){
        return
    }

    const task = {
        id:  new Date().getTime(),
        name : inputValue,
        isCompleted: false
    }

    console.log(task)

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    createTask(task)

    todoForm.reset()
    mainInput.focus()

})



todoList.addEventListener('click' , (e) => {
    if(e.target.classList.contains('remove-task') || e.target.parentElement.classList.contains('remove-task') || e.target.parentElement.parentElement.classList.contains('remove-task')){
        const taskId = e.target.closest('li').id

        removeTask(taskId)
    }
        
})

todoList.addEventListener('input' , (e) => {
    const taskId = e.target.closest('li').id

    updateTask(taskId, e.target)
})





function createTask(task) {
    const taskEl = document.createElement('li')       

    taskEl.setAttribute('id', task.id)

    if(task.isCompleted){
        taskEl.classList.add('completed')
    }

    const taskElMarkup =`
    <div>
        <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ?'checked' : '' }>
        <span ${!task.isCompleted ? "contenteditable" : ''}>${task.name}</span>
    </div>
    <button title="Remove the "${task.name}"task" class="remove-task">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
    </button>

    
`

taskEl.innerHTML = taskElMarkup

todoList.appendChild(taskEl)

countTasks()
}


function countTasks() {
    const completedTasksArray = tasks.filter((task) =>{
        task.isCompleted == true
})

    totalTasks.textContent = tasks.length
    completedTasks.textContent = completedTasksArray.length
    remainingTasks.textContent =  tasks.length - completedTasksArray.length
}

function removeTask(taskId) {
    tasks = tasks.filter((task)  => task.id !== parseInt(taskId))
    

    localStorage.setItem('tasks' , JSON.stringify(tasks))

    document.getElementById(taskId).remove()

    countTasks( )
}
// for checklist and update task
function updateTask(taskId, el) {
    const task  = tasks.find((task) => task.id == parseInt(taskId))

    if(el.hasAttribute('contenteditable')){
        task.name= el.textContent
    }else{
        const span =el.nextElementSibling
        const parent = el.closest('li')

        task.isCompleted = !task.isCompleted

        if(task.isCompleted){
            span.removeAttribute('contenteditable')
            parent.classList.add('completed')
        }else{
            span.removeAttribute('contenteditable', 'true')
            parent.classList.remove('completed')
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))

    countTasks()
}  

