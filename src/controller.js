import {
    loadButtonImages,
    renderProject,
    createProjectTab
} from './mainView.js';

import { addProject as addProjectToModel, getProjectById, saveProjectsToStorage, loadProjectsFromStorage } from './projectManager.js';

import Task from './Task.js';

document.addEventListener("DOMContentLoaded", () => {
    loadButtonImages();
    attachTabListeners();
    loadProjects();
});

function loadProjects() {
    const projects = loadProjectsFromStorage();
    
    projects.forEach(project => {
        createProjectTabButton(project);
    });
}

function createProjectTabButton(project)
{
    const projectButton = createProjectTab(project);

    projectButton.addEventListener("click", onProjectClick);

    return projectButton;
}

function attachTabListeners() {
    const tabButtons = document.querySelectorAll("button.tab, button.selected-tab");
    const addProjectButton = document.getElementById("add-project");

    tabButtons.forEach(button => {
        if (button !== addProjectButton)
        {
            button.addEventListener("click", changeSelectedTab);
        }
    });

    addProjectButton.addEventListener("click", onAddProjectClick);
}

function onAddProjectClick(event) {
    const projectButton = addProject();
}

function addProject() {
    const project = addProjectToModel();
    const projectButton = createProjectTabButton(project);
    
    showProject(project);
    changeSelectedTab({target: projectButton});
    saveProjectsToStorage();
}

function onProjectClick(event) {
    const projectId = event.currentTarget.dataset.projectId;
    const project = getProjectById(projectId);

    changeSelectedTab(event);
    showProject(project);
}

function onProjectFieldDoubleClick(project, field, elementClassName) {
    const fieldContainer = document.querySelector(`.right-panel .title .${elementClassName}`);
    console.log(fieldContainer);
    fieldContainer.innerHTML = "";

    const input = document.createElement("input");
    input.value = project[field];
    input.classList.add("edit-input");

    input.addEventListener("blur", () => {
        project[field] = input.value;
        showProject(project);
        saveProjectsToStorage();
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            project[field] = input.value;
            input.blur();
        }
    });

    fieldContainer.appendChild(input);
    input.focus();
}

function showProject(project) {
    const {projectHeader, projectDescription, addTaskButton} = renderProject(project);
    const form = document.querySelector(".task-form");
    const cancelButton = form.querySelector(".form-cancel-button");
    const submitButton = form.querySelector(".form-submit-button");

    projectHeader.addEventListener("dblclick", () => onProjectFieldDoubleClick(project, 'title', 'project-title'));
    projectDescription.addEventListener("dblclick", () => onProjectFieldDoubleClick(project, 'description', 'project-description'));
    addTaskButton.addEventListener("click", onAddTaskClick);
    cancelButton.addEventListener("click", () => {
        form.classList.add("hidden"); 
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        formTaskSubmit(e, project);
    });

}

function changeSelectedTab(event) {
    const prevSelectedTabButton = document.querySelector(".selected-tab");

    if (prevSelectedTabButton)
    {
        prevSelectedTabButton.classList.remove("selected-tab");
    }

    event.target.classList.add("selected-tab");
}

function onAddTaskClick(){
    const form = document.querySelector(".task-form");

    form.classList.remove("hidden");
}

function formTaskSubmit(e, project) {
    const form = e.target;
    const { title, description, dueDate } = form.elements;

    const newTask = new Task(
        title.value.trim(),
        description.value.trim(),
        dueDate.value
    );

    project.addTask(newTask);

    form.reset();
    form.classList.add("hidden");
    showProject(project);
}
