export function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  
  // Load data from localStorage
  export function loadProjects() {
    const data = localStorage.getItem("projects");
    return data ? JSON.parse(data) : [];
  }