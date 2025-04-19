import Project from './Project.js';

const projects = [];

function addProject() {
    const project = new Project();

    projects.push(project);
    
    return project;
}

function getAllProjects() {
    return [...projects];
}

function getProjectById(id) {
    return projects.find(project => project.id === parseInt(id, 10));
}

export {
    addProject,
    getAllProjects,
    getProjectById
};