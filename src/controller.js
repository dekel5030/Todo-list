import {
    loadButtonImages,
    renderProjectTab,
    selectTabChange,
    renderProject
} from './mainView.js';

import { addProject as addProjectToModel, getProjectById } from './projectManager.js';

document.addEventListener("DOMContentLoaded", () => {
    loadButtonImages();
    attachTabListeners();
});


function attachTabListeners() {
    const tabButtons = document.querySelectorAll("button.tab, button.selected-tab");
    const addProjectButton = document.getElementById("add-project");

    tabButtons.forEach(button => {
        button.addEventListener("click", selectTabChange);
    });

    addProjectButton.addEventListener("click", addProject);
}

function addProject() {
    const project = addProjectToModel();
    const projectButton = renderProjectTab(project);

    projectButton.addEventListener("click", onProjectClick);
}

function onProjectClick(event) {
    const projectId = event.currentTarget.dataset.projectId;
    const project = getProjectById(projectId);

    const {projectHeader, projectDescription} = renderProject(project);

    projectHeader.addEventListener("dblclick", () => onProjectFieldDoubleClick(project, 'title', 'project-title'));
    projectDescription.addEventListener("dblclick", () => onProjectFieldDoubleClick(project, 'description', 'project-description'));
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
        onProjectClick({ currentTarget: { dataset: { projectId: project.id } } });
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            project[field] = input.value;
            onProjectClick({ currentTarget: { dataset: { projectId: project.id } } });
        }
    });

    fieldContainer.appendChild(input);
    input.focus();
}
