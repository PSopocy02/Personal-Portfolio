// This file contains the JavaScript features used in the portfolio.

// Additional feature: switch between light mode and dark mode.
function addDarkModeButton() {
    let button = document.createElement("button");
    button.textContent = "Dark Mode";
    button.id = "dark-mode-button";
    button.className = "btn btn-sm btn-outline-light ms-lg-3 mt-2 mt-lg-0";
    button.type = "button";
    button.setAttribute("aria-pressed", "false");

    let nav = document.querySelector(".navbar .navbar-collapse");
    if (nav !== null) {
        nav.appendChild(button);
    }

    button.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            button.textContent = "Light Mode";
            button.setAttribute("aria-pressed", "true");
        } else {
            button.textContent = "Dark Mode";
            button.setAttribute("aria-pressed", "false");
        }
    });
}

// Extra feature on the Skills page: show or hide additional details.
function setUpSkillsDetails() {
    let detailButton = document.getElementById("skills-detail-button");
    let detailText = document.getElementById("skills-detail");

    if (detailButton !== null && detailText !== null) {
        detailButton.addEventListener("click", function () {
            if (detailText.hidden) {
                detailText.hidden = false;
                detailButton.textContent = "Show Less";
            } else {
                detailText.hidden = true;
                detailButton.textContent = "Show More";
            }
        });
    }
}

// Load project information from the JSON file and create cards.
let allProjects = [];

function loadProjects() {
    let projectList = document.getElementById("project-list");
    let projectStatus = document.getElementById("project-status");

    // Only run this function on projects.html.
    if (projectList === null || projectStatus === null) {
        return;
    }

    fetch("data/projects.json")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load the project data.");
            }
            return response.json();
        })
        .then(function (projects) {
            allProjects = projects;
            showProjects("All");
        })
        .catch(function () {
            projectStatus.textContent = "Projects could not be loaded. Please run this site using a local web server.";
        });
}

// Display the projects that match the selected category.
function showProjects(category) {
    let projectList = document.getElementById("project-list");
    let projectStatus = document.getElementById("project-status");

    if (projectList === null || projectStatus === null) {
        return;
    }

    projectList.innerHTML = "";

    let matchingProjects = [];

    for (let i = 0; i < allProjects.length; i++) {
        if (category === "All" || allProjects[i].category === category) {
            matchingProjects.push(allProjects[i]);
        }
    }

    for (let i = 0; i < matchingProjects.length; i++) {
        let project = matchingProjects[i];

        let column = document.createElement("div");
        column.className = "col-md-6 col-lg-4";

        let card = document.createElement("div");
        card.className = "card project-card";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let title = document.createElement("h2");
        title.className = "h4 card-title";
        title.textContent = project.title;

        let categoryBadge = document.createElement("span");
        categoryBadge.className = "badge project-category mb-3";
        categoryBadge.textContent = project.category;

        let description = document.createElement("p");
        description.className = "card-text";
        description.textContent = project.description;

        let technologyTitle = document.createElement("p");
        technologyTitle.className = "fw-semibold mb-2";
        technologyTitle.textContent = "Technologies:";

        let technologyList = document.createElement("ul");
        technologyList.className = "mb-0";

        for (let j = 0; j < project.technologies.length; j++) {
            let technology = document.createElement("li");
            technology.textContent = project.technologies[j];
            technologyList.appendChild(technology);
        }

        cardBody.appendChild(title);
        cardBody.appendChild(categoryBadge);
        cardBody.appendChild(description);
        cardBody.appendChild(technologyTitle);
        cardBody.appendChild(technologyList);
        card.appendChild(cardBody);
        column.appendChild(card);
        projectList.appendChild(column);
    }

    projectStatus.textContent = "Showing " + matchingProjects.length + " project(s).";
}

// Set up the category filter buttons.
function setUpProjectFilters() {
    let filterButtons = document.querySelectorAll(".filter-button");

    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", function () {
            let category = filterButtons[i].getAttribute("data-category");
            showProjects(category);

            for (let j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove("active", "btn-primary");
                filterButtons[j].classList.add("btn-outline-primary");
            }

            filterButtons[i].classList.add("active", "btn-primary");
            filterButtons[i].classList.remove("btn-outline-primary");
        });
    }
}

// Run the functions when the page has loaded.
document.addEventListener("DOMContentLoaded", function () {
    addDarkModeButton();
    setUpSkillsDetails();
    loadProjects();
    setUpProjectFilters();
});
