import Task from "./Task";

class Project {
    static #idCounter = 1;

    constructor({ title, description, id, missions } = {}) {
        if (typeof id === 'number') {
            this._id = id;
            Project.#idCounter = Math.max(Project.#idCounter, id + 1);
        } else {
            this._id = Project.#idCounter++;
        }

        this._title = title ?? `Untitled Project ${this._id}`;
        this._description = description ?? "None";
        this._missions = missions ?? [];
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
  
    get missions() {
        return this._missions;
    }
  
    addTask(task) {
        if (listItem instanceof Task) {
            this._missions.push(listItem);
        } else {
            console.warn("Expected instance of Task");
        }
    }
}

export default Project;
  