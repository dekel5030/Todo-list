import Project from './Project.js';
import Task from './Task.js';

const STORAGE_KEY = 'TodoList.projects';
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

function saveProjectsToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function loadProjectsFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    try {
        const parsed = JSON.parse(data);

        projects.length = 0;

        projects.push(...parsed.map(p => {
            const tasks = (p._tasks || []).map(t => new Task(t._title, t._description, t._dueDate, t._priority, t._isCompleted));

            return new Project({
                title: p._title,
                description: p._description,
                id: p._id,
                tasks: tasks
            });
        }));
    } catch (e) {
        console.error('Failed to load projects:', e);
        projects.length = 0;
    }

    return projects;
}

function deleteProjectFromStorage(project) {
    const projectIndex = projects.findIndex(proj => proj === project);
    console.log(projectIndex);

    if (projectIndex !== -1) {
        projects.splice(projectIndex, 1);
    }

    saveProjectsToStorage();
}

function clearLocalStorage() {
    localStorage.clear();
}

export {
    addProject,
    getAllProjects,
    getProjectById,
    saveProjectsToStorage,
    loadProjectsFromStorage,
    deleteProjectFromStorage,
    clearLocalStorage
};