document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunne ikke hente header.html");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;

            const backButton = document.querySelector("#back-button");
            const pageTitle = document.querySelector("#page-title");
            const currentPage = window.location.pathname.split("/").pop();

            console.log("Current Page:", currentPage);

            const pageData = {
                "dashboard.html": null,
                "udfordringer.html": "Udfordringer",
                "leaderboard.html": "Placeringer",
            };

            if (pageData[currentPage] === null) {
                console.log("Skjuler tilbagepil og titel");
                backButton.style.display = "none";
                pageTitle.style.display = "none";
            } else {
                console.log("Viser tilbagepil og titel");
                backButton.style.display = "inline-flex";
                pageTitle.style.display = "block";
                pageTitle.textContent = pageData[currentPage];
            }
        })
        .catch(error => console.error("Fejl i fetch:", error));
});
