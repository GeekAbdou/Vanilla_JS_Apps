const musicPlayer = document.querySelector(".music-player");
const musicImg = document.querySelector(".music-player__music-picture img");
const musicName = document.querySelector(".music-player__music-details--name");
const musicArtist = document.querySelector(
  ".music-player__music-details--artist"
);
const musicCurrentTime = document.querySelector(
  ".music-player__timers--current-time"
);
const musicDuartion = document.querySelector(
  ".music-player__timers--total-time"
);
const progressArea = document.querySelector(".music-player__progress-area");
const progressBar = document.querySelector(".music-player__progress-bar");
const prevBtn = document.querySelector(".music-player__control--previous");
const nextBtn = document.querySelector(".music-player__control--skip");
const playBtn = document.querySelector(".music-player__control--play");
const mainAudio = document.querySelector(
  ".music-player__progress-bar--current"
);
const musicList = document.querySelector(".music-player__music-list");
const moreMusicBtn = document.querySelector("#more-music");
const closemoreMusic = document.querySelector("#close");

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

//play and pause music
function playMusic() {
  playBtn.classList.add("paused");
  playBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}
function pauseMusic() {
  playBtn.classList.remove("paused");
  playBtn.querySelector("i").innerText = "play_arrow"; // I couldn't use the i itselt directly
  mainAudio.pause();
}
playBtn.addEventListener("click", () => {
  const isMusicPlay = playBtn.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
});

//prev music
function prevMusic() {
  randomMusic--;
  randomMusic < 1
    ? (randomMusic = allMusic.length)
    : (randomMusic = randomMusic);
  loadMusic(randomMusic);
  playMusic();
}
prevBtn.addEventListener("click", () => {
  prevMusic();
});

//next music
function nextMusic() {
  randomMusic++;
  randomMusic > allMusic.length
    ? (randomMusic = 1)
    : (randomMusic = randomMusic);
  loadMusic(randomMusic);
  playMusic();
}
nextBtn.addEventListener("click", () => {
  nextMusic();
});

//progress area
//1- updating current time and total time
mainAudio.addEventListener("timeupdate", (e) => {
  const currTime = e.target.currentTime; //updating the current time second by second
  const duration = e.target.duration;

  //updating the progress Bar
  const progress = (currTime / duration) * 100;
  progressBar.style.width = `${progress}%`; //updating the width style

  //updating total time
  mainAudio.addEventListener("loadeddata", () => {
    const mainAdDuration = mainAudio.duration;
    const totalMin = Math.floor(mainAdDuration / 60);
    const totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  //updating current time
  const currentMin = Math.floor(currTime / 60);
  const currentSec = Math.floor(currTime % 60);
  if (currentSec < 10) {
    //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//2- clicking on progress bar and update(was Impressing for me !! )
progressArea.addEventListener("click", (e) => {
  const progressWidth = progressArea.clientWidth;
  const clickedOffestX = e.offsetX;
  const songDuration = mainAudio.duration;

  mainAudio.currentTime = (clickedOffestX / progressWidth) * songDuration; //songDuration is in secounds
});
