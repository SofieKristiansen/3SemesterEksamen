document.addEventListener("DOMContentLoaded", () => {
    // Nøgle til localStorage
    const activeChallengesKey = "activeChallenges";

    // Simpel funktion til at gemme og hente data
    const saveActiveChallenges = (challenges) => {
        localStorage.setItem(activeChallengesKey, JSON.stringify(challenges));
    };

    const getActiveChallenges = () => {
        return JSON.parse(localStorage.getItem(activeChallengesKey)) || [];
    };

    // Midlertidig test for at sikre, at localStorage fungerer
    console.log("Gemte udfordringer:", getActiveChallenges());

    // Simpel tilføjelse af testdata
    document.querySelectorAll(".challenge-action").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            const challengeId = button.getAttribute("data-challenge-id");
            const challengeTitle = button.closest(".accordion-item").querySelector(".accordion-button").textContent.trim();

            const challenges = getActiveChallenges();
            challenges.push({ id: challengeId, title: challengeTitle });
            saveActiveChallenges(challenges);

            console.log("Udfordringer opdateret:", getActiveChallenges());
        });
    });
});
