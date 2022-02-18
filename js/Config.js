
import Preload from './Preload.js'
import Main from './Main.js';

const { enable3d, Canvas } = ENABLE3D;

export const config = {
    type: Phaser.WEBGL,
    transparent: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: window.innerWidth,
      height: window.innerHeight
    },
    scene: [Preload, Main],
    ...Canvas({ antialias: true })
  }
  
  window.addEventListener('load', () => {
    enable3d(() => new Phaser.Game(config)).withPhysics('/wasm')
  });
