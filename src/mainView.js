import alltasksImg from './assets/allTasks.png';
import todayImg from './assets/today.png';
import weekImg from './assets/week.png';
import starImg from './assets/star.png';
import menuImg from './assets/menu.png';

function loadButtonImages() {
    const allTask = document.getElementById("all-tasks-img");
    const today = document.getElementById("today-img");
    const nextWeek = document.getElementById("next-week-img");
    const important = document.getElementById("important-img");
    const projects = document.querySelectorAll(".project-img");
    const menu = document.querySelector("button.menu");

    allTask.src = alltasksImg;
    today.src = todayImg;
    nextWeek.src = weekImg;
    important.src = starImg;
    menu.style.backgroundImage = menuImg;
    projects.forEach(project => project.src = menuImg);
}


function selectTabChange(event) {
    const prevSelectedTabButton = document.querySelector(".selected-tab");
    prevSelectedTabButton.className = "tab";
    event.target.className = "selected-tab";
}

function addProjectClick(event) {
    const container = document.querySelector(".left-panel .projects");
    const project = createTabButton();
    const projectNameInput = document.createElement("input");
    const buttonAdd = createYesButton("Add");
    const buttonCancel = createNoButton("Cancel");

    projectNameInput.placeholder = "Enter Project Name";
    buttonCancel.addEventListener("click", deleteParent);

    project.appendChild(projectNameInput, buttonAdd, buttonCancel);
    container.insertBefore(project, event.target)
}

function deleteParent(event){
    event.target.parentElement.remove();
}


function createYesButton(text)
{
    const button = document.createElement("button");

    button.className = "yes";

    return button;
}

function createNoButton()
{
    const button = document.createElement("button");

    button.className = "no";

    return button;
}

function createTabButton(){
    const tab = document.createElement("button");
    const tabImg = document.createElement("img");

    tab.className = "tab";
    tabImg.src = menuImg;

    tab.appendChild(tabImg);
    tab.addEventListener("click", selectTabChange);

    return tab;
}

export {
    createTabButton,
    createNoButton,
    createYesButton,
    deleteParent,
    addProjectClick,
    selectTabChange,
    loadButtonImages
  };