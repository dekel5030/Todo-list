class DomManager{
    addProject(project)
    {
        const projectsContainer = document.querySelector("#projects");
        const projectDiv = document.createElement("div");
        const projectTitle = document.createElement("h2");
        const projectDescription = document.createElement("p");
        const projectMissions = document.createElement("ol");

        projectDiv.className = "project"
        projectTitle.className = "project-title";
        projectDescription.classname = "project-description";
        projectMissions.className = "project-missions";
        projectTitle.textContent = project.title;
        projectDescription.textContent = project.description;

        project.missions.forEach(mission => {
            this.addMission(mission, projectMissions)
        });

        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(projectDescription);
        projectDiv.appendChild(projectMissions);
        projectsContainer.appendChild(projectDiv);
    }

    addMission(mission, listElement) {
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

        missionTitle.textContent = mission.missionTitle;
        missionDescription.textContent = mission.missionDescription;
        missionDueDate.textContent = `Due: ${mission.missionDueDate}`;
        missionPriority.textContent = `Priority: ${mission.missionPriority}`;

        missionContainer.appendChild(missionTitle);
        missionContainer.appendChild(missionDescription);
        missionContainer.appendChild(missionDueDate);
        missionContainer.appendChild(missionPriority);

        listElement.appendChild(missionContainer);
    }
}

export default DomManager;
