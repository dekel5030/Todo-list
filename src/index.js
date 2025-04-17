import "./styles.css";
import Project from './Project.js';
import ListItem from './ListItem.js'; 
import DomManager from './DomManager.js';
import Database from './Database.js';
  
const domManager = new DomManager();
const database = new Database();

document.querySelector('#new-project').addEventListener("click", newProject);
document.querySelector('#save').addEventListener("click", save);
document.querySelector('#import').addEventListener("click", Load);



function newProject() {
    const title = prompt("Enter the project title:");
    const description = prompt("Enter the project description:");

    const project = new Project(title, description);
    domManager.addProject(project);
}

function save() {
    const projectElements = document.querySelectorAll('.project');

    const projects = Array.from(projectElements).map(projectElement => {
        const titleElement = projectElement.querySelector('.title');
        const descriptionElement = projectElement.querySelector('.description');
        
        // Check if title and description exist before accessing their innerText
        const title = titleElement ? titleElement.innerText : '';
        const description = descriptionElement ? descriptionElement.innerText : '';
        
        // Get missions for each project
        const missions = Array.from(projectElement.querySelectorAll('.mission')).map(missionElement => {
            const missionTitleElement = missionElement.querySelector('.mission-title');
            const missionDescriptionElement = missionElement.querySelector('.mission-description');
            const missionDueDateElement = missionElement.querySelector('.mission-due-date');
            const missionPriorityElement = missionElement.querySelector('.mission-priority');
            
            // Check if mission elements exist before accessing their innerText
            const missionTitle = missionTitleElement ? missionTitleElement.innerText : '';
            const missionDescription = missionDescriptionElement ? missionDescriptionElement.innerText : '';
            const missionDueDate = missionDueDateElement ? missionDueDateElement.innerText : '';
            const missionPriority = missionPriorityElement ? missionPriorityElement.innerText : '';
            
            return { missionTitle, missionDescription, missionDueDate, missionPriority };
        });

        return { title, description, missions };
    });

    // Save projects with missions
    database.save(projects);
}

function Load() {
    const projects = database.read();

    projects.forEach(projectData => {
        const project = new Project(projectData.title, projectData.description);
        
        projectData.missions.forEach(missionData => {
            project.addMission(missionData);
        });

        domManager.addProject(project);
    });
}