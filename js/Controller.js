
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
        this.shoot = null;
        this.joystick1 = null;
        this.joystick2 = null;
        this.shootButton = null;
        this.default = {
            controls: {
                joyStick: null,
                joystickLocked: true,
                buttonsLocked: false
            },
            mobileAndTabletCheck: function () {
                let check = false;
                (function (a) {
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
                })(navigator.userAgent || navigator.vendor || window.opera);
                return check;
            }
        };
        this._init(); 
    }
    _init()                                    
    {
        if (this.default.mobileAndTabletCheck()) 
        {
            this.deviceCheck = true;
            this.joystickBase1 = this.scene.add.circle(100, 450, 60, 0x000000).setAlpha(0.5);
            this.joystickThumb1 = this.scene.add.circle(100, 450, 40, 0xcccccc).setAlpha(0.5);
            this.joystick1 = this.scene.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
                forceX: 0,
                forceY: 0,
                x: 100,
                y: 400,
                radius: 80,
                base: this.joystickBase1,
                thumb: this.joystickThumb1
            });
            this.joystickBase2 = this.scene.add.circle(400, 450, 60, 0x000000).setAlpha(0.5);
            this.joystickThumb2 = this.scene.add.circle(600, 450, 40, 0xcccccc).setAlpha(0.5);
            this.joystick2 = this.scene.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
                forceX: 0,
                forceY: 0,
                x: 400,
                y: 400,
                radius: 80,
                base: this.joystickBase2,
                thumb: this.joystickThumb2
            });
            this.shootButton = this.scene.add.circle(100, 500, 20, 0xcccccc)
            .setInteractive()
            .on('pointerdown', ()=> this.shoot = true)
            .on('pointerup', ()=> this.shoot = false)
            .on('pointerout', ()=> this.shoot = false);
        }
        else 
            this.deviceCheck = false;


    /// add keys
        this.keys = {
            w: this.scene.input.keyboard.addKey('w'),
            a: this.scene.input.keyboard.addKey('a'),
            s: this.scene.input.keyboard.addKey('s'),
            d: this.scene.input.keyboard.addKey('d'),
            q: this.scene.input.keyboard.addKey('q'),
            e: this.scene.input.keyboard.addKey('e')
        }
    //// add first person controls

        this.firstPersonControls = new FirstPersonControls(this.scene.third.camera, this.player.object, {});

    //// lock the pointer and update the first person control

        this.scene.input.on('pointerdown', () => {
            if (this.shootButton !== null)
                this.scene.input.mouse.requestPointerLock();
        })
        .on('pointermove', pointer => {
            if (this.scene.input.mouse.locked /* && this.joystick1 !== null */) 
                this.firstPersonControls.update(pointer.movementX, pointer.movementY); 
        });


    //------------ on scene update
        this.scene.events.on('update', (time, delta) => {
             
            this.firstPersonControls.update(0, 0);
 
            this.zoom = this.scene.input.mousePointer.rightButtonDown(),
            this.shoot = this.scene.input.mousePointer.leftButtonDown(),
            this.direction = new THREE.Vector3(),
            this.rotation = this.scene.third.camera.getWorldDirection(this.direction);
            this.speed = 0.1;
            this.theta = Math.atan2(this.rotation.x, this.rotation.z);

        ////check device
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
