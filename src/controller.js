import {
    loadButtonImages,
    renderProject,
    createProjectTab,
    showTaskMenu,
    createEditTaskForm
} from './mainView.js';

import { addProject as addProjectToModel, getProjectById, saveProjectsToStorage, loadProjectsFromStorage } from './ProjectManager.js';

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
    const newForm = form.cloneNode(true);
    form.replaceWith(newForm);
    const cancelButton = newForm.querySelector(".form-cancel-button");
    const submitButton = newForm.querySelector(".form-submit-button");

    projectHeader.addEventListener("dblclick", () => onProjectFieldDoubleClick(project, 'title', 'project-title'));
    projectDescription.addEventListener("dblclick", () => onProjectFieldDoubleClick(project, 'description', 'project-description'));
    addTaskButton.addEventListener("click", onAddTaskClick);
    cancelButton.addEventListener("click", () => {
        newForm.classList.add("hidden"); 
    });
    newForm.addEventListener("submit", (e) => {
        e.preventDefault();
        formTaskSubmit(e, project);
    });

    document.querySelectorAll(".checkbox").forEach(checkbox => {
        checkbox.addEventListener("click", (e) => {
            onTaskCheckboxClick(e, "isCompleted");
            const parent = e.target.parentElement;
            console.log(parent);
            const elements = parent.querySelectorAll(".task-title, .task-description");
            strikethroughElements(elements)
        }
        )
    });
    
    document.querySelectorAll(".star-checkbox").forEach(star => {
        star.addEventListener("click", (e) => onTaskCheckboxClick(e, "priority"))
    });

    document.querySelectorAll(".task-menu-button").forEach(menu => {
        menu.addEventListener("click", (e) => onTaskMenuClick(e, project));
    })
}

function onTaskMenuClick(event, project) {
    const menu = event.target;
    const listItem = menu.closest("li");
    const task = listItem?.task;

    if (!task) return;
    event.stopPropagation();

    document.querySelectorAll(".task-submenu").forEach(menu => menu.remove());

    const button = event.currentTarget;

    showTaskMenu(button, {
        onEdit: () => {
            editTask(task, menu)
        },
        onDelete: () => {
            deleteTask(project, task);
        }
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".task-submenu").forEach(menu => menu.remove());
    });
}

function deleteTask(project, task)
{
    project.deleteTask(task);
    showProject(project);
    saveProjectsToStorage();
}

function editTask(task, taskElement)
{
    const form = createEditTaskForm(task);
    const taskListItem = taskElement.closest("li");
    const container = taskListItem.parentElement;
    
    container.insertBefore(form, taskListItem);
}

function onTaskCheckboxClick(event, taskField) {
    const checkbox = event.target;
    const listItem = checkbox.closest("li");
    const task = listItem?.task;

    if (!task) return;
    checkbox.classList.toggle("checked");
    checkbox.classList.toggle("unchecked");

    task[taskField] = checkbox.classList.contains("checked");

    saveProjectsToStorage();
}

function strikethroughElements(elements)
{
    elements.forEach(element => {
        element.classList.toggle("strikethrough");
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
    saveProjectsToStorage();
}
