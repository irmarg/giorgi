document.addEventListener("DOMContentLoaded", async () => {
    const playerContainer = document.getElementById("player-cards");
    const filterDropdown = document.getElementById("players");

    async function fetchPlayers(position = "all") {
        let url = "http://localhost:5000/api/players";
        if (position !== "all") url += `/${position}`;

        const response = await fetch(url);
        const players = await response.json();

        playerContainer.innerHTML = "";
        players.forEach(player => {
            playerContainer.innerHTML += `
                <div class="player-card">
                    <img src="${player.image}" alt="${player.name}" class="player-img">
                    <h3>${player.name}</h3>
                    <p>Position: ${player.position}</p>
                    <p>Goals: ${player.goals}</p>
                    <p>Assists: ${player.assists}</p>
                    <p>Saves: ${player.saves}</p>
                </div>
            `;
        });
    }

    filterDropdown.addEventListener("change", (event) => {
        fetchPlayers(event.target.value);
    });

    fetchPlayers(); // Initial load
});
