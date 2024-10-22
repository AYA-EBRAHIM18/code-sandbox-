let task = document.querySelector(".task");
let addBtn = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let taskCon = window.sessionStorage.getItem("tasks")
  ? JSON.parse(window.sessionStorage.getItem("tasks"))
  : [];

// Function to display tasks
let displayTasks = function (arr) {
  tasks.innerHTML = ""; // Clear the task container
  arr.forEach((task, index) => {
    let div = document.createElement("div");
    div.style =
      "display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;";

    let ele = document.createElement("p");
    let delBtn = document.createElement("button");

    delBtn.textContent = "Delete";
    delBtn.style = "margin-left:10px;";

    ele.textContent = task; // Set task text
    div.appendChild(ele);
    div.appendChild(delBtn);

    // Use a data attribute to store the task index
    delBtn.setAttribute("data-index", index);

    // Delete task when delete button is clicked
    delBtn.addEventListener("click", (e) => {
      let taskIndex = e.target.getAttribute("data-index");
      taskCon.splice(taskIndex, 1); // Remove task from array
      window.sessionStorage.setItem("tasks", JSON.stringify(taskCon)); // Update sessionStorage
      displayTasks(taskCon); // Refresh task list
    });

    tasks.appendChild(div); // Add task to DOM
  });
};

// Add task button click event
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (task.value.trim() !== "") {
    // Prevent adding empty tasks
    taskCon.push(task.value); // Add new task to array
    window.sessionStorage.setItem("tasks", JSON.stringify(taskCon)); // Update sessionStorage
    displayTasks(taskCon); // Refresh task list
    task.value = ""; // Clear input field
  }
});

// Initial display of tasks
displayTasks(taskCon);
