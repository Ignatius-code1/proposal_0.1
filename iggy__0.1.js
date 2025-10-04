// iggy__0.1 - Main Entry Point
const iggy = {
  version: '0.1',
  name: 'Proposal Website',
  
  init() {
    console.log(`🚀 Starting ${this.name} v${this.version}`);
    this.setupAudio();
    this.setupEvents();
  },
  
  setupAudio() {
    const audio = new Audio('/the night we met - lord huron (slowed n reverb) - starclouds.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    window.proposalAudio = audio;
  },
  
  setupEvents() {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('✨ Proposal app ready');
    });
  }
};

// Auto-initialize
iggy.init();

export default iggy;