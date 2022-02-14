let musicPlayer = document.querySelector(".music-player");
let musicImg = document.querySelector(".music-player__music-picture img");
let musicName = document.querySelector(".music-player__music-details--name");
let musicArtist = document.querySelector(
  ".music-player__music-details--artist"
);
let progressArea = document.querySelector(".music-player__progress-bar");
let progressBar = document.querySelector(".music-player__progress-bar--value");
let prevBtn = document.querySelector(".music-player__control--previous");
let nextBtn = document.querySelector(".music-player__control--skip");
let playBtn = document.querySelector(".music-player__control--play");
let mainAudio = document.querySelector(".music-player__progress-bar--current");
let musicList = document.querySelector(".music-player__music-list");
let moreMusicBtn = document.querySelector("#more-music");
let closemoreMusic = document.querySelector("#close");

let randomMusic = Math.floor(Math.random() * allMusic.length + 1);

window.addEventListener("load", () => {
  loadMusic(randomMusic);
});

function loadMusic(indx) {
  musicImg.src = `images/${allMusic[indx - 1].src}.jpg`;
  mainAudio.src = `songs/${allMusic[indx - 1].src}.mp3`;
  musicName.innerHTML = allMusic[indx - 1].name;
  musicArtist.innerHTML = allMusic[indx - 1].artist;
}

//play music
function playMusic() {
  playBtn.classList.add("paused");
  playBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

//pause music
function pauseMusic() {
  playBtn.classList.remove("paused");
  playBtn.querySelector("i").innerText = "play_arrow"; // I couldn't use the i itselt directly
  mainAudio.pause();
}

playBtn.addEventListener("click", () => {
  const isMusicPlay = playBtn.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay ? pauseMusic() : playMusic();
});
