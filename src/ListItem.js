class ListItem {
    constructor(title, description, dueDate, priority) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
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

    get dueDate() {
        return this._dueDate;
    }
  
    set dueDate(value) {
        this._dueDate = value;
    }
  
    get priority() {
        return this._priority;
    }
  
    set priority(value) {
        this._priority = value;
    }
}

export default ListItem;
  