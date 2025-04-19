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

    renderProject(project);
}


