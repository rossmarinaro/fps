
export default class Preload extends Phaser.Scene{
    constructor(){
        super('Preload');
    }
    preload()
    {
        this.load.plugin('rexvirtualjoystickplugin', 'js/plugins/joystick.js', true); 
        this.load.image('automac1000_thumbnail', 'assets/automac1000.png');
    }
    create()
    {
        this.scene.run('Main', {});
        this.scene.stop('Preload');
    }
}