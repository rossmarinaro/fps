
export default class Preload extends Phaser.Scene{
    constructor(){
        super('Preload');
    }
    preload()
    {
        this.load.plugin('rexvirtualjoystickplugin', 'js/plugins/joystick.js', true); 
        this.load.image('automac1000_thumbnail', 'assets/automac1000.png');
        this.load.audio('gunshot', 'assets/pistol_shot.ogg');
        this.load.audio('automac1000_shot', 'assets/automac1000.ogg');
    }
    create()
    {
        this.scene.run('Main', {});
        this.scene.stop('Preload');
    }
}