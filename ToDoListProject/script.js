const taskForm = document.forms['task-form']
const dueTaskList = document.getElementById('due-task-list')
const upcomingTaskList = document.getElementById('upcoming-task-list')
const alertModal = document.getElementById('alert-modal')

const saveToLocalStorate = (task) => {
    let storedTasks = JSON.parse(localStorage.getItem('toDoTasks'))
    if (!storedTasks) {
        storedTasks = [task]
    } else {
        storedTasks.push(task)
    }
    localStorage.setItem('toDoTasks', JSON.stringify(storedTasks))
}

const createArticle = (task) => {
    let today = new Date();

    task.dateTime = new Date(task.dateTime)

    let articleElement = document.createElement('article')
    articleElement.id = task.dateTime.toISOString()

    // create date heading
    let dateElement = document.createElement('h3')
    dateElement.classList.add('date')
    dateElement.textContent = task.dateTime.getDate() === today.getDate() ? "Today" : task.dateTime.toLocaleDateString().split(',')[0];

    // create time element
    let timeElement = document.createElement('span');
    timeElement.classList.add('time')
    let hours = task.dateTime.getHours()
    let minutes = task.dateTime.getMinutes()
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12   //  0 should become 12
    timeElement.textContent = ` ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    // create content of the task 
    let content = document.createElement('p')
    content.classList.add('content')
    content.textContent = `${task.task} at`
    content.appendChild(timeElement)

    // add edit and delete buttons
    let editBtn = document.createElement('button')
    editBtn.classList.add('edit-btn')
    editBtn.innerHTML = "Edit"

    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML = "Delete"

    // add elements to article and article to dueTaskList
    articleElement.append(dateElement, content, editBtn, deleteBtn)

    if (task.dateTime.getDate() <= today.getDate()) {
        dueTaskList.appendChild(articleElement)
    } else {
        upcomingTaskList.appendChild(articleElement)
    }
}

const displayTasks = () => {
    let storedTasks = JSON.parse(localStorage.getItem('toDoTasks'))

    //clear existing task list
    dueTaskList.innerHTML = "<h2>Due Tasks</h2>"
    upcomingTaskList.innerHTML = "<h2>Upcoming Tasks</h2>"

    if (!storedTasks) {
        console.log("No tasks to display")
    } else {
        // sort tasks based on date created and display
        storedTasks = storedTasks.sort((a, b) => {
            let aDate = new Date(a.dateTime).getDate()
            let bDate = new Date(b.dateTime).getDate()

            if (aDate < bDate) return -1
            else if (aDate > bDate) return 1
            else return 0
        })

        storedTasks.forEach(task => {
            createArticle(task)
        });
    }
}

// handle add new task 
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let task = taskForm.elements['task'].value;
    let date = taskForm.elements['date'].value;
    let time = taskForm.elements['time'].value;

    if(task === "" || date === "" || time === "") {
        alertModal.showModal()
        return 
    }

    let formatedDate = new Date(...date.split('-').map(x => Number(x)), ...time.split(':').map(x => Number(x)));

    taskForm.reset();


    let taskObj = { task, dateTime: formatedDate.toISOString() }
    saveToLocalStorate(taskObj);

    displayTasks();
})

// localStorage.clear();
displayTasks();

const findTaskIndex = (taskList, date) => {

    for (let idx = 0; idx < taskList.length; idx++) {
        if (taskList[idx].dateTime === date) {
            return idx
        }
    }
    return -1
}

const handleDeleteTask = (date) => {
    const storedTasks = JSON.parse(localStorage.getItem('toDoTasks'))

    let idxToDelete = findTaskIndex(storedTasks, date)
    storedTasks.splice(idxToDelete, 1)

    localStorage.setItem('toDoTasks', JSON.stringify(storedTasks))

    displayTasks();
}

const editForm = document.forms['edit-form']
const editModal = document.getElementById('edit-modal')

const showEditModal = (date) => {
    const storedTasks = JSON.parse(localStorage.getItem('toDoTasks'))

    let taskIdx = findTaskIndex(storedTasks, date)
    let taskToUpdate = storedTasks[taskIdx]
    editForm.date = date;
    editForm.elements['task-field'].value = taskToUpdate.task
    editForm.elements['date-field'].value = taskToUpdate.dateTime.slice(0, 10);
    editForm.elements['time-field'].value = taskToUpdate.dateTime.slice(11, 16);

    editModal.showModal()
}

// handle delete and edit task modal
document.querySelector('#main').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        handleDeleteTask(e.target.parentNode.id)
    }

    else if (e.target.classList.contains('edit-btn')) {
        showEditModal(e.target.parentNode.id)
    }
})

// handle close modal
const closeModal = document.getElementById('close-modal')
closeModal.addEventListener('click', () => {
    editModal.close();
})

// handle edit form submit

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const storedTasks = JSON.parse(localStorage.getItem('toDoTasks'))

    const idxToEdit = findTaskIndex(storedTasks, editForm.date);

    let newTask = editForm.elements['task-field'].value
    let newDate = editForm.elements['date-field'].value
    let newTime = editForm.elements['time-field'].value

    let formatedDate = new Date(...newDate.split('-').map(x => Number(x)), ...newTime.split(':').map(x => Number(x)));

    let newTaskObj = { task: newTask, dateTime: formatedDate.toISOString() }

    storedTasks[idxToEdit] = newTaskObj;

    // sync with local storage
    localStorage.setItem('toDoTasks', JSON.stringify(storedTasks))

    displayTasks();

    editForm.reset();
    editModal.close();
})


// implement debounced search 
const debounce = (duration, callback) => {
    let timer;
    return (...items) => {
        clearTimeout(timer)

        timer = setTimeout(() => {
            callback(...items)
        }, (duration));
    }
}

const handleSearch = (query) => {
    const storedTasks = JSON.parse(localStorage.getItem("toDoTasks"));
    let filteredTasks = storedTasks.filter(item => item.task.toLowerCase().includes(query.toLowerCase()))

    //clear existing task list
    dueTaskList.innerHTML = "<h2>Due Tasks</h2>"
    upcomingTaskList.innerHTML = "<h2>Upcoming Tasks</h2>"

    // show filtered tasks
    filteredTasks = filteredTasks.sort((a, b) => {
        let aDate = new Date(a.dateTime).getDate()
        let bDate = new Date(b.dateTime).getDate()

        if (aDate < bDate) return -1
        else if (aDate > bDate) return 1
        else return 0
    })

    filteredTasks.forEach(task => {
        createArticle(task)
    });
}


const debouncedSearch = debounce(500, handleSearch)

const searchField = document.getElementById('search-field')
searchField.addEventListener('input', () => {
    let searchVal = searchField.value

    debouncedSearch(searchVal)
})

const alertModalClose = document.getElementById('alert-close-btn')

alertModalClose.addEventListener('click', ()=> {
    alertModal.close()
})