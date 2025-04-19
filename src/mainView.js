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


function renderProjectTab(project) {
    const container = document.querySelector(".left-panel .projects");
    let projectTab = document.querySelector(`[data-project-id="${project.id}"]`)

    if (projectTab) {
        const img = projectTab.querySelector("img");

        projectTab.textContent = project.title;
        projectTab.prepend(img);
    }

    return projectTab;
}

function createProjectTab(project) {
    const container = document.querySelector(".left-panel .projects");
    const projectTab = createTabButton(project.title);

    projectTab.classList.add("project-tab");
    projectTab.dataset.projectId = project.id;
    container.insertBefore(projectTab, document.getElementById("add-project"));

    return projectTab
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

    return tab;
}

function renderProject(project) {
    const rightPanel = document.querySelector(".right-panel");
    const titleContainer = document.querySelector(".right-panel .title");
    const projectHeader = document.createElement("h2");
    const projectDescription = document.createElement("p");

    clearRightPanel();
    projectHeader.textContent = project.title;
    projectHeader.classList.add("project-title");

    projectDescription.textContent = project.description;
    projectDescription.classList.add("project-description");
    
    titleContainer.append(projectHeader, projectDescription);

    renderProjectTab(project);

    return {projectHeader, projectDescription};
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
    loadButtonImages,
    renderProject,
    createProjectTab
  };