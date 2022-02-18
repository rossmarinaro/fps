import { config } from './Config.js';

export class HUD {

    constructor(scene)
    {
        this.scene = scene;
        this.crossHairs = null;
        this._init();
    }
    _init()
    {

    ////desktop only
        if (!config.mobileAndTabletCheck())
            document.getElementById("info-text").innerHTML = `<div>Use WASD to move, Q and E to tilt, right mouse button to aim and left mouse button to shoot.</div>`;
    //------------- UI 

        ////current weapon
        //this.scene.add.sprite(200, 200, 'automac1000_thumbnail').setAlpha(0.3);
      //this.add.graphics({fillStyle: {color: 0xB50003, alpha: 0.2}}).fillRoundedRect(10, 5, 340, 170, 20);

        this.crossHairs = this.scene.add.circle(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2, 4, 0xff0000);
        this.crossHairs.depth = 1;

    //----------- on scene update

        this.scene.events.on('update', ()=> this.crossHairs.alpha = 1);
    }
}