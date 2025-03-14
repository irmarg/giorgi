document.addEventListener("DOMContentLoaded", async () => {
    const gamesContainer = document.getElementById("game-results");

    async function fetchGames() {
        const response = await fetch("http://localhost:5000/api/games");
        const games = await response.json();

        gamesContainer.innerHTML = "";
        games.forEach(game => {
            gamesContainer.innerHTML += `
                <div class="game-card">
                    <h3>${game.team1} vs ${game.team2}</h3>
                    <p>Score: ${game.score}</p>
                    <p>Date: ${game.date}</p>
                </div>
            `;
        });
    }

    fetchGames(); // Initial load
});
