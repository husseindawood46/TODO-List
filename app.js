const inputTask = document.getElementById("task");
const inputTime = document.getElementById("time");
const add = document.getElementById("add");
const error = document.getElementById("error");
let display = document.getElementById("display");
let search = document.getElementById("search");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingIndex = -1;

function displayTasks(filteredTasks = tasks) {
  display.innerHTML = filteredTasks
    .map((task, index) => {
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${task.task}</td>
          <td>${task.time}</td>
          <td class='text-center'>
            <i class="fa-solid fa-trash fa-lg text-primary" onclick="deleteTask(${index})"></i>
          </td>
          <td class='text-center'>
            <i class="fa-solid fa-pen-to-square fa-lg text-warning" onclick="editTask(${index})"></i>
          </td>
        </tr>
      `;
    })
    .join("");
  saveToLocalStorage();
}

add.addEventListener("click", (e) => {
  e.preventDefault();

  const taskV = inputTask.value.trim();
  const timeV = inputTime.value.trim();

  if (!taskV || !timeV) {
    error.style.display = "block";
    return;
  }

  error.style.display = "none";

  if (editingIndex === -1) {
    let task = {
      task: taskV,
      time: timeV,
    };
    tasks.push(task);
  } else {
    tasks[editingIndex] = { task: taskV, time: timeV };
    editingIndex = -1;
    add.textContent = "Add Task";
  }

  displayTasks();
  Clear();
});

function Clear() {
  inputTask.value = "";
  inputTime.value = "";
  error.style.display = "none";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function editTask(index) {
  inputTask.value = tasks[index].task;
  inputTime.value = tasks[index].time;
  editingIndex = index;
  add.textContent = "Update Task";
}

function searchTask() {
  let term = search.value.trim().toLowerCase();
  let filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(term)
  );

  displayTasks(filteredTasks);
}

search.addEventListener("keyup", searchTask);

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks();
