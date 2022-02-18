import { config } from './Config.js';
const { FirstPersonControls, THREE } = ENABLE3D;


export class Controller {

    constructor(scene, player)
    {
        this.scene = scene;
        this.player = player;
        this.speed = 0;
        this.theta = 0;
        this.direction = 0;
        this.rotation = 0;
        this.zoom = null;
        this.shoot = false;
        this.joystick1 = null;
        this.joystick2 = null;
        this.shootButton = null;

        this._init(); 
    }
    _init()                                    
    {
        if (config.mobileAndTabletCheck()) 
        {
            this.deviceCheck = true;
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
            this.shootButton = this.scene.add.circle(100, 550, 20, 0xcccccc)
            .setInteractive()
            .on('pointerdown', ()=> this.shoot = true)
            .on('pointerup', ()=> this.shoot = false)
            .on('pointerout', ()=> this.shoot = false);
        }
        else ////keyboard
            {
                this.deviceCheck = false;
                this.zoom = this.scene.input.mousePointer.rightButtonDown();
                this.shoot = this.scene.input.mousePointer.leftButtonDown();
                this.keys = {
                    w: this.scene.input.keyboard.addKey('w'),
                    a: this.scene.input.keyboard.addKey('a'),
                    s: this.scene.input.keyboard.addKey('s'),
                    d: this.scene.input.keyboard.addKey('d'),
                    q: this.scene.input.keyboard.addKey('q'),
                    e: this.scene.input.keyboard.addKey('e')
                }
            }

   
    //// add first person controls

        this.firstPersonControls = new FirstPersonControls(this.scene.third.camera, this.player.object, {});

    //// lock the pointer and update the first person control

        this.scene.input.on('pointerdown', () => {
            if (this.shootButton === null)
                this.scene.input.mouse.requestPointerLock();
        })
        .on('pointermove', pointer => {
            if (this.scene.input.mouse.locked /* && this.joystick1 !== null */) 
                this.firstPersonControls.update(pointer.movementX, pointer.movementY); 
        });

        
    //------------ on scene update
        this.scene.events.on('update', (time, delta) => {
             
            this.firstPersonControls.update(0, 0);
 
            this.direction = new THREE.Vector3(),
            this.rotation = this.scene.third.camera.getWorldDirection(this.direction);
            this.speed = 0.1;
            this.theta = Math.atan2(this.rotation.x, this.rotation.z);

        ////update depending on device
            this.deviceCheck === true ? this.dumpJoyStickState() : this.dumpKeyState(time);

        });
    }
//---------------------------- actions
    fireWeapon()
    {
        const x = 0,
            y = 0,
            force = 5,
            pos = new THREE.Vector3(),
            raycaster = new THREE.Raycaster();
            raycaster.setFromCamera({ x, y }, this.scene.third.camera);
        pos.copy(raycaster.ray.direction);
        pos.add(raycaster.ray.origin);
        const sphere = this.scene.third.physics.add.sphere({ radius: 0.05, x: pos.x, y: pos.y, z: pos.z, mass: 1, bufferGeometry: true }, { phong: { color: 0x000000 } });
        pos.copy(raycaster.ray.direction);
        pos.multiplyScalar(24);
        sphere.body.applyForce(pos.x * force, pos.y * force, pos.z * force);
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
        if (this.zoom) 
        {
            //this.crossHairs.alpha = 0
            this.player.movement.x = THREE.MathUtils.lerp(this.player.movement.x, 0.6, 0.2)
            this.player.movement.y = THREE.MathUtils.lerp(this.player.movement.y, -0.8 + 1.8, 0.2)
            this.player.movement.z = THREE.MathUtils.lerp(this.player.movement.z, -0.45, 0.2)
        } 
        else if (this.keys.w.isDown) 
        {
            this.player.movement.x = Math.sin(time * -0.015) * 0.075
            this.player.movement.y = Math.sin(time * 0.015) * 0.075
            this.player.movement.z = Math.sin(time * 0.015) * 0.075
        } 
        else
        {
            this.player.movement.x = Math.sin(time * -0.003) * 0.01
            this.player.movement.y = Math.sin(time * 0.003) * 0.01
            this.player.movement.z = Math.sin(time * 0.003) * 0.01
        }

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

    dumpJoyStickState()   
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
            this.firstPersonControls.update(this.joystick2.forceX, this.joystick2.forceY); 
        if (this.shoot)
            this.fireWeapon();
    }
}