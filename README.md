# Task Management Application

A dynamic, front-end Task Management web application built with vanilla JavaScript, HTML5, and CSS3. 
The application helps users organize, track, and filter their daily tasks efficiently.

## How It Works

1. Adding Tasks: Users can create tasks by entering a task name, category, deadline date, and initial status via the task form.
2. Managing Statuses: Each task includes a status dropdown (`In Progress`, `Completed`, `Overdue`). Changing a task's status immediately updates its state across the application.
3. Automatic Overdue Tracking: The app compares task deadlines against the current date upon rendering. Any non-completed task past its deadline is automatically set to `Overdue`.
4. Combined Filtering: Users can filter tasks by status and by category using the filter controls above the table.
5. Data Persistence: Tasks are synchronized with the browser's `localStorage` whenever tasks are added, updated, or removed, ensuring data persists across page refreshes.

## Additional Features Implemented

- Dynamic Category Generator: Instead of hardcoded categories, the category filter automatically detects unique categories typed by the user and populates the filter dropdown dynamically.
- Task Deletion with Confirmation: Users can delete individual tasks with an extra safety layer — a browser `confirm()` modal prompts for user confirmation before removing data.

## Reflection

Working on this project was a great hands-on experience with core JavaScript. One challenge was making sure both filters (status and category) worked together without breaking each other. 
I solved this by combining both checks into a single `filter()` method using `&&`. Another tricky part was keeping the dynamic category list updated when tasks were added or deleted, which 
I solved using `Set` to handle unique values.
If I had more time, I would improve the design by replacing the default browser confirm popups with custom modal windows, add an "Edit Task" option, and allow sorting tasks by deadline.
Additionally, I would like to add a button to switch dark/light mode.
