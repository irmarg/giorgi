async function addPlayer() {
    const name = document.getElementById("player-name").value;
    const position = document.getElementById("player-position").value;
    const goals = document.getElementById("player-goals").value;
    const assists = document.getElementById("player-assists").value;
    const saves = document.getElementById("player-saves").value;
    const image = document.getElementById("player-image").value;

    const response = await fetch("http://localhost:5000/api/players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name, position, goals, assists, saves, image })
    });

    if (response.ok) {
        alert("Player added successfully!");
        location.reload();
    }
}

async function addGame() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const score = document.getElementById("score").value;
    const date = document.getElementById("game-date").value;

    const response = await fetch("http://localhost:5000/api/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ team1, team2, score, date })
    });

    if (response.ok) {
        alert("Game added successfully!");
        location.reload();
    }
}
