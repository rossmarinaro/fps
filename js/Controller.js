import { config } from './Config.js';
const { FirstPersonControls, THREE           ,ExtendedObject3D} = ENABLE3D;


export class Controller {

    constructor(scene, player)
    {
        this.scene = scene;
        this.player = player;
        this.speed = 0;
        this.theta = 0;
        this.direction = 0;
        this.rotation = 0;
        this.zoom = false;
        this.shoot = false;
        this.isFiring = false
        this.joystick1 = null;
        this.joystick2 = null;
        this.shootButton = null;
        this.zoomButton = null;
        
        this._init(); 
    }
    _init()                                    
    {
        if (config.mobileAndTabletCheck()) 
        {
            this.deviceCheck = true;
            this.scene.input.addPointer(1);
            this.joystickBase1 = this.scene.add.circle(100, 450, 60, 0x000000).setAlpha(0.5);
            this.joystickThumb1 = this.scene.add.circle(100, 450, 40, 0xcccccc).setAlpha(0.5);
            this.joystick1 = this.scene.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
                forceX: 0,
                forceY: 0,
                x: 100,
                y: 450,
                radius: 80,
                base: this.joystickBase1,
                thumb: this.joystickThumb1
            });
            this.joystickBase2 = this.scene.add.circle(this.scene.scale.width - 50, 450, 60, 0x000000).setAlpha(0.5);
            this.joystickThumb2 = this.scene.add.circle(this.scene.scale.width - 100, 450, 40, 0xcccccc).setAlpha(0.5);
            this.joystick2 = this.scene.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
                forceX: 0,
                forceY: 0,
                x: this.scene.scale.width - 100,
                y: 450,
                radius: 80,
                base: this.joystickBase2,
                thumb: this.joystickThumb2
            });
            this.shootButton = this.scene.add.circle(100, 550, 20, 0x000000).setAlpha(0.5)
                .setInteractive()
                .on('pointerdown', ()=> this.shoot = true)
                .on('pointerup', ()=> this.shoot = false)
                .on('pointerout', ()=> this.shoot = false);
            this.zoomButton = this.scene.add.circle(this.scene.scale.width - 100, 550, 20, 0x000000).setAlpha(0.5)
                .setInteractive()
                .on('pointerdown', ()=> this.zoom = true)
                .on('pointerup', ()=> this.zoom = false)
                .on('pointerout', ()=> this.zoom = false);
        }
        else ////keyboard
        {
            this.deviceCheck = false;
            this.keys = {
                w: this.scene.input.keyboard.addKey('w'),
                a: this.scene.input.keyboard.addKey('a'),
                s: this.scene.input.keyboard.addKey('s'),
                d: this.scene.input.keyboard.addKey('d'),
                q: this.scene.input.keyboard.addKey('q'),
                e: this.scene.input.keyboard.addKey('e')
            }
        //// lock the pointer and update the first person control

            this.scene.input
            .on('pointerdown', () => this.scene.input.mouse.requestPointerLock())
            .on('pointermove', pointer => {
                if (this.scene.input.mouse.locked) 
                    this.firstPersonControls.update(pointer.movementX, pointer.movementY); 
            });
        }

        this.muzzleFlashParticles = this.scene.add.particles('particles', 'fr08').setDepth(100);
        this.muzzleFlash = this.muzzleFlashParticles.createEmitter({ speed: 100, scale: { start: 1, end: 0 }, x: -1000, y: -1000, lifespan: 1000, blendMode: 'ADD' }).setAlpha(0.95);

   
    //// add first person controls

        this.firstPersonControls = new FirstPersonControls(this.scene.third.camera, this.player.object, {});

        
    //------------ on scene update
        this.scene.events.on('update', (time, delta) => {
             
            this.firstPersonControls.update(0, 0);
 
            this.direction = new THREE.Vector3(),
            this.rotation = this.scene.third.camera.getWorldDirection(this.direction);
            this.speed = 0.1;
            this.theta = Math.atan2(this.rotation.x, this.rotation.z);

        ////update depending on device
            this.deviceCheck === true ? this.dumpJoyStickState(time) : this.dumpKeyState(time);

            if (this.shoot === false)
                config.audio.stop('automac1000_shot', this.scene);
        });
    }

