//Selectors
const form = document.querySelector("#form");
const todoInput = document.querySelector("#todoInput");
const allTasks = document.querySelector("#allTasks");
const filters = document.querySelectorAll(".nav-item");
const alertDiv = document.querySelector("#message");

let tasksList = [];

//Alert message
const alertMessage = function (message, className) {
  alertDiv.innerHTML = message;
  alertDiv.classList.add(className, "show", "transition");
  setTimeout(() => {
    alertDiv.classList.remove("show", "alert-danger", "alert-success");
    alertDiv.innerHTML = "";
  }, 2000);
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

//preview tasks
const previewTasks = function (tasksList) {
  allTasks.innerHTML = "";

  if (tasksList.length > 0) {
    tasksList.forEach((task) => {
      const iconClass = tasksList.isDone
        ? "bi-check-circle-fill"
        : "bi-check-circle";

      let liTag = `<li class="list-group-item d-flex justify-content-between">
                              <span class="title" data-time=${task.addedAt}>${task.name}</span>
                              <span>
                                  <a href="#" data-done><i class="bi ${iconClass} text-success"></i></a>
                                  <a href="#" data-edit><i class="bi bi-pencil-square text-primary"></i></a>
                                  <a href="#" data-delete><i class="bi bi-x-circle text-danger"></i></a>
                              </span>
                          </li>`;
      allTasks.insertAdjacentHTML("beforeend", liTag);
      handleItem(task);
    });
  } else {
  }
};

//events on action buttons
const handleItem = function (itemData) {
  const items = document.querySelectorAll(".list-group-item");

  items.forEach((item) => {
    //done
    if (
      item.querySelector(".title").getAttribute("data-time") == itemData.addedAt //get the task by id(Date Added)
    ) {
      item.querySelector("[data-done]").addEventListener("click", function (e) {
        e.preventDefault();

        const itemIndex = tasksList.indexOf(itemData);
        const currentItem = tasksList[itemIndex];

        const currentClass = currentItem.isDone
          ? "bi-check-circle-fill"
          : "bi-check-circle";

        currentItem.isDone = currentItem.isDone ? false : true;
        tasksList.splice(itemIndex, 1, currentItem);
        setLocalStorage(tasksList);

        const iconClass = currentItem.isDone
          ? "bi-check-circle-fill"
          : "bi-check-circle";

        this.firstElementChild.classList.replace(currentClass, iconClass);
        const filterType = document.querySelector("#tabValue").value;
        //getItemsFilter(filterType);
      });

      //edit
      item.querySelector("[data-edit]").addEventListener("click", function (e) {
        e.preventDefault();
        todoInput.value = itemData.name;
        document.querySelector("#objIndex").value = tasksList.indexOf(itemData);
      });
    }
  });
};

//update function
const updateITask = function (currentItemIndex, value) {
  const newItem = tasksList[currentItemIndex];
  newItem.name = value;
  tasksList.splice(currentItemIndex, 1, tasksList);
  setLocalStorage(tasksList);
};

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = todoInput.value.trim();
    if (newTask.length === 0) {
      alertMessage("Cannot be Empty", "alert-danger");
    } else {
      const currentItemIndex = document.querySelector("#objIndex").value; //for editing tasks
      if (currentItemIndex) {
        //update
        updateITask(currentItemIndex, newTask);
        document.querySelector("#objIndex").value = "";
        alertMessage("Task has been updated", "alert-success");
      } else {
        const newTodo = {
          addedAt: new Date().getTime(), //works as is for the task
          name: newTask,
          isDone: false,
        };
        tasksList.push(newTodo);
        setLocalStorage(tasksList);
        alertMessage("New Task added Successfully", "alert-success");
      }
    }
    getLocalStorage();
    console.log(tasksList);
  });
  getLocalStorage();
});
