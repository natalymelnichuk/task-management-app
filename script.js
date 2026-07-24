class Task {
    constructor(name, category, deadline, status = 'In Progress') {
        this.id = Date.now();
        this.name = name;
        this.category = category;
        this.deadline = deadline;
        this.status = status;
    }
}

const tasks = [];

const dateFormat = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toDateString();
}

function checkOverdue () {
    const today = new Date();

    tasks.forEach((task) => {
        const taskDeadline = new Date(task.deadline);

        if (today > taskDeadline && task.status !== 'Completed') {
            task.status = 'Overdue';
        }
    })
}

function updateStatus (taskId, newStatus) {
    const task = tasks.find((item) => item.id === Number(taskId));

    if (task) {
        task.status = newStatus;
    }

    renderTasks();
}

function renderTasks () {
    checkOverdue();

    const taskList = document.getElementById('task-list');

    taskList.innerHTML= '';

    tasks.forEach((task) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${task.name}</td>
        <td>${task.category}</td>
        <td>${dateFormat(task.deadline)}</td>
        <td>
            <select onchange="updateStatus(${task.id}, this.value)">
                <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                <option value="Overdue" ${task.status === 'Overdue' ? 'selected' : ''}>Overdue</option>
            </select>
        </td>
        `;

        taskList.appendChild(tr);
    })

}

const taskForm = document.getElementById('task-form');

taskForm.addEventListener("submit", (i) => {
    i.preventDefault();

    const name = document.getElementById('task-name').value;
    const category = document.getElementById('task-category').value;
    const deadline = document.getElementById('task-deadline').value;
    const status = document.getElementById('task-status').value;

    const newTask = new Task(name, category, deadline, status);

    tasks.push(newTask);

    renderTasks();

    taskForm.reset();
})

