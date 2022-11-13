const keyToSound = {
    "a": document.querySelector("#boom"),
    "s": document.querySelector("#clap"),
    "d": document.querySelector("#hihat"),
    "q": document.querySelector("#kick"),
    "w": document.querySelector("#openhat"),
    "r": document.querySelector("#ride"),
    "e": document.querySelector("#snare"),
    "t": document.querySelector("#tink"),
    "g": document.querySelector("#tom")
}
const keyboard = document.querySelector('#keyboard')
const currentTrack = new Track('track1');
const recordingStartTime = 0;
currentTrack.startRecording()

const init = () => {
    Object.keys(keyToSound).forEach(key => {
        let kbdTag = document.createElement('kbd')
        kbdTag.textContent = key;
        keyboard.appendChild(kbdTag)
    })
}

const onKeyPress = (e) => {
    const sound = keyToSound[e.key]
    // there should be a an action done related to the recording
    console.log(currentTrack)
    if(currentTrack) currentTrack.recordSound(recordingStartTime, e)
    if(sound) playSound(sound)
    else throw new Error("there is no sound for " + e.key)
}

const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
}

const startRecording = () =>{
    if(currentTrack.isRecording) return;
    currentTrack.startRecording()
    recordingStartTime = new Date()
    // 3.record keypresses and their timestamp
// 
}
const endRecording = () => {
    currentTrack.stopRecording()
}
document.addEventListener("DOMContentLoaded",init) 
document.addEventListener("keypress", onKeyPress)

const recordKeyPress = (e, channel) => {
    channel.sounds.push(timestampedSound(e))
}