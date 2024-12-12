document.addEventListener("DOMContentLoaded", () => {
    fetch("modals.html")
        .then((response) => response.text())
        .then((data) => {

            // Tilføj event listeners til icon-trigger knapper
            document.querySelectorAll(".icon-trigger").forEach((icon) => {
                icon.addEventListener("click", () => {
                    const targetModalId = icon.getAttribute("data-bs-target");
                    const targetModal = document.querySelector(targetModalId);
                    if (targetModal) {
                        const modalInstance = new bootstrap.Modal(targetModal);
                        modalInstance.show();
                    }
                });
            });

            document.getElementById("modals-placeholder").innerHTML = data;


            const modal = document.getElementById("globalModal");
            const modalTitle = modal.querySelector("#globalModalTitel");
            const modalBody = modal.querySelector("#globalModalBody");
            const confirmFinishButton = document.getElementById("confirmFinishButton");

            // Event listener for "challenge-action" knapper
            document.querySelectorAll(".challenge-action").forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.preventDefault(); // Forhindrer standard "a href"-adfærd
                    const challengeId = button.getAttribute("data-challenge-id");

                    // Definerer point baseret på challengeId
                    let points = 0;
                    if (challengeId === "1") {
                        points = 50; // Point for udfordring 1
                    } else if (challengeId === "2") {
                        points = 100; // Point for udfordring 2
                    }

                    if (button.textContent.trim() === "Tag udfordring") {
                        // Skift tekst og modal-attributter
                        button.textContent = "Afslut udfordring";
                        button.setAttribute("data-bs-toggle", "modal");
                        button.setAttribute("data-bs-target", "#globalModal");
                    } else if (button.textContent.trim() === "Afslut udfordring") {
                        // Dynamisk opdater modal-indhold
                        if (challengeId === "1") {
                            modalTitle.textContent = "Afslut udfordring: Saml affald i naturen";
                            modalBody.textContent =
                                "Hvis du er færdig med udfordringen, kan du trykke afslut udfordring, og dine point bliver automatisk tilføjet til din konto.";
                        } else if (challengeId === "2") {
                            modalTitle.textContent = "Afslut udfordring: Præsentér en idé";
                            modalBody.textContent =
                                "Hvis du er færdig med udfordringen, kan du trykke afslut udfordring, og dine point bliver automatisk tilføjet til din konto.";
                        } else {
                            modalTitle.textContent = "Afslut udfordring";
                            modalBody.textContent = "Ingen specifik udfordring valgt.";
                        }

                        // Opdater success-modal med point
                        const pointsContainer = document.querySelector("#successModal .point");
                        if (pointsContainer) {
                            pointsContainer.textContent = `${points} Point`; // Sæt point i success-modal
                        }

                        // Åbn modal
                        const globalModalInstance = bootstrap.Modal.getOrCreateInstance(modal);
                        globalModalInstance.show();
                    }
                });
            });

            // Bekræft afslutning af udfordring
            confirmFinishButton.onclick = () => {
                const globalModal = bootstrap.Modal.getInstance(modal);
                if (globalModal) {
                    globalModal.hide();
                }

                // Vis success-modal med konfetti
                setTimeout(() => {
                    const successModal = new bootstrap.Modal(document.getElementById("successModal"));
                    successModal.show();

                    // Find canvas til konfetti
                    const confettiCanvas = document.querySelector("#successModal #confettiCanvas");

                    // Start konfetti
                    if (confettiCanvas) {
                        const myConfetti = confetti.create(confettiCanvas, { resize: true });
                        myConfetti({
                            particleCount: 600,
                            spread: 120,
                            startVelocity: 50,
                            gravity: 2,
                            scalar: 1.3,
                            origin: { x: 0.5, y: 0.5 },
                        });

                        // Stop konfetti efter 15 sekunder
                        setTimeout(() => {
                            confettiCanvas.getContext("2d").clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
                        }, 15000);
                    }

                    // Start puls-animation på tekst
                    const pointsText = document.querySelector("#successModal .point");
                    if (pointsText) {
                        let scale = 1;
                        let growing = true;

                        // Puls-effekt med setInterval
                        const pulseInterval = setInterval(() => {
                            scale = growing ? scale + 0.05 : scale - 0.05;
                            if (scale >= 1.3) growing = false;
                            if (scale <= 1) growing = true;

                            pointsText.style.transform = `scale(${scale})`;
                            pointsText.style.transition = "transform 0.1s ease";
                        }, 100);

                        // Stop puls-animation, når modal lukkes
                        const successModalElement = document.getElementById("successModal");
                        successModalElement.addEventListener("hidden.bs.modal", () => {
                            clearInterval(pulseInterval);
                            pointsText.style.transform = "scale(1)";
                        });
                    }
                }, 300);
            };
        })
        .catch((error) => console.error("Fejl ved indlæsning af modals:", error));




});