//---------------------------- METHODS

    defaultStance(time)
    {
        this.steady = ()=>{
            this.player.movement.x = Math.sin(time * -0.015) * 0.075;
            this.player.movement.y = Math.sin(time * 0.015) * 0.075;
            this.player.movement.z = Math.sin(time * 0.015) * 0.075;
        }
        this.trot = ()=>{
            this.player.movement.x = Math.sin(time * -0.003) * 0.01;
            this.player.movement.y = Math.sin(time * 0.003) * 0.01;
            this.player.movement.z = Math.sin(time * 0.003) * 0.01;
        }
        if (this.keys !== undefined) 
            this.keys.w.isDown ? this.steady() : this.trot();
        else 
            this.joystick1.forceY < -40 ? this.steady() : this.trot();
    }
    zoomWeapon()
    {
        //this.crossHairs.alpha = 0
        this.player.movement.x = THREE.MathUtils.lerp(this.player.movement.x, 0.6, 0.2);
        this.player.movement.y = THREE.MathUtils.lerp(this.player.movement.y, -0.8 + 1.8, 0.2);
        this.player.movement.z = THREE.MathUtils.lerp(this.player.movement.z, -0.45, 0.2);
    }
    fireWeapon()
    {

        if (this.isFiring === true)
            return;

        this.isFiring = true;

        config.audio.play('automac1000_shot', 2, false, this.scene, 0);
        this.scene.time.delayedCall(250, ()=> this.isFiring = false);
      
        const x = 0,
            y = 0,
            force = 5,
            pos = new THREE.Vector3(),
            raycaster = new THREE.Raycaster();
            raycaster.setFromCamera({ x, y }, this.scene.third.camera);
        pos.copy(raycaster.ray.direction);

        pos.add(raycaster.ray.origin);
    
        const bullet = this.scene.third.physics.add.sphere({ radius: 0.1, /* x: this.scene.player.muzzlePoint.position.x, y: this.scene.player.muzzlePoint.position.y, z: this.scene.player.muzzlePoint.position.z */  x: pos.x, y: pos.y, z: pos.z, mass: 1, bufferGeometry: true }, { phong: { color: 0xFCEF03 } });
        pos.copy(raycaster.ray.direction);
        pos.multiplyScalar(24);
        bullet.body.applyForce(pos.x * force, pos.y * force, pos.z * force);


            //const bullet = this.scene.third.physics.add.sphere({ radius: 0.1, x: pos.x, y: pos.y, z: pos.z, mass: 1, bufferGeometry: true }, { phong: { color: 0xFCEF03 } });
            //this.scene.third.load.gltf('assets/macaroni.glb').then(object => {
            //     const bullet = object.scene
            //     this.bullet = new ExtendedObject3D();
            //     this.bullet.name = 'bullet';
            //     this.bullet.add(bullet);
            //     this.scene.third.add.existing(this.bullet);
            //     pos.copy(raycaster.ray.direction);
            //     pos.multiplyScalar(24);
            //     //this.scene.third.physics.add.existing(this.bullet, { shape: 'sphere', radius: 1, z: this.bullet.position.x, y: this.bullet.position.y });
            //     //this.bullet.body.setCollisionFlags(0);
            //    // bullet.body.applyForce(pos.x * force, pos.y * force, pos.z * force);
            //     this.bullet.traverse(child => {
            //       if (child.isMesh) 
            //       {
            //         child.castShadow = child.receiveShadow = true;
            //         if (child.material) 
            //         {
                       
                    
                
        
            //         }
            //       }
            //     });
           // });
        //const ballBody = createRigidBody( ball, ballShape, ballMass, pos, quat );
        //ballBody.setFriction( 0.5 );

  
        //ballBody.setLinearVelocity( new THREE.Vector3( pos.x, pos.y, pos.z ) );

        //this.muzzleFlash.emitParticle(5, 310, 400);
        //this.muzzleFlash.explode(-1);
    }
    moveRight()
    {
        this.player.object.position.x += Math.sin(this.theta - Math.PI * 0.5) * this.speed;
        this.player.object.position.z += Math.cos(this.theta - Math.PI * 0.5) * this.speed;
    }
    moveLeft()
    {
        this.player.object.position.x += Math.sin(this.theta + Math.PI * 0.5) * this.speed;
        this.player.object.position.z += Math.cos(this.theta + Math.PI * 0.5) * this.speed;
    }
    moveUp()
    {
        this.player.object.position.x += Math.sin(this.theta) * this.speed;
        this.player.object.position.z += Math.cos(this.theta) * this.speed;
    }
    moveDown()
    {
        this.player.object.position.x -= Math.sin(this.theta) * this.speed;
        this.player.object.position.z -= Math.cos(this.theta) * this.speed;
    }

//-------------------------------keyboard

    dumpKeyState(time)
    {
        this.zoom = this.scene.input.mousePointer.rightButtonDown();
        this.shoot = this.scene.input.mousePointer.leftButtonDown();
        
        if (this.keys.q.isDown) 
        {
          this.scene.third.camera.rotateZ(0.2);
          this.firstPersonControls.offset = new THREE.Vector3(Math.sin(this.theta + Math.PI * 0.5) * 0.4, 0, Math.cos(this.theta + Math.PI * 0.5) * 0.4);
        } 
        else if (this.keys.e.isDown) 
        {
          this.scene.third.camera.rotateZ(-0.2);
          this.firstPersonControls.offset = new THREE.Vector3(Math.sin(this.theta - Math.PI * 0.5) * 0.4, 0, Math.cos(this.theta - Math.PI * 0.5) * 0.4);
        } 
        else 
        {
          this.scene.third.camera.rotateZ(0);
          this.firstPersonControls.offset = new THREE.Vector3(0, 0, 0)
        }

    //// the rifle movement
        this.zoom ? this.zoomWeapon() : this.defaultStance(time);

    //// move forwards and backwards
        if (this.keys.w.isDown) 
            this.moveUp(); 
        else if (this.keys.s.isDown) 
            this.moveDown();
    //// move sideways
        if (this.keys.a.isDown) 
            this.moveLeft();
        else if (this.keys.d.isDown) 
            this.moveRight();
    
    //// shoot
        if (this.shoot) 
          this.fireWeapon();
    }

    //--------------------------- joysticks 

    dumpJoyStickState(time)   
    {
        if (this.joystick1 !== null)
        {
            if (this.joystick1.forceX > 40)
                this.moveRight();
            else if (this.joystick1.forceX < -40) 
                this.moveLeft();
            else if (this.joystick1.forceY < -40) 
                this.moveUp();
            else if (this.joystick1.forceY > 40) 
                this.moveDown();       
        }
        if (this.joystick2 !== null)
            this.firstPersonControls.update(this.joystick2.forceX  / 5, this.joystick2.forceY / 5); 

        this.zoom ? 
            this.zoomWeapon() : this.defaultStance(time);

        if (this.shoot) 
            this.fireWeapon();
    }
}