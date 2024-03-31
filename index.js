const wrapper=document.querySelector(".wrapper"),
        musicImg=wrapper.querySelector("img"),
        musicName=wrapper.querySelector(".name"),
        musicArtist=wrapper.querySelector(".artist"),
        playPauseBtn=wrapper.querySelector(".play-pause"),
        prevBtn=wrapper.querySelector("#prev"),
        nextBtn=wrapper.querySelector("#next"),
        mainAudio=wrapper.querySelector("#main-audio"),
        progressArea=wrapper.querySelector(".progress-area"),
        progressBar=progressArea.querySelector(".progress-bar");


let allMusic=[
    {
        name: "Jail",
        artist: "Kanye West",
        img: "10",
        src:"01"
    },
    {
        name: "Hurrican",
        artist: "Kanye West",
        img: "20",
        src:"02"
    },
    {
        name: "jonah",
        artist: "Kanye West",
        img: "30",
        src:"03"
    },
    {
        name: "moon",
        artist: "Kanye West",
        img: "40",
        src:"04"
    },
    {
        name: "24",
        artist: "Kanye West",
        img: "50",
        src:"05"
    },
];

let musicIndex =Math.floor((Math.random( )*allMusic.length) + 1);

isMusicPaused=true;

window.addEventListener("load", ()=> {
    loadMusic(musicIndex);
});

function loadMusic(indexNum){
    musicName.innerText= allMusic[indexNum - 1].name;
    musicArtist.innerText=allMusic[indexNum - 1].artist;
    musicImg.src = `assets/images/${allMusic[indexNum - 1].src}.jpg`;
    mainAudio.src = `assets/songs/${allMusic[indexNum - 1].src}.mp3`;
}

function playMusic(){
    wrapper.classList.add("paused");
    musicImg.classList.add('rotate');
    playPauseBtn.innerHTML= `<i class="fa-solid fa-pause"></i>`;
    mainAudio.play();
}
function pauseMusic(){
    wrapper.classList.remove("paused");
    musicImg.classList.remove('rotate');
    playPauseBtn.innerHTML= `<i class="fa-solid fa-play"></i>`;
    mainAudio.pause();
}

function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex=allMusic.length : musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex - 1: musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", ()=> {
    const isMusicPlay =wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
})

prevBtn.addEventListener("click", ()=> {
    prevMusic();
})

nextBtn.addEventListener("click", ()=> {
    nextMusic();
})

mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime= e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth= (currentTime/duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuration= wrapper.querySelector(".max-duration");

    mainAudio.addEventListener("loadeddata", ()=>{
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration /60 );
        let totalSec = Math.floor(mainAdDuration % 60);
        if(totalSec<10){
            totalSec= `0${totalSec}`;
        }
        musicDuration.innerHTML= `${totalMin}:${totalSec}`;
    });
    let currentMin = Math.floor(currentTime/60);
    let currentSec =Math.floor(currentTime % 60);
    if(currentSec <10){
        currentSec= `0${currentSec}`;
    }
    musicCurrentTime.innerText= `${currentMin}:${currentSec}`;
});

progressArea.addEventListener( "click" ,(e)=> {
    let progressWidth = progressArea.clientWidth;
    let clickOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickOffsetX / progressWidth)* songDuration;
    playMusic();
});

mainAudio.addEventListener( 'ended',() => {
    nextMusic();
});


const volumeIconStart = document.querySelector('.volume-icon-start');
const volumeIconEnd = document.querySelector('.volume-icon-end');
const volumeRange = document.querySelector('.volume-range');

volumeIconStart.addEventListener('click', () => {
  mainAudio.volume = Math.min(mainAudio.volume + 0.1, 1);
  volumeRange.value = (Math.min(mainAudio.volume + 0.1, 1) * 100).toFixed(0);
});

volumeIconEnd.addEventListener('click', () => {
  mainAudio.volume = Math.max(mainAudio.volume - 0.1, 0);
  volumeRange.value = (Math.max(mainAudio.volume - 0.1, 0) * 100).toFixed(0);
});

volumeRange.addEventListener('input', () => {
  mainAudio.volume = volumeRange.value / 100;
});
