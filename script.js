console.log("Welcome to APE")

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Criminal", filePath: "songs/1.mp3", coverPath: "cover-pics/criminal-cover.jpg"},
    {songName: "IUKUK", filePath: "songs/2.mp3", coverPath: "cover-pics/amantejhundal-cover.jpg"},
    {songName: "Excuses", filePath: "songs/3.mp3", coverPath: "cover-pics/excuses-cover1.jpg"},
    {songName: "What Ve", filePath: "songs/4.mp3", coverPath: "cover-pics/What ve.jpg"},
    {songName: "Jean", filePath: "songs/5.mp3", coverPath: "cover-pics/jean1.jpg"},
    {songName: "Ykwim", filePath: "songs/6.mp3", coverPath: "cover-pics/ykwim.jpg"}
]

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

});
// audioElement.play();

//Handle Play and Pause Click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle'); 
        masterPlay.classList.add('fa-pause-circle'); 
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle'); 
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //UpdateSeekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 1000);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/1000;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        console.log(e.target.classList);
        // if(e.target.classList[2]=='fa-play-circle'){

        //     e.target.classList.remove('fa-play-circle');
        //     e.target.classList.add('fa-pause-circle');
        // }else{
        //     e.target.classList.add('fa-play-circle');
        //     e.target.classList.remove('fa-pause-circle');
        // }
        
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // if(e.target.classList[2]=='fa-play-circle'){

        //     e.target.classList.remove('fa-play-circle');
        //     e.target.classList.add('fa-pause-circle');
        // }else{
        //     e.target.classList.add('fa-play-circle');
        //     e.target.classList.remove('fa-pause-circle');
        // }
        
    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex>6) {
        songIndex = 0;
    }

    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex<=0) {
        songIndex = 0;
    }

    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})