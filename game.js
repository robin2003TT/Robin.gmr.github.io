// Game Variables
let player = document.getElementById("player");
let gameContainer = document.getElementById("game-container");
let scoreDisplay = document.getElementById("score");
let livesDisplay = document.getElementById("lives");
let leaderboardList = document.getElementById("leaderboard-list");

let playerPos = 50; // Start in the middle
let score = 0;
let lives = 3;
let level = 1;
let speed = 3000; // Falling speed

const foods = ["🍑", "🍕", "🌽", "🌾", "🍗", "🌮", "🍡", "🍝"];
const badItems = ["💀", "☠️", "👻", "💩", "🎃"];
const livesItems = ["❤️"];

// Move Player Left/Right
document.getElementById("leftBtn").addEventListener("click", () => movePlayer(-10));
document.getElementById("rightBtn").addEventListener("click", () => movePlayer(10));

function movePlayer(direction) {
    playerPos += direction;
    if (playerPos < 0) playerPos = 0;
    if (playerPos > 90) playerPos = 90;
    player.style.left = playerPos + "%";
}

// Spawn Falling Items
function spawnFood() {
    let food = document.createElement("div");
    food.classList.add("falling-item");
    food.textContent = getRandomItem();
    food.style.left = Math.random() * 90 + "%";
    gameContainer.appendChild(food);

    let fallInterval = setInterval(() => {
        let topPos = parseInt(food.style.top || 0);
        food.style.top = topPos + 5 + "px";

        // Check Collision
        if (topPos > 350) {
            checkCollision(food);
            clearInterval(fallInterval);
            food.remove();
        }
    }, 50);
}

// Check Collision with Player
function checkCollision(food) {
    let foodLeft = parseInt(food.style.left);
    if (Math.abs(foodLeft - playerPos) < 10) {
        let emoji = food.textContent;

        if (foods.includes(emoji)) {
            score++;
        } else if (badItems.includes(emoji)) {
            lives--;
        } else if (livesItems.includes(emoji)) {
            lives++;
        }

        updateScore();
    }
}

// Get Random Item
function getRandomItem() {
    let allItems = [...foods, ...badItems, ...livesItems];
    return allItems[Math.floor(Math.random() * allItems.length)];
}

// Update Score & Lives
function updateScore() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = `${lives} ❤️`;

    if (score % 100 === 0 && score !== 0) {
        level++;
        speed -= 200;
        alert(`Level Up! Welcome to Level ${level}`);
    }

    if (lives <= 0) {
        saveScore();
        alert(`Game Over! Final Score: ${score}`);
        resetGame();
    }
}

// Save Score to Leaderboard
function saveScore() {
    let playerName = prompt("Enter your name:");
    if (!playerName) return;

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: playerName, score: score, level: level });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    updateLeaderboard();
}

// Update Leaderboard
function updateLeaderboard() {
    leaderboardList.innerHTML = "";
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
    leaderboard.forEach(entry => {
        let item = document.createElement("div");
        item.classList.add("leaderboard-item");
        item.textContent = `${entry.name} - Score: ${entry.score} (Level ${entry.level})`;
        leaderboardList.appendChild(item);
    });
}

// Reset Game
function resetGame() {
    score = 0;
    lives = 3;
    level = 1;
    speed = 3000;
    updateScore();
}

// Start Game Loop
setInterval(spawnFood, speed);
updateLeaderboard();
          
