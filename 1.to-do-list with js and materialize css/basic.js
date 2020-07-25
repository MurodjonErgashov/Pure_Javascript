// Define ui vars
const form = document.querySelector("#task-form");
const taskListUL = document.querySelector("ul.collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListeners();

// load all event listener
function loadEventListeners() {
  // Dom Load Event listener
  document.addEventListener("DOMContentLoaded", getTasks);

  //Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskListUL.addEventListener("click", removeTask);
  // Clear Btn
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);

  // Get Tasks
  function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
      //Create li elements
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));

      // Create link
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = `<i class="fa fa-remove"></i>`;
      li.appendChild(link);
      //
      taskListUL.appendChild(li);
    });
  }

  // Add Task
  function addTask(e) {
    if (taskInput.value === "") {
      alert("Add a task");
    }
    //Create li elements
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    // Create link
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    li.appendChild(link);
    //
    taskListUL.appendChild(li);

    // Store Task to lockalstrage
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
    e.preventDefault();
  }
  // store Tasks
  function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // remove task
  function removeTask(e) {
    if (e.target.parentElement.className === "delete-item secondary-content") {
      if (confirm("Are you sure")) {
        e.target.parentElement.parentElement.remove();

        // Remove from localstorage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    }

    e.preventDefault();
  }

  // Remove from localstorage
  function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function (task, index) {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  // clear Tasks
  function clearTasks(e) {
    // taskListUL.innerHTML = "";
    while (taskListUL.firstChild) {
      taskListUL.removeChild(taskListUL.firstChild);
    }
    // Clear task
    clearTaskFromLocalStorage();
    e.preventDefault();
  }

  // Clear local storage
  function clearTaskFromLocalStorage() {
    localStorage.clear();
  }

  // filter Tasks
  function filterTasks(e) {
    const text = e.target.value.toLowerCase(); //inputga berilgan

    document.querySelectorAll(".collection-item").forEach(function (task) {
      const item = task.firstChild.textContent; //bu yerda lilarni ikkita childi bor
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  }
}
