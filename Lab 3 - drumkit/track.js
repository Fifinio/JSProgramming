class Sound { 
    key;
    timestamp;
    constructor(key, timestamp){
        this.key = key;
        this.timestamp = timestamp;
    }
}

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

  stopRecording() {
    this.isRecording = false;
  }

  recordSound(recordingStartTime, e){
    if(this.isRecording){
      const sound = new Sound(e.key, new Date() - recordingStartTime)
      this.sounds.push(sound)
    }
  }
}