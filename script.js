//first segment
let input = document.querySelector("input");
const emptyTXT = document.querySelector("p");
//buttons
const submitBtn = document.querySelector("button.add");
const completeBtn = document.querySelector("button.check");
const editBtn = document.querySelector("button.edit");
const deleteBtn = document.querySelector("button.delete");
//second segment - tasks
let newTask; //variable for new 'li' / tasks
let taskTXT;
const taskList = document.querySelector("ul.tasks");
const emptyList = document.querySelector("p.empty");
//pop up window
const popUpWindow = document.querySelector("div.pop");
const doneBtn = document.querySelector("button.second");
const inputPopUp = document.querySelector(".pop input");
const closeWindow = document.querySelector(".pop .fa-x");
const backdrop = document.querySelector(".backdrop");
let emptyPopUpTXT = document.querySelector(".warning");
let thisTask; //variable that will store exact e.target of editBtn

const firstCheck = () => {
  if (emptyList.nextElementSibling == null) {
    emptyList.textContent = "The task list is empty!";
  } else {
    emptyList.textContent = "";
  }
};
const enterCheck = (e) => {
  if (e.key === "Enter") {
    addTaskToList();
  }
};
const enterCheck2 = (e) => {
  if (e.key === "Enter") {
    acceptChange();
  }
};

const addTaskToList = () => {
  taskTXT = input.value;
  emptyTXT.textContent = ""; //clean 'enter the task...'
  emptyList.textContent = "";

  if (taskTXT !== "") {
    //create the element/task
    newTask = document.createElement("li");
    const paragraph2 = document.createElement("p");
    const tools2 = document.createElement("div");
    const completeBtn2 = document.createElement("button");
    const editBtn2 = document.createElement("button");
    const deleteBtn2 = document.createElement("button");

    taskList.appendChild(newTask); //adding all the elements to the list
    newTask.append(paragraph2, tools2);
    tools2.append(completeBtn2, editBtn2, deleteBtn2);

    newTask.classList.add("task"); //adding classes css
    tools2.classList.add("tools");

    completeBtn2.innerHTML = `<i class="fa-solid fa-check"></i>`; //task icons
    editBtn2.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    deleteBtn2.innerHTML = `<i class="fa-solid fa-x"></i>`;

    paragraph2.textContent = taskTXT;

    //listeners for newly created buttons
    completeBtn2.addEventListener("click", complete);
    deleteBtn2.addEventListener("click", deleteTask);
    editBtn2.addEventListener("click", editTask);
  } else {
    emptyTXT.textContent = `Enter the task first!`; //if no task was typed and there is an add attempt
  }

  input.value = ""; //input cleaner after adding the task
};

const complete = (e) => {
  e.target.closest("div").previousElementSibling.classList.toggle("done");
};

const deleteTask = (e) => {
  e.target.closest("li").remove();
};

const editTask = (e) => {
  popUpWindow.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  inputPopUp.value =
    e.target.closest(".tools").previousElementSibling.textContent; //task TXT before edit
  thisTask = e;
};

const acceptChange = () => {
  emptyPopUpTXT.textContent = "";
  if (inputPopUp.value == "") {
    emptyPopUpTXT.textContent = "Can't save an empty task!";
  } else {
    thisTask.target.closest(".tools").previousElementSibling.textContent =
      inputPopUp.value;
    popUpWindow.classList.add("hidden");
    backdrop.classList.add("hidden");
  }
};

const closePopWindow = () => {
  popUpWindow.classList.add("hidden");
  backdrop.classList.add("hidden");
  emptyPopUpTXT.textContent = "";
};

document.body.addEventListener("click", firstCheck);
input.addEventListener("keypress", enterCheck);
inputPopUp.addEventListener("keypress", enterCheck2);

//listeners for already existing buttons
submitBtn.addEventListener("click", addTaskToList);
completeBtn.addEventListener("click", complete);
deleteBtn.addEventListener("click", deleteTask);
editBtn.addEventListener("click", editTask);
doneBtn.addEventListener("click", acceptChange);
closeWindow.addEventListener("click", closePopWindow);
