import Project from "./Project";
import ListItem from "./ListItem";

class DomManager{

    static getProjectFromUser()
    {
        const title = prompt("Enter the project title:");
        const description = prompt("Enter the project description:");
    
        const project = new Project(title, description);
        DomManager.addProject(project);
    }

    static addProject(project)
    {
        const projectsContainer = document.querySelector("#projects");
        const projectDiv = document.createElement("div");
        const projectTitle = document.createElement("h2");
        const projectDescription = document.createElement("p");
        const projectMissions = document.createElement("ul");
        const projectButton = this.createElement("button", "+", ["add-mission-button", "project-add-mission-button"]);

        projectDiv.className = "project"
        projectTitle.className = "project-title";
        projectDescription.className = "project-description";
        projectMissions.className = "project-missions";
        projectMissions.id = project.id;
        projectTitle.textContent = project.title;
        projectDescription.textContent = project.description;
        projectButton.setAttribute("data-project-id", project.id); 
        projectButton.addEventListener("click", DomManager.getMissionFromUser);

        project.missions.forEach(mission => {
            this.addMission(mission, projectMissions)
        });

        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(projectDescription);
        projectDiv.appendChild(projectMissions);
        projectDiv.appendChild(projectButton);
        projectsContainer.appendChild(projectDiv);
    }
    
    
    static getMissionFromUser(event) {
        const clickedButton = event.target;
        const clickedButtonProjectID = clickedButton.getAttribute('data-project-id');
        const title = prompt("Enter the Mission title:");
        const description = prompt("Enter the Mission description:");
        const container = document.getElementById(clickedButtonProjectID);

        const mission = new ListItem(title, description, "27/05/2025", true);
        console.log(mission);
        DomManager.addMission(mission, container);
    }


    static addMission(mission, container) {
        const missionContainer = document.createElement("li");
        const missionTitle = document.createElement("h3");
        const missionDescription = document.createElement("p");
        const missionDueDate = document.createElement("p");
        const missionPriority = document.createElement("p");

        missionContainer.className = "mission";
        missionTitle.className = "mission-title";
        missionDescription.className = "mission-description";
        missionDueDate.className = "mission-due-date";
        missionPriority.className = "mission-priority";

        missionTitle.textContent = mission.title;
        missionDescription.textContent = mission.description;
        missionDueDate.textContent = `${mission.dueDate}`;
        missionPriority.textContent = `${mission.priority}`;

        missionContainer.appendChild(missionTitle);
        missionContainer.appendChild(missionDescription);
        missionContainer.appendChild(missionDueDate);
        missionContainer.appendChild(missionPriority);

        container.appendChild(missionContainer);
    }

    static createElement(elementType, elementText, classList)
    {
        const element = document.createElement(elementType);
        
        element.textContent = elementText;
        classList.forEach(classItem => {
            element.classList.add(classItem);
        });

        return element;
    }
}

export default DomManager;
