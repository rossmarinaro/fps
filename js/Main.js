

import { HUD } from './HUD.js';
import { Controller } from './Controller.js';
import { Player } from './Player.js';

const { Scene3D} = ENABLE3D;


export default class Main extends Scene3D {
  constructor() {
    super({ key: 'Main' })
  }
   
  create()
  {
      this.accessThirdDimension({ maxSubSteps: 10, fixedTimeStep: 1 / 180 });
      this.third.warpSpeed('-orbitControls');
      this.third.haveSomeFun(50);
      this.third.renderer.gammaFactor = 1.5;

      this.player = new Player(this);
      this.hud = new HUD(this);
      this.controller = new Controller(this, this.player.self, this.hud);
  }
}

