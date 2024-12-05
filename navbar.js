document.addEventListener("DOMContentLoaded", () => {
    fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar-placeholder").innerHTML = data;

            const currentPage = window.location.pathname.split("/").pop();

            const navLinks = document.querySelectorAll(".nav-item");

            navLinks.forEach((link) => {
                const page = link.getAttribute("data-page");
                const icon = link.querySelector("i");
                const text = link.querySelector(".nav-text");

                if (page === currentPage) {
                    icon.style.fontSize = "2rem"; // Større ikon
                    icon.style.color = "var(--primærikon)"; // Primærfarve

                    text.style.fontSize = "1rem";
                    text.style.color = "var(--primærikon)";

                } else {
                    icon.style.fontSize = "1.5rem"; // Mindre ikon
                    icon.style.color = "var(--sekundærikon)"; // Sekundærfarve

                    text.style.fontSize = "0.875rem";
                    text.style.color = "var(--sekundærikon)";
                }
            });
        })
        .catch((error) => console.error("Fejl ved indlæsning af navigationsbar:", error));
});
