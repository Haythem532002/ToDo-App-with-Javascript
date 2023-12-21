let input = document.querySelector(`[type=${"text"}]`);
let btn = document.querySelector(`[type=${"submit"}]`);
let tasks = document.querySelector(".tasks");

// Function to load and display tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const taskList = savedTasks.split(',').map(task => {
            const [id, title] = task.split(':');
            return { id, title };
        });
        taskList.forEach(task => {
            createTaskElement(task.title);
        });
    }
}

// Function to create a new task element
function createTaskElement(title) {
    let div = document.createElement("div");
    div.className = "task";
    div.style.cssText = "background-color:white; display:flex;justify-content:space-between; align-items:center; padding:10px; border-radius:15px; margin-bottom:20px "
    let taskname = document.createElement("h1");
    taskname.style.cssText = "margin:0px; font-weight:normal; font-size:22px; ";
    taskname.textContent = title;
    let del = document.createElement("input");
    del.style.cssText = "padding:5px; background-color:#FF1A00; color:white; border:none; border-radius:10px";
    del.setAttribute("type", "submit");
    del.setAttribute("value", "Delete");
    div.append(taskname, del);
    tasks.appendChild(div);
    del.onclick = function () {
        this.parentNode.remove();
        // Remove the task from localStorage when deleted
        removeTaskFromLocalStorage(title);
    };
}

// Function to remove a task from localStorage
function removeTaskFromLocalStorage(title) {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const taskList = savedTasks.split(',').map(task => {
            const [id, taskTitle] = task.split(':');
            return { id, title: taskTitle };
        });
        const updatedTasks = taskList.filter(task => task.title !== title);
        const updatedTaskString = updatedTasks.map(task => `${task.id}:${task.title}`).join(',');
        localStorage.setItem("tasks", updatedTaskString);
    }
}
// Load and display tasks when the page loads
loadTasks();

btn.onclick = function () {
    let taskName = input.value.trim();
    if (taskName !== "") {
        createTaskElement(taskName);
        // Add the task to localStorage
        addTaskToLocalStorage(taskName);
        input.value = "";
    }
};
// Function to add a task to localStorage
function addTaskToLocalStorage(title) {
    const savedTasks = localStorage.getItem("tasks") || "";
    const taskId = Date.now(); // Unique identifier
    const updatedTaskString = savedTasks === "" ? `${taskId}:${title}` : `${savedTasks},${taskId}:${title}`;
    localStorage.setItem("tasks", updatedTaskString);
}