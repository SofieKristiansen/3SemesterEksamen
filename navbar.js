document.addEventListener("DOMContentLoaded", () => {
    fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar-placeholder").innerHTML = data;

            const currentPage = window.location.pathname.split("/").pop();
            console.log("Current Page:", currentPage);

            const navLinks = document.querySelectorAll(".nav-item");

            navLinks.forEach((link) => {
                const page = link.getAttribute("data-page");
                const icon = link.querySelector("i");

                console.log(`Checking link: ${page}, current page: ${currentPage}`);

                if (page === currentPage) {
                    icon.style.fontSize = "2rem"; // Større ikon
                    icon.style.color = "var(--primærikon)"; // Primærfarve
                    console.log(`Active link set to primary color: ${getComputedStyle(icon).color}`);
                } else {
                    icon.style.fontSize = "1.5rem"; // Mindre ikon
                    icon.style.color = "var(--sekundærikon)"; // Sekundærfarve
                    console.log(`Inactive link set to secondary color: ${getComputedStyle(icon).color}`);
                }
            });
        })
        .catch((error) => console.error("Fejl ved indlæsning af navigationsbar:", error));
});
