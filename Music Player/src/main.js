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
const repeatBtn = document.querySelector(".music-player__control--repeat");
const mainAudio = document.querySelector(
  ".music-player__progress-bar--current"
);
const musicList = document.querySelector(".music-player__music-list");
const moreMusicBtn = document.querySelector("#plist");
const closemoreMusic = document.querySelector("#close");
const pListBody = document.querySelector(".music-player__music-list--body ul");
let allLiTag = pListBody.querySelectorAll("li");

let currentMusic = Math.floor(Math.random() * allMusic.length + 1);

window.addEventListener("load", () => {
  loadMusic(currentMusic);
  playingSong();
});

function loadMusic(indx) {
  musicImg.src = `images/${allMusic[indx - 1].src}.jpg`;
  mainAudio.src = `songs/${allMusic[indx - 1].src}.mp3`;
  musicName.innerHTML = allMusic[indx - 1].name;
  musicArtist.innerHTML = allMusic[indx - 1].artist;
}

//Controls
//1- play and pause music
function playMusic() {
  playBtn.classList.add("paused");
  playBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
  playingSong();
}
function pauseMusic() {
  playBtn.classList.remove("paused");
  playBtn.querySelector("i").innerText = "play_arrow"; // I couldn't use the i itselt directly
  mainAudio.pause();
  playingSong();
}
playBtn.addEventListener("click", () => {
  const isMusicPlay = playBtn.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

//2- prev Button
function prevMusic() {
  currentMusic--;
  currentMusic < 1
    ? (currentMusic = allMusic.length)
    : (currentMusic = currentMusic);
  loadMusic(currentMusic);
  playMusic();
}
prevBtn.addEventListener("click", () => {
  prevMusic();
});

//3- next Button
function nextMusic() {
  currentMusic++;
  currentMusic > allMusic.length
    ? (currentMusic = 1)
    : (currentMusic = currentMusic);
  loadMusic(currentMusic);
  playMusic();
}
nextBtn.addEventListener("click", () => {
  nextMusic();
});

//4- repating
//changing the icon on click
repeatBtn.addEventListener("click", () => {
  const icon = repeatBtn.innerText;

  switch (icon) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback Shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});
//choose behavior on icon
mainAudio.addEventListener("ended", () => {
  let icon = repeatBtn.innerText;

  switch (icon) {
    case "repeat":
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(currentMusic);
      playMusic();
      break;

    case "shuffle":
      let indx = Math.floor(Math.random() * allMusic.length + 1);
      do {
        indx = Math.floor(Math.random() * allMusic.length + 1);
      } while (currentMusic == indx);
      currentMusic = indx;
      loadMusic(currentMusic);
      playMusic();
      playingSong();
      break;
  }
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
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  //updating current time
  let currentMin = Math.floor(currTime / 60);
  let currentSec = Math.floor(currTime % 60);
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
  playMusic();
  playingSong();
});

//play list button
//1- show and hide music list
moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

closemoreMusic.addEventListener("click", () => {
  moreMusicBtn.click();
});

//2- Building the Plist according to current song
for (let i = 0; i < allMusic.length; i++) {
  let liTag = `
        <li class="plist-song" li-index="${i + 1}">
            <div>
                <span>${allMusic[i].name}</span>
                <p>${allMusic[i].artist}</p>
            </div>
            <span id="${allMusic[i].src}" class="audio-duration"></span>
            <audio class="${allMusic[i].src}" src="songs/${
    allMusic[i].src
  }.mp3"></audio>
        </li>`;

  pListBody.insertAdjacentHTML("beforeend", liTag);

  let liAudioDurationTag = pListBody.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = pListBody.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

//3-playing song in plist
function playingSong() {
  for (let j = 0; j < pListBody.querySelectorAll("li").length; j++) {
    let audioTag = pListBody
      .querySelectorAll("li")
      [j].querySelector(".audio-duration"); //audio-duration from the created Li tag

    if (pListBody.querySelectorAll("li")[j].classList.contains("playing")) {
      pListBody.querySelectorAll("li")[j].classList.remove("playing");

      let addDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = addDuration;
    }

    if (
      pListBody.querySelectorAll("li")[j].getAttribute("li-index") ==
      currentMusic
    ) {
      pListBody.querySelectorAll("li")[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    pListBody
      .querySelectorAll("li")
      [j].setAttribute("onclick", "clickMusic(this)");
  }
}

function clickMusic(element) {
  let getLiIndex = element.getAttribute("li-index");
  console.log(getLiIndex);
  currentMusic = getLiIndex;
  loadMusic(currentMusic);
  playMusic();
  playingSong();
}
