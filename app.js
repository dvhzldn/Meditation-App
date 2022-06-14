const app = () => {

const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle')
const video = document.querySelector('.vid-container video')

//Sounds
const sounds = document.querySelectorAll('.sound-picker button');
//Time display
const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select button');
// Get length of outline
const outlineLength = outline.getTotalLength();
// Duration
let fakeDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;


// Sound section
sounds.forEach(function (sound) {
    sound.addEventListener('click', function(){
        song.src = this.getAttribute('data-sound')
        video.src = this.getAttribute('data-video')
        checkPlaying(song);
    })
})

// Play sound
    play.addEventListener('click', function () {
        checkPlaying(song);
    });

// Select a sound
    timeSelect.forEach(function(option) {
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)} minutes`
        });
    });

// Hide timer on hover
//timeDisplay.forEach(function(display) {
//display.addEventListener('mouseover', function() {
//            timeDisplay.textContent = ""
//            })
//    })

// Stop and play sounds
    const checkPlaying = function(song) {
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
            console.log("play")        
           
        
        }
        else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'
            console.log("pause")        }
    }

//Playback circle animation
    song.ontimeupdate = function() {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        let textMinutes = Math.floor(elapsed / 60) + 1;

    //Animate circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    // Animate the text
    if (textMinutes <=1 ) {
        timeDisplay.textContent = `${textMinutes} minute`
        console.log(`${minutes} + {seconds}`)
    } else
    timeDisplay.textContent = `${textMinutes} minutes`
    console.log(`${minutes}:${seconds}`)
    
    if(currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
    }    
}


}


app();