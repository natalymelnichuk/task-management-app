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

let currentStatus = 'All';
let currentCategory = 'All';

function filterTasksByStatus(selectedStatus) {
    currentStatus = selectedStatus;
    renderTasks();
}

function filterTasksByCategory(selectedCategory) {
    currentCategory = selectedCategory;
    renderTasks();
}

function updateCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');

    const categories = [...new Set(tasks.map((task) => task.category))];

    categoryFilter.innerHTML = '<option value="All">All Categories</option>';

    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;

        if (category === currentCategory) {
            option.selected = true;
        }

        categoryFilter.appendChild(option);
    })
}


function renderTasks () {
    checkOverdue();

    const taskList = document.getElementById('task-list');

    taskList.innerHTML= '';

    // let filteredTasks = tasks;

    // if (currentStatus !== 'All') {
    //     filteredTasks = tasks.filter(task => task.status === currentStatus);
    // }

    // if (currentCategory !== 'All') {
    //     filteredTasks = tasks.filter(task => task.category === currentCategory);
    // }

    const filteredTasks = tasks.filter((task) => {
    const matchesStatus = (currentStatus === 'All' || task.status === currentStatus);
    const matchesCategory = (currentCategory === 'All' || task.category === currentCategory);

    return matchesStatus && matchesCategory;
});

    filteredTasks.forEach((task) => {
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

    updateCategoryFilter();

    renderTasks();

    taskForm.reset();
})




