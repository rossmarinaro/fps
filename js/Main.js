

import { HUD } from './HUD.js';
import { Controller } from './Controller.js';               
import { Player } from './Player.js';

// import * as THREE from './plugins/enable3d_framework';
const { Scene3D, ExtendedObject3D, THREE } = ENABLE3D;


export default class Main extends Scene3D {
  constructor() {
    super({ key: 'Main' })
  }
   
  create()
  {
      console.log(this)
      this.accessThirdDimension({ maxSubSteps: 10, fixedTimeStep: 1 / 180 });
      this.third.warpSpeed('-orbitControls');
      this.third.haveSomeFun(50);
      this.third.renderer.gammaFactor = 1.5;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xff0000);
      scene.fog = new THREE.Fog(0x00000, 250, 1400);
      const dirlight = new THREE.DirectionalLight(0xffff00, 0.5);
      dirlight.position.set(0, 0, 1).normalize();
      scene.add(dirlight);


      this.player = new Player(this);
      this.hud = new HUD(this);
      this.controller = new Controller(this, this.player.self, this.hud);    
      
      this.third.load.gltf('assets/robot.glb').then(object => {
        const robot = object.scene
        this.robot = new ExtendedObject3D();
        this.robot.name = 'robot';
        this.robot.add(robot);
        this.third.add.existing(this.robot);
        this.third.physics.add.existing(this.robot, { shape: 'sphere', radius: 1, z: this.robot.position.x, y: this.robot.position.y });
        this.robot.body.setCollisionFlags(0);    console.log(this.robot);
        this.robot.traverse(child => {
          if (child.isMesh) 
          {
            child.castShadow = child.receiveShadow = true;
            if (child.material) 
            {
                 child.material.metalness = 0.4;
                 child.material.shininess = 50;
                // child.material.reflectivity = 2

            }
          }
        });
      });



  }
}

