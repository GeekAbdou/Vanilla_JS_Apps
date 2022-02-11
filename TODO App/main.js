//Selectors
const form = document.querySelector("#form");
const todoInput = document.querySelector("#todoInput");
const allTasks = document.querySelector("#allTasks");
const filters = document.querySelectorAll(".nav-item");

let tasksList = [];

//preview tasks
const previewTasks = function (tasksList) {
  allTasks.innerHTML = "";
  if (tasksList.length > 0) {
    tasksList.forEach((task) => {
      let liTag = `<li class="list-group-item d-flex justify-content-between">
                            <span>${task.name}</span>
                            <span>
                                <a href="#"><i class="bi bi-check2-circle text-success"></i></a>
                                <a href="#"><i class="bi bi-pencil-square text-primary"></i></a>
                                <a href="#"><i class="bi bi-x-circle text-danger"></i></a>
                            </span>
                        </li>`;
      allTasks.insertAdjacentHTML("beforeend", liTag);
    });
  } else {
  }
};

//set Tasks in local
const setLocalStorage = function (tasksList) {
  localStorage.setItem("tasksList", JSON.stringify(tasksList)); //
};

//get Tasks From Local
const getLocalStorage = function () {
  const tasksInStorage = localStorage.getItem("tasksList");
  if (tasksInStorage === "undefined" || tasksInStorage === null) {
    tasksList = [];
  } else {
    tasksList = JSON.parse(tasksInStorage);
  }
  previewTasks(tasksList);
  console.log(tasksList);
};

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = todoInput.value.trim();
    if (newTask.length === 0) {
      alert("Cannot be Empty!");
    } else {
      const newTodo = {
        name: newTask,
        isDone: false,
      };
      tasksList.push(newTodo);
      setLocalStorage(tasksList);
    }
    getLocalStorage()
    console.log(tasksList);
  });
  getLocalStorage();
});
