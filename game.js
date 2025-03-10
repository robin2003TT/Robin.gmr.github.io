const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    speed: 5
};

let fallingObjects = [];
let score = 0;
let lives = 3;
let level = 1;
let isGameOver = false;

const goodItems = ["🍑", "🍕", "🌽", "🍗", "🍝", "🍚"];
const badItems = ["💀", "☠️", "👻", "💩"];
const lifeItem = "❤️";

document.addEventListener("keydown", movePlayer);

function movePlayer(event) {
    if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    } else if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    }
}

function spawnItem() {
    if (isGameOver) return;

    let itemType = Math.random() < 0.7 ? "good" : "bad";
    let emoji = itemType === "good" ? goodItems[Math.floor(Math.random() * goodItems.length)] : badItems[Math.floor(Math.random() * badItems.length)];

    if (Math.random() < 0.05 && lives < 3) {
        emoji = lifeItem;
    }

    fallingObjects.push({
        x: Math.random() * (canvas.width - 30),
        y: 0,
        width: 30,
        height: 30,
        speed: 2 + level * 0.5,
        emoji: emoji
    });

    setTimeout(spawnItem, 800 - level * 30);
}

function updateGame() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("🤤", player.x, player.y + 30);

    for (let i = 0; i < fallingObjects.length; i++) {
        let obj = fallingObjects[i];
        obj.y += obj.speed;

        ctx.fillText(obj.emoji, obj.x, obj.y);

        if (obj.y > canvas.height) {
            fallingObjects.splice(i, 1);
            i--;
            continue;
        }

        if (checkCollision(player, obj)) {
            if (goodItems.includes(obj.emoji)) {
                score++;
            } else if (obj.emoji === lifeItem) {
                if (lives < 3) lives++;
            } else {
                lives--;
            }

            fallingObjects.splice(i, 1);
            i--;

            if (lives <= 0) {
                gameOver();
            }

            if (score % 100 === 0) {
                level++;
                saveLeaderboard();
            }
        }
    }

    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Lives: ${"❤️".repeat(lives)}`, 10, 60);
    ctx.fillText(`Level: ${level}`, 10, 90);

    requestAnimationFrame(updateGame);
}

function checkCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function gameOver() {
    isGameOver = true;
    alert("Game Over! Your score: " + score);
    saveLeaderboard();
    location.reload();
}

function saveLeaderboard() {
    let playerName = sessionStorage.getItem("playerName");
    if (!playerName) {
        playerName = prompt("Enter your name:");
        sessionStorage.setItem("playerName", playerName);
    }

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: playerName, score: score, level: level });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    updateLeaderboard();
}

function updateLeaderboard() {
    let leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score} (Level ${entry.level})`;
        leaderboardList.appendChild(li);
    });
}

function goBack() {
    sessionStorage.setItem("musicTime", document.getElementById("bg-music").currentTime);
    window.location.href = "index.html";
}

window.onload = function () {
    if (sessionStorage.getItem("musicTime")) {
        let music = document.getElementById("bg-music");
        music.currentTime = sessionStorage.getItem("musicTime");
        music.play();
    }

    spawnItem();
    updateGame();
    updateLeaderboard();
};
        
