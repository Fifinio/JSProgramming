class Track {
  name = "";
  sounds = [];
  isRecording = false;
  constructor(name) {
    this.name = name;
  }

  startRecording() {
    this.isRecording = true;
  }

  recordSound(recordingStartTime, e){
    if(this.isRecording){
      const sound = new Sound(e.key, new Date() - recordingStartTime)
      this.sounds.push(sound)
    }
  }

  stopRecording() {
    this.isRecording = false;
  }

  play(){
    this.sounds.forEach(sound => {
      setTimeout(() => {
        playSound(sound.key)
      }, sound.timestamp)
    })
  }
}