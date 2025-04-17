class Database {
    constructor() {
        this.storageKey = 'todoListData';
    }

    save(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            console.log("Data saved to localStorage.");
        } catch (error) {
            console.error(`Failed to save data: ${error.message}`);
        }
    }

    read() {
        try {
            const fileContent = localStorage.getItem(this.storageKey);
            if (fileContent) {
                const data = JSON.parse(fileContent);
                return data;
            } else {
                console.log("No data found in localStorage.");
                return null;
            }
        } catch (error) {
            console.error(`Failed to read or parse data: ${error.message}`);
            return null;
        }
    }
}

export default Database;
