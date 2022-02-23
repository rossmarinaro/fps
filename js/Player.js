import { HueRotatePostFX } from "./shaders.js";


const { ExtendedObject3D, THREE } = ENABLE3D;

//import { HueRotatePostFX, slimShady } from "./shaders.js";



export class Player {

    constructor(scene)
    {
      this.scene = scene;
      this.rifle = null;                            
      this.muzzlePoint = null;
      this.self = {
        object: new ExtendedObject3D(),
        movement: { x: 0, y: 0, z: 0 }
      };
      this._init();
    }
    _init()
    {
      this.self.object.position.setY(1);
    //// render rifle
      this.scene.third.load.gltf('assets/automac1000.glb').then(object => {
        const rifle = object.scene
        this.rifle = new ExtendedObject3D();
        this.rifle.name = 'rifle';
        this.rifle.add(rifle);
        this.scene.third.add.existing(this.rifle);

        this.rifle.traverse(child => {
          if (child.isMesh) 
          {
            child.castShadow = child.receiveShadow = true;
            if (child.material) 
            {
                child.material.metalness = 0.3;   
                child.material.roughness = 0.3;
               

            }
          }
        });
        
    ////muzzle point
        this.muzzlePoint = this.scene.third.physics.add.sphere({ radius: 0.2, x: 0, y: 0, z: 0, mass: 1, bufferGeometry: true }, { phong: { color: 0xff0000 } }); 
        this.muzzlePoint.visible = false;

        //this.fog = new THREE.Fog(0xff0000, 0.25, 20);   
    //-------- on scene update
    

           this.scene.events.on('update', ()=>{
  
        //// adjust the position of the rifle to the camera
            const raycaster = new THREE.Raycaster();
    //// x and y are normalized device coordinates from -1 to +1
            raycaster.setFromCamera({ x: 0.6 - this.self.movement.x, y: -0.8 - this.self.movement.y }, this.scene.third.camera);
            const pos = new THREE.Vector3();
            pos.copy(raycaster.ray.direction);
            pos.multiplyScalar(0.8 + this.self.movement.z);
            pos.add(raycaster.ray.origin);
    
            this.rifle.position.copy(pos);
            this.rifle.rotation.copy(this.scene.third.camera.rotation);

            const pos2 = new THREE.Vector3();
            pos2.copy(raycaster.ray.direction);
            pos2.multiplyScalar(2.5 + this.self.movement.z);
            pos2.add(raycaster.ray.origin);
            this.muzzlePoint.body.setCollisionFlags(2);
            this.muzzlePoint.position.copy(pos2); 
            //const mat = new THREE.ShaderMaterial(HueRotatePostFX)

            this.muzzlePoint.body.needUpdate = true;
          
          });
      });
    }
  }