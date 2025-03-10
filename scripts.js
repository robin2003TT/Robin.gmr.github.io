document.addEventListener("DOMContentLoaded", function () {
    let music = document.getElementById("bg-music");
    let musicBtn = document.getElementById("music-btn");
    let audioSource = document.getElementById("audio-source");
    let musicName = document.getElementById("music-name");
    let speedControl = document.getElementById("speed-control");
    let subscribeBtn = document.getElementById("subscribeBtn");

    let songs = [
        { name: "Showreel", file: "showreel.mp3" },
        { name: "Joy", file: "joy.mp3" },
        { name: "Royalty", file: "Royalty.mp3" },
        { name: "Love Letter", file: "Love Letter.mp3" }
    ];

    let currentSongIndex = parseInt(sessionStorage.getItem("songIndex")) || 0;
    let savedTime = parseFloat(sessionStorage.getItem("songTime")) || 0;
    let savedSpeed = parseFloat(sessionStorage.getItem("songSpeed")) || 1;

    function updateMusic() {
        audioSource.src = songs[currentSongIndex].file;
        musicName.textContent = songs[currentSongIndex].name;
        music.load();
        music.currentTime = savedTime; // Resume from last time
        music.play();
        music.playbackRate = savedSpeed; // Apply saved speed
        musicBtn.textContent = "⏸";
    }

    updateMusic();

    function saveMusicState() {
        sessionStorage.setItem("songIndex", currentSongIndex);
        sessionStorage.setItem("songTime", music.currentTime);
        sessionStorage.setItem("songSpeed", music.playbackRate);
    }

    music.addEventListener("pause", saveMusicState);
    music.addEventListener("play", saveMusicState);
    music.addEventListener("timeupdate", saveMusicState);

    musicBtn.addEventListener("click", function () {
        if (music.paused) {
            music.play();
            musicBtn.textContent = "⏸";
        } else {
            music.pause();
            musicBtn.textContent = "▶️";
        }
    });

    document.getElementById("nextSong").addEventListener("click", function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        savedTime = 0; // Reset time for new song
        updateMusic();
    });

    document.getElementById("prevSong").addEventListener("click", function () {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        savedTime = 0; 
        updateMusic();
    });

    speedControl.addEventListener("input", function () {
        music.playbackRate = speedControl.value;
        saveMusicState();
    });

    subscribeBtn.addEventListener("click", function () {
        launchConfetti();
        subscribeBtn.textContent = "SUBSCRIBED";
        subscribeBtn.classList.add("subscribed");
        setTimeout(() => {
            window.location.href = "https://youtube.com/@robin-999-1";
        }, 700);
    });

    function launchConfetti() {
        for (let i = 0; i < 100; i++) {
            let confetti = document.createElement("div");
            confetti.className = "confetti";
            document.body.appendChild(confetti);
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
            confetti.style.backgroundColor = randomColor();
            setTimeout(() => confetti.remove(), 2000);
        }
    }

    function randomColor() {
        let colors = ["#ff0000", "#ff7300", "#ffeb00", "#00ff26", "#00e1ff", "#7d00ff", "#ff00b3"];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});
function launchConfetti() {
    const confettiCount = 100;
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.overflow = "hidden";
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < confettiCount; i++) {
        let confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor = randomColor();
        confetti.style.top = `${Math.random() * window.innerHeight}px`;
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.transition = "top 2s ease-out, opacity 2s";
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.style.top = `${window.innerHeight + 50}px`;
            confetti.style.opacity = "0";
        }, 10);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 2000);
}

// ✅ Generates random colors for confetti
function randomColor() {
    let colors = ["#ff0000", "#ff7300", "#ffeb00", "#00ff26", "#00e1ff", "#7d00ff", "#ff00b3", "#00ff99", "#ff007f"];
    return colors[Math.floor(Math.random() * colors.length)];
}
