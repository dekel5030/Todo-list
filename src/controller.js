import {
    loadButtonImages,
    renderProject,
    createProjectTab,
    showTaskMenu,
    createEditTaskForm
} from './mainView.js';

import { addProject as addProjectToModel, getProjectById, saveProjectsToStorage, loadProjectsFromStorage, getAllProjects } from './ProjectManager.js';

import Task from './Task.js';
import Project from './Project.js';

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
    const allTasksTab = document.getElementById("all-tasks-tab").addEventListener("click", showAllTasks);
    const todayTasksTab = document.getElementById("today-tasks-tab").addEventListener("click", showTodayTasks);
    const nextWeekTasksTab = document.getElementById("next-week-tasks-tab").addEventListener("click", showNextWeekTasks);
    const importantasksTab = document.getElementById("important-tasks-tab").addEventListener("click", showImportantTasks);

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
    const form = document.querySelector("#task-form");
    const newForm = form.cloneNode(true);
    const cancelButton = newForm.querySelector(".form-cancel-button");

    form.replaceWith(newForm);
    newForm.classList.add("hidden");
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

    return {projectHeader, projectDescription, addTaskButton};
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
            editTask(project, task, menu)
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

function editTask(project, task, taskElement)
{
    document.querySelectorAll(".task-edit-form").forEach(form => form.remove());
    const form = createEditTaskForm(task);
    const taskListItem = taskElement.closest("li");
    const container = taskListItem.parentElement;
    const cancelButton = form.querySelector(".form-cancel-button");

    form.addEventListener("submit",(e) => {
        e.preventDefault();
        form.remove();
        formEditTaskSubmit(e, project, task);
    });

    cancelButton.addEventListener("click", () => form.remove());
    container.insertBefore(form, taskListItem);
}

function formEditTaskSubmit(e, project, task) {
    const form = e.target;
    const { title, description, dueDate } = form.elements;
    console.log(task);

    task.title = title.value;
    task.description = description.value;
    task.dueDate = dueDate.value;
    console.log(task);

    saveProjectsToStorage();
    showProject(project);
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
    const form = document.querySelector("#task-form");

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


function showAllTasks()
{
    const project = new Project({ title: "All Tasks", description: "" });
    const allTasks = [];

    getAllProjects().forEach(project => {
        project.tasks.forEach(task => {
            allTasks.push(task);
        });
    });

    project.tasks = allTasks;

    const {projectHeader, projectDescription, addTaskButton} = showProject(project);
    addTaskButton.remove();
}

function showTodayTasks()
{
    const project = new Project({ title: "Today", description: "" });
    const todayTasks = [];

    getAllProjects().forEach(project => {
        project.tasks.forEach(task => {
            if (task.dueDate != null && task.dueDate === new Date().toISOString().split('T')[0]) {
                todayTasks.push(task);
            }
        });
    });

    project.tasks = todayTasks;

    const {projectHeader, projectDescription, addTaskButton} = showProject(project);
    addTaskButton.remove();
}

function showNextWeekTasks()
{
    const project = new Project({ title: "Next Week", description: "" });
    const today = new Date();
    const sevenDaysAhead = new Date();
    const weekTasks = [];

    sevenDaysAhead.setDate(today.getDate() + 7);
    getAllProjects().forEach(project => {
        project.tasks.forEach(task => {
            if (task.dueDate != null) {
                const taskDueDate = new Date(task.dueDate);
                if (taskDueDate.toISOString().split('T')[0] === today.toISOString().split('T')[0] || 
                    (taskDueDate >= today && taskDueDate <= sevenDaysAhead)) {
                        weekTasks.push(task);
                }
            }
        });
    });
    project.tasks = weekTasks;

    const {projectHeader, projectDescription, addTaskButton} = showProject(project);
    addTaskButton.remove();
}

function showImportantTasks()
{
    const project = new Project({ title: "Important", description: "" });
    const todayTasks = [];

    getAllProjects().forEach(project => {
        project.tasks.forEach(task => {
            if (task.priority == true) {
                todayTasks.push(task);
            }
        });
    });

    project.tasks = todayTasks;

    const {projectHeader, projectDescription, addTaskButton} = showProject(project);
    addTaskButton.remove();
}