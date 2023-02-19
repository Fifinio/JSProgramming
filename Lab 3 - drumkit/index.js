const keyToSound = {
    "a": document.querySelector("#boom"),
    "s": document.querySelector("#clap"),
    "d": document.querySelector("#hihat"),
    "f": document.querySelector("#kick"),
    "g": document.querySelector("#openhat"),
    "h": document.querySelector("#ride"),
    "j": document.querySelector("#snare"),
    "k": document.querySelector("#tink"),
    "l": document.querySelector("#tom")
}
const keyboard = document.querySelector('#keyboard')
const tracksContainer = document.querySelector("#tracks");
const recordIcon = '<img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-record-button-music-dreamstale-lineal-dreamstale.png"/>';
const tracks = [new Track('track1'), new Track('track2'), new Track('track3')];
let currentTrack = tracks[0];
var recordingStartTime = 0;

const init = () => {
    Object.keys(keyToSound).forEach(key => {
        keyboard.appendChild(kbdTagFromKey(key))
    })
    renderTracks();
}
const renderTracks = () => {
    tracksContainer.innerHTML = '';
    tracks.forEach(track => {
        let trackTag = document.createElement('div');
        trackTag.classList.add('track')
        trackTag.addEventListener('click', e => {
            clearActiveTrackClasses(trackTag);
            currentTrack = track;
            trackTag.classList.add('active');
        })
        trackTag.appendChild(createRecordButton(track))
        const soundsContainer = document.createElement('div');
        soundsContainer.classList.add('sounds-container')
        trackTag.appendChild(soundsContainer)
        track.sounds.forEach(sound => {
            let soundTag = document.createElement('div');
            soundsContainer.appendChild(kbdTagFromKey(sound.key))

        })
        tracksContainer.appendChild(trackTag)
        trackTag.appendChild(createPlayButton(track))
    })
}

const onKeyPress = (e) => {
    const sound = keyToSound[e.key]
    if(currentTrack) currentTrack.recordSound(recordingStartTime, e)
    if(sound) playSound(sound)
    else throw new Error("there is no sound for " + e.key)
}

const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
}

const playTrack = (track) =>{
    track.sounds.forEach(sound => {
        setTimeout(() => {
            playSound(keyToSound[sound.key])
        }, sound.timestamp)
    })
}

const startRecording = () =>{
    if(currentTrack.isRecording) return;
    currentTrack.startRecording()
    recordingStartTime = Date.now();
    currentTrack.sounds = [];
}
const endRecording = () => {
    currentTrack.stopRecording()
    // clear tracks and re-render
    renderTracks();
}

const clearActiveTrackClasses = (trackTag, eventTarget) => {
    tracksContainer.querySelectorAll('.track').forEach(track => {
        track.classList.remove('active')
    })
}
const createRecordButton = (track) => {
    let recordButton = document.createElement('button');
    recordButton.innerHTML = recordIcon;
    recordButton.addEventListener('click', () => {
        if(track.isRecording) {
            endRecording();
            recordButton.innerHTML = recordIcon;
        } else {
            startRecording();
            recordButton.innerHTML = '<img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-stop-button-music-dreamstale-lineal-dreamstale.png"/>';
        }
    })
    return recordButton;
}

const createPlayButton = (track) => {
    let playButton = document.createElement('button');
    playButton.innerHTML = '<img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-play-button-music-dreamstale-lineal-dreamstale.png"/>';
    playButton.addEventListener('click', () => {
        playTrack(track)
    })
    return playButton;
}

const kbdTagFromKey = (key) => {
    let kbdTag = document.createElement('kbd')
    kbdTag.textContent = key;
    return kbdTag;
}

document.addEventListener("DOMContentLoaded",init) 
document.addEventListener("keypress", onKeyPress)

