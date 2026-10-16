// CREATE TASK
// =========================

// Get the task form
const api_url="http://localhost:3000/tasks";


const taskForm =
    document.getElementById("taskForm");


// Check if task form exists
if (taskForm) {

    taskForm.addEventListener("submit", function(event) {
        // taskForm.addEventListener(SubmitEvent,function(event))
         // stop from page refresh
         async function(event){
            event.preventDefault();}
            // get values from table
        const title =
            document.getElementById("taskTitle").value;

        const description =
            document.getElementById("taskDescription").value;

        const status =
            document.getElementById("taskStatus").value;

        const priority =
            document.getElementById("taskPriority").value;
            

            


            //

        // Create task object
        // const task = {

        //     id: Date.now(),

        //     title: title,

        //     description: description,

        //     status: status,

        //     priority: priority

        // };//



        // Get old tasks from localStorage
        let tasks =
            JSON.parse(localStorage.getItem("tasks")) || [];
//


        // Add new task
        tasks.push(task);



        // Save tasks in localStorage
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );


        // Go back to dashboard
        window.location.href =
            "dashboard.html";

    });

}


// =========================
// DASHBOARD
// =========================

// Get task list container
const taskList =
    document.getElementById("taskList");


// If task list exists, we are on dashboard
if (taskList) {

    displayTasks();

}


// =========================
// DISPLAY TASKS
// =========================

function displayTasks() {

    // Get tasks from localStorage
    const tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];


    // Clear old task list
    taskList.innerHTML = "";


    // If no tasks
    if (tasks.length === 0) {

        taskList.textContent =
            "No tasks available.";

        updateDashboardCounts(tasks);

        return;
    }


    // Display every task
    tasks.forEach(function(task) {


        // Create task card
        const taskCard =
            document.createElement("div");

        taskCard.className =
            "task-card";


        // =========================
        // TASK INFORMATION
        // =========================

        const taskContent =
            document.createElement("div");


        // Title
        const title =
            document.createElement("h3");

        title.textContent =
            task.title;


        // Description
        const description =
            document.createElement("p");

        description.textContent =
            task.description;


        taskContent.appendChild(title);

        taskContent.appendChild(description);


        // =========================
        // STATUS AND PRIORITY
        // =========================

        const taskInfo =
            document.createElement("div");

        taskInfo.className =
            "task-info";


        // Status
        const status =
            document.createElement("span");

        status.className =
            "status";

        status.textContent =
            task.status;


        // Priority
        const priority =
            document.createElement("span");

        priority.className =
            "priority";

        priority.textContent =
            task.priority;


        // Add status and priority
        taskInfo.appendChild(status);

        taskInfo.appendChild(priority);


        // =========================
        // EDIT BUTTON
        // =========================

        const editButton =
            document.createElement("button");

        editButton.textContent =
            "Edit";

        editButton.className =
            "edit-btn";


        editButton.addEventListener(
            "click",
            function() {

                window.location.href =
                    "edit-task.html?id=" + task.id;

            }
        );


        // Add Edit button
        taskInfo.appendChild(editButton);


        // =========================
        // DELETE BUTTON
        // =========================

        const deleteButton =
            document.createElement("button");


        // Button text
        deleteButton.textContent =
            "Delete";


        // CSS class
        deleteButton.className =
            "delete-btn";


        // When button is clicked
        deleteButton.addEventListener(
            "click",
            function() {

                deleteTask(task.id);

            }
        );


        // Add Delete button
        taskInfo.appendChild(deleteButton);


        // =========================
        // ADD EVERYTHING TO CARD
        // =========================

        taskCard.appendChild(taskContent);

        taskCard.appendChild(taskInfo);


        // Add task card to dashboard
        taskList.appendChild(taskCard);

    });


    // Update dashboard counts
    updateDashboardCounts(tasks);

}


// =========================
// DASHBOARD COUNTS
// =========================

function updateDashboardCounts(tasks) {


    // Total tasks
    const totalTasks =
        document.getElementById("totalTasks");


    // Open tasks
    const openTasks =
        document.getElementById("openTasks");


    // In Progress tasks
    const progressTasks =
        document.getElementById("progressTasks");


    // Completed tasks
    const completedTasks =
        document.getElementById("completedTasks");


    // Count tasks
    let open = 0;

    let progress = 0;

    let completed = 0;


    tasks.forEach(function(task) {


        if (task.status === "Open") {

            open++;

        }


        if (task.status === "In Progress") {

            progress++;

        }


        if (task.status === "Completed") {

            completed++;

        }

    });


    // Show counts
    totalTasks.textContent =
        tasks.length;

    openTasks.textContent =
        open;

    progressTasks.textContent =
        progress;

    completedTasks.textContent =
        completed;

}


// =========================
// DELETE TASK
// =========================

function deleteTask(id) {


    // Get tasks from localStorage
    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];


    // Remove selected task
    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    // Save updated tasks
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    // Display updated tasks
    displayTasks();

}


// =========================
// EDIT TASK PAGE
// =========================

const editTaskForm =
    document.getElementById("editTaskForm");


if (editTaskForm) {


    // Get ID from URL
    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const taskId =
        Number(
            urlParams.get("id")
        );


    // Get tasks from localStorage
    const tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    // Find selected task
    const task =
        tasks.find(function(task) {

            return task.id === taskId;

        });


    // If task is found
    if (task) {


        document.getElementById("editTitle").value =
            task.title;


        document.getElementById("editDescription").value =
            task.description;


        document.getElementById("editStatus").value =
            task.status;


        document.getElementById("editPriority").value =
            task.priority;

    }


    // =========================
    // SAVE EDITED TASK
    // =========================

    editTaskForm.addEventListener(
        "submit",
        function(event) {


            // Stop page refresh
            event.preventDefault();


            // Get updated values
            const updatedTitle =
                document.getElementById("editTitle").value;


            const updatedDescription =
                document.getElementById(
                    "editDescription"
                ).value;


            const updatedStatus =
                document.getElementById(
                    "editStatus"
                ).value;


            const updatedPriority =
                document.getElementById(
                    "editPriority"
                ).value;


            // Update selected task
            tasks.forEach(function(task) {


                if (task.id === taskId) {


                    task.title =
                        updatedTitle;


                    task.description =
                        updatedDescription;


                    task.status =
                        updatedStatus;


                    task.priority =
                        updatedPriority;

                }

            });


            // Save updated tasks
            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );


            // Go back to dashboard
            window.location.href =
                "dashboard.html";

        }
    );

}