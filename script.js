class Task {
    constructor(name, category, deadline, status = 'In progress') {
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

function renderTasks() {
    const taskList = document.getElementById('task-list');

    taskList.innerHTML= '';

    tasks.forEach((task) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${task.name}</td>
        <td>${task.category}</td>
        <td>${dateFormat(task.deadline)}</td>
        <td>${task.status}</td>
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
