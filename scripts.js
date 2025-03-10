let music = document.getElementById("bg-music");
let musicBtn = document.getElementById("music-btn");
let audioSource = document.getElementById("audio-source");
let musicName = document.getElementById("music-name");
let progressBar = document.getElementById("music-progress");
let speedControl = document.getElementById("speed-control");
let subscribeBtn = document.getElementById("subscribeBtn");

let songs = [
    { name: "Showreel", file: "showreel.mp3", speed: 1.0 },
    { name: "Joy", file: "joy.mp3", speed: 1.2 },
    { name: "Royalty", file: "Royalty.mp3", speed: 1.5 },
    { name: "Love Letter", file: "Love Letter.mp3", speed: 0.9 },
    { name: "Let's Go", file: "Lets Go.mp3", speed: 1.1 },
    { name: "BUSSIN'", file: "BUSSIN'.mp3", speed: 1.3 },
    { name: "Gang", file: "Gang.mp3", speed: 1.4 },
    { name: "Real Good Liar", file: "Real Good Liar.mp3", speed: 1.0 }
];

let currentSongIndex = parseInt(sessionStorage.getItem("musicIndex")) || 0;
let savedSpeed = parseFloat(sessionStorage.getItem("musicSpeed")) || songs[currentSongIndex].speed;

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.textContent = "⏸";
    } else {
        music.pause();
        musicBtn.textContent = "▶️";
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    changeSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    changeSong();
}

function changeSong() {
    audioSource.src = songs[currentSongIndex].file;
    musicName.textContent = songs[currentSongIndex].name;
    music.playbackRate = songs[currentSongIndex].speed;
    speedControl.value = songs[currentSongIndex].speed;
    sessionStorage.setItem("musicSpeed", songs[currentSongIndex].speed);
    music.load();
    music.play();
    musicBtn.textContent = "⏸";
}

function changeSpeed() {
    let speed = parseFloat(speedControl.value);
    music.playbackRate = speed;
    sessionStorage.setItem("musicSpeed", speed);
}

// Update progress bar in real-time
music.addEventListener("timeupdate", function () {
    progressBar.value = (music.currentTime / music.duration) * 100;
});

// Allow user to seek music
progressBar.addEventListener("input", function () {
    music.currentTime = (progressBar.value / 100) * music.duration;
});

// Keep music playing across pages
function openSocials() {
    sessionStorage.setItem("musicTime", music.currentTime);
    sessionStorage.setItem("musicIndex", currentSongIndex);
    window.location.href = "socials.html";
}

window.onload = function () {
    if (sessionStorage.getItem("musicTime")) {
        music.currentTime = sessionStorage.getItem("musicTime");
        changeSong();
    }
    music.playbackRate = savedSpeed;
    speedControl.value = savedSpeed;
};

// Subscribe button + Confetti
subscribeBtn.addEventListener("click", function () {
    if (subscribeBtn.textContent === "SUBSCRIBE") {
        subscribeBtn.textContent = "SUBSCRIBED";
        subscribeBtn.style.backgroundColor = "blue";
        launchConfetti();
        setTimeout(() => {
            window.location.href = "https://youtube.com/@robin-999-1?si=92v3PiBmmyZyZchj";
        }, 500);
    } else {
        let confirmUnsub = confirm("Are you sure you want to unsubscribe?");
        if (confirmUnsub) {
            subscribeBtn.textContent = "SUBSCRIBE";
            subscribeBtn.style.backgroundColor = "red";
        }
    }
});

// Confetti Effect (Multi-colored)
function launchConfetti() {
    let confettiContainer = document.getElementById("confetti-container");
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = randomColor();
        confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.innerHTML = "";
    }, 3000);
}

// Generates random colors for confetti
function randomColor() {
    let colors = ["#ff0000", "#ff7300", "#ffeb00", "#00ff26", "#00e1ff", "#7d00ff", "#ff00b3", "#00ff99", "#ff007f"];
    return colors[Math.floor(Math.random() * colors.length)];
}
