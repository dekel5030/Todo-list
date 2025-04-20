import Task from "./Task";

class Project {
    static #idCounter = 1;

    constructor({ title, description, id, tasks } = {}) {
        if (typeof id === 'number') {
            this._id = id;
            Project.#idCounter = Math.max(Project.#idCounter, id + 1);
        } else {
            this._id = Project.#idCounter++;
        }

        this._title = title ?? `Untitled Project ${this._id}`;
        this._description = description ?? "None";
        this._tasks = tasks ?? [];
    }

    get id() {
        return this._id;
    }
    
    get title() {
        return this._title;
    }
  
    set title(value) {
        this._title = value;
    }
  
    get description() {
        return this._description;
    }
  
    set description(value) {
        this._description = value;
    }
  
    get tasks() {
        return this._tasks;
    }
  
    addTask(task) {
        if (task instanceof Task) {
            this._tasks.push(task);
        } else {
            console.warn("Expected instance of Task");
        }
    }

    deleteTask(task) {
        const index = this._tasks.indexOf(task);

        if (index !== -1) {
            this._tasks.splice(index, 1);
        }
    }
}

export default Project;
  