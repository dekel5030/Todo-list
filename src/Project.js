class Project {
    static #idCounter = 0;

    constructor(title, description) {
        this._id = Project.#idCounter++;
        this._title = title;
        this._description = description;
        this._missions = [];
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
  
    addMission(listItem) {
        if (listItem instanceof ListItem) {
            this._missions.push(listItem);
        } else {
            console.warn("Expected instance of ListItem");
        }
    }
}

export default Project;
  