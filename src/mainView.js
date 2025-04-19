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

function renderProjectTab(project) {
    const container = document.querySelector(".left-panel .projects");
    const projectTab = createTabButton(project.title);
    
    projectTab.dataset.projectId = project.id;
    container.insertBefore(projectTab, document.getElementById("add-project"));

    return projectTab;
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

function createTabButton(text){
    const tab = document.createElement("button");
    const tabImg = document.createElement("img");

    tab.className = "tab";
    tabImg.src = menuImg;
    tab.appendChild(tabImg);
    tab.innerHTML += text;
    tab.addEventListener("click", selectTabChange);

    return tab;
}

function renderProject(project) {
    const rightPanel = document.querySelector(".right-panel");
    const titleContainer = document.querySelector(".right-panel .title");
    const header = document.createElement("h2");

    clearRightPanel();
    header.textContent = project.title;
    
    titleContainer.appendChild(header);
}

function clearRightPanel(){
    const titleContainer = document.querySelector(".right-panel .title");
    const taskContainer = document.querySelector(".right-panel .list-tasks");
    
    titleContainer.innerHTML = "";
    taskContainer.innerHTML = "";
}

export {
    createTabButton,
    createNoButton,
    createYesButton,
    deleteParent,
    renderProjectTab,
    selectTabChange,
    loadButtonImages,
    renderProject
  };