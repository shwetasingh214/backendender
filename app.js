
const API_URL = "http://localhost:3000/tasks";

// ==========================================
// 1. CREATE TASK
// ==========================================

const taskForm = document.getElementById("taskForm");

if (taskForm) {
    taskForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("taskTitle").value.trim();
        const description = document.getElementById("taskDescription").value.trim();
        const status = document.getElementById("taskStatus").value;
        const priority = document.getElementById("taskPriority").value;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: status,
                    priority: priority
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Task could not be created");
            }

            alert("Task created successfully!");
            window.location.href = "dashboard.html";

        } catch (error) {
            console.error("Create task error:", error);
            alert("Error creating task. Check whether the backend server is running.");
        }
    });
}


// ==========================================
// 2. DASHBOARD - GET ALL TASKS
// ==========================================

const taskList = document.getElementById("taskList");

if (taskList) {
    loadTasks();
}

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        if (!response.ok) {
            throw new Error(tasks.message || "Tasks could not be fetched");
        }

        displayTasks(tasks);

    } catch (error) {
        console.error("Load tasks error:", error);
        alert("Error loading tasks. Check the backend and MySQL connection.");
    }
}


// ==========================================
// 3. DISPLAY TASKS AND UPDATE COUNTS
// ==========================================

function displayTasks(tasks) {
    if (!taskList) return;

    taskList.innerHTML = "";

    let open = 0;
    let inProgress = 0;
    let completed = 0;

    tasks.forEach(function (task) {
        if (task.status === "Open") open++;
        if (task.status === "In Progress") inProgress++;
        if (task.status === "Completed") completed++;

        const taskCard = document.createElement("div");
        taskCard.className = "task-card";

        const titleElement = document.createElement("h3");
        titleElement.textContent = task.title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = task.description || "";

        const statusElement = document.createElement("p");
        statusElement.textContent = "Status: " + task.status;

        const priorityElement = document.createElement("p");
        priorityElement.textContent = "Priority: " + task.priority;

        const editLink = document.createElement("a");
        editLink.href = `edit-task.html?id=${task.id}`;

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";

        editLink.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        taskCard.appendChild(titleElement);
        taskCard.appendChild(descriptionElement);
        taskCard.appendChild(statusElement);
        taskCard.appendChild(priorityElement);
        taskCard.appendChild(editLink);
        taskCard.appendChild(deleteButton);

        taskList.appendChild(taskCard);
    });

    const totalTasks = document.getElementById("totalTasks");
    const openTasks = document.getElementById("openTasks");
    const progressTasks = document.getElementById("progressTasks");
    const completedTasks = document.getElementById("completedTasks");

    if (totalTasks) totalTasks.textContent = tasks.length;
    if (openTasks) openTasks.textContent = open;
    if (progressTasks) progressTasks.textContent = inProgress;
    if (completedTasks) completedTasks.textContent = completed;
}


// ==========================================
// 4. DELETE TASK
// ==========================================

async function deleteTask(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Task could not be deleted");
        }

        alert("Task deleted successfully!");
        await loadTasks();

    } catch (error) {
        console.error("Delete task error:", error);
        alert("Error deleting task.");
    }
}


// ==========================================
// 5. EDIT TASK
// ==========================================

const editTaskForm = document.getElementById("editTaskForm");

if (editTaskForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("id");

    if (!taskId) {
        alert("Task ID not found.");
    } else {
        loadTaskForEdit(taskId);

        editTaskForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const title = document.getElementById("editTitle").value.trim();
            const description = document.getElementById("editDescription").value.trim();
            const status = document.getElementById("editStatus").value;
            const priority = document.getElementById("editPriority").value;

            try {
                const response = await fetch(`${API_URL}/${taskId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        status: status,
                        priority: priority
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Task could not be updated");
                }

                alert("Task updated successfully!");
                window.location.href = "dashboard.html";

            } catch (error) {
                console.error("Update task error:", error);
                alert("Error updating task.");
            }
        });
    }
}


// ==========================================
// 6. LOAD TASK DETAILS INTO EDIT FORM
// ==========================================

async function loadTaskForEdit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const task = await response.json();

        if (!response.ok) {
            throw new Error(task.message || "Task could not be fetched");
        }

        document.getElementById("editTitle").value = task.title || "";
        document.getElementById("editDescription").value = task.description || "";
        document.getElementById("editStatus").value = task.status || "Open";
        document.getElementById("editPriority").value = task.priority || "Medium";

    } catch (error) {
        console.error("Load task for edit error:", error);
        alert("Error loading task details.");
    }
}