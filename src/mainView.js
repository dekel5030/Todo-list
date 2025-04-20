import alltasksImg from './assets/allTasks.png';
import todayImg from './assets/today.png';
import weekImg from './assets/week.png';
import starImg from './assets/star.png';
import menuImg from './assets/menu.png';
import addImg from './assets/add.png';

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
    const taskListContainer = rightPanel.querySelector(".tasks-list-container");
    const taskList = taskListContainer.querySelector("ul");
    const existingAddButton = taskListContainer.querySelector(".add-task-button");
    let addTaskButton;

    clearRightPanel();
    projectHeader.textContent = project.title;
    projectHeader.classList.add("project-title");

    projectDescription.textContent = project.description;
    projectDescription.classList.add("project-description");
    
    titleContainer.append(projectHeader, projectDescription);

    if (!existingAddButton)
    {
        addTaskButton = createAddTaskButton(project);
        taskListContainer.append(addTaskButton);
    }

    project.tasks.forEach(task => {
        const taskButton = createTaskButton(task);

        taskList.append(taskButton);
    });

    renderProjectTab(project);

    return {projectHeader, projectDescription, addTaskButton};
}

function createAddTaskButton(project) {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = addImg;
    button.appendChild(img);
    button.innerHTML += "Add Task";
    button.classList.add("add-task");
    button.dataset.projectId = project.id;

    return button;
}

function createTaskButton(task){
    const listItem = document.createElement("li");
    const divCheckIcon = createCompleteCheckBox(task);
    const divTaskDetails = document.createElement("div");
    const divTaskTitle = document.createElement("div");
    const divTaskDescription = document.createElement("div");
    const divtaskDueDate = document.createElement("div");
    const starCheckbox = createTaskStarCheckBox(task);
    const divRightButtons = document.createElement("div");

    divTaskDetails.classList.add("task-details");

    divTaskTitle.classList.add("task-title");
    divTaskTitle.textContent = task.title;

    divTaskDescription.classList.add("task-description");
    divTaskDescription.textContent = task.description;
    divTaskDetails.append(divTaskTitle, divTaskDescription);

    divtaskDueDate.classList.add("task-due-date");
    divtaskDueDate.textContent = task.dueDate;

    divRightButtons.classList.add("task-right-buttons");
    divRightButtons.append(starCheckbox);

    listItem.task = task;
    listItem.append(divCheckIcon, divTaskDetails, divtaskDueDate, divRightButtons);

    return listItem;
}

function createTaskStarCheckBox(task){
    const starCheckbox = document.createElement("div");

    starCheckbox.classList.add("star-checkbox");
    if (task.priority === true)
    {
        starCheckbox.classList.add("checked");
    }
    else
    {
        starCheckbox.classList.add("unchecked");
    }

    return starCheckbox;
}

function createCompleteCheckBox(task)
{
    const Checkbox = document.createElement("div");

    Checkbox.classList.add("checkbox");

    console.log(task.isCompleted);
    if (task.isCompleted === true)
    {
        Checkbox.classList.add("checked");
    }
    else
    {
        Checkbox.classList.add("unchecked");
    }

    return Checkbox;
}

function clearRightPanel(){
    const titleContainer = document.querySelector(".right-panel .title");
    const taskContainer = document.querySelector(".right-panel .tasks-list-container");
    const addTaskButton = document.querySelector(".add-task");
    const listitems = document.querySelectorAll(".tasks-list li");

    if (addTaskButton)
    {
        addTaskButton.remove();
    }

    listitems.forEach(item => {
        item.remove();
    });

    titleContainer.innerHTML = "";
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