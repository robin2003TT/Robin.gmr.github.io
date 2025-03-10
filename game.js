const canvas = document.getElementById("game-container");
const player = document.getElementById("player");

let playerX = canvas.offsetWidth / 2 - player.offsetWidth / 2;
let playerY = canvas.offsetHeight - player.offsetHeight - 10;
let moveLeft = false;
let moveRight = false;
let score = 0;
let lives = 3;

// Update player position based on controls
function movePlayer() {
    if (moveLeft && playerX > 0) {
        playerX -= 5;
    }
    if (moveRight && playerX + player.offsetWidth < canvas.offsetWidth) {
        playerX += 5;
    }
    player.style.left = playerX + "px";
}

// Falling Items
let fallingItems = [];

// Create falling items
function createFallingItems() {
    if (Math.random() < 0.02) {
        const x = Math.random() * (canvas.offsetWidth - 30);
        const type = Math.random() > 0.5 ? "food" : "bad";
        const item = {
            x: x,
            y: 0,
            type: type
        };
        fallingItems.push(item);
    }
}

// Draw falling items and check for collision
function drawFallingItems() {
    fallingItems.forEach((item, index) => {
        const fallingItem = document.createElement("div");
        fallingItem.classList.add("falling-item");
        fallingItem.style.left = item.x + "px";
        fallingItem.style.animationDuration = "4s";
        fallingItem.innerHTML = item.type === "food" ? "🍎" : "💥";
        canvas.appendChild(fallingItem);

        item.y += 5;

        // Collision detection with player
        if (item.y + 30 > playerY && item.x + 30 > playerX && item.x < playerX + player.offsetWidth) {
            if (item.type === "food") {
                score += 10; // Food increases score
            } else {
                lives -= 1; // Bad item decreases lives
            }
            fallingItems.splice(index, 1); // Remove item after collision
            fallingItem.remove(); // Remove element from DOM
        }

        // Remove item if it falls out of view
        if (item.y > canvas.offsetHeight) {
            fallingItems.splice(index, 1);
            fallingItem.remove();
        }
    });
}

// Update and animate the game
function gameLoop() {
    movePlayer();
    createFallingItems();
    drawFallingItems();

    // Display score and lives
    if (lives <= 0) {
        alert("Game Over! Final Score: " + score);
        return;
    }

    requestAnimationFrame(gameLoop);
}

// Event listeners for buttons
document.getElementById("leftBtn").addEventListener("click", function() {
    moveLeft = true;
});
document.getElementById("rightBtn").addEventListener("click", function() {
    moveRight = true;
});
document.getElementById("leftBtn").addEventListener("mouseup", function() {
    moveLeft = false;
});
document.getElementById("rightBtn").addEventListener("mouseup", function() {
    moveRight = false;
});

// Back button functionality
function goBack() {
    window.history.back();
}

// Start the game loop
gameLoop();
