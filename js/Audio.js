/* AUDIO */
//import { config } from './Config.js';

export class Audio {
    constructor() 
    {
        this.noAudio = false;
        this.default = false;
        this.sound = null;
        this.cached = [];
        this.music = {
            track: '',
            fadeIn: (src, vol, scene) => {
                for (let music of scene.sound.sounds) 
                    if (music.key === config.audio.music.track) 
                        scene.tweens.add({ targets: music, volume: { value: 0, ease: 'Power1', duration: 500 }});
                let obj = scene.sound.add(src).setLoop(true).setVolume(0);
                scene.tweens.add({ targets: obj, volume: { value: vol, ease: 'Power1', duration: 3000}, onStart: ()=> obj.play()});
            },
            fadeOut: (src, vol, scene) => {
                for (let music of scene.sound.sounds) 
                {
                    if (music.key === src)
                    { 
                        scene.tweens.add({targets: music, volume: { value: 0, ease: 'Power1', duration: 3000 },  
                        onComplete: () => {
                            config.audio.music.play(scene);
                            scene.tweens.add({ targets: music, volume: { value: vol, ease: 'Power1', duration: 3000 }})
                            music.stop();
                            scene.sound.removeByKey(music); 
                        }});
                    }
                }
            },
            play: scene =>{ 
                new Promise(res =>{
                    switch (scene.data.config.currentStage)
                    {
                        //level music
                    }
                    res();
                }).then(()=> {
                    let src = scene.sound.add(config.audio.music.track).setLoop(true);
                    src.play();
                })
            }
        };
    };
    play (src, vol, loop, scene, detune) 
    {
        config.audio.cached.push(src);
        config.audio.cached.filter(e => { 
        config.audio.sound = scene.sound.add(src).setLoop(loop).setVolume(vol).setDetune(detune);
    //if sound is already in cache, remove it
            if (e.toString() === src) 
                config.audio.cached.pop(src);
            config.audio.sound.play();  
        });
    }
    stop (src, scene) 
    { 
        for (let snd of scene.sound.sounds) 
            if (snd.key == src) 
                snd.stop();
    }
}