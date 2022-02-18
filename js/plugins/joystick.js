!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).rexvirtualjoystickplugin=e()}(this,function(){"use strict";function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function t(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function n(t,e){return(n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function o(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(i){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=a(i);if(r){var n=a(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return o(this,t)}}function r(t,e,n){return(r="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var i=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=a(t)););return t}(t,e);if(i){var r=Object.getOwnPropertyDescriptor(i,e);return r.get?r.get.call(n):r.value}})(t,e,n||t)}var u=Phaser.Input.Keyboard.Key,l=Phaser.Input.Keyboard.KeyCodes,e=function(){function e(t){h(this,e),this.cursorKeys={up:new u(t,l.UP),down:new u(t,l.DOWN),left:new u(t,l.LEFT),right:new u(t,l.RIGHT)},this.noKeyDown=!0}return t(e,[{key:"shutdown",value:function(){for(var t in this.cursorKeys)this.cursorKeys[t].destroy();this.cursorKeys=void 0}},{key:"destroy",value:function(t){shutdown(t)}},{key:"createCursorKeys",value:function(){return this.cursorKeys}},{key:"setKeyState",value:function(t,e){var n=this.cursorKeys[t];return n.enabled&&(e&&(this.noKeyDown=!1),n.isDown!==e&&(y.timeStamp=Date.now(),e?n.onDown(y):n.onUp(y))),this}},{key:"clearAllKeysState",value:function(){for(var t in this.noKeyDown=!0,this.cursorKeys)this.setKeyState(t,!1);return this}},{key:"getKeyState",value:function(t){return this.cursorKeys[t]}},{key:"upKeyDown",get:function(){return this.cursorKeys.up.isDown}},{key:"downKeyDown",get:function(){return this.cursorKeys.down.isDown}},{key:"leftKeyDown",get:function(){return this.cursorKeys.left.isDown}},{key:"rightKeyDown",get:function(){return this.cursorKeys.right.isDown}},{key:"anyKeyDown",get:function(){return!this.noKeyDown}}]),e}(),y={altKey:!1,ctrlKey:!1,shiftKey:!1,metaKey:!1,location:0},f=180/Math.PI,v={"up&down":0,"left&right":1,"4dir":2,"8dir":3},d={},p=Phaser.Utils.Objects.GetValue,b=Phaser.Math.Distance.Between,m=Phaser.Math.Angle.Between,g=function(){s(r,e);var i=c(r);function r(t,e){var n;return h(this,r),(n=i.call(this,t)).resetFromJSON(e),n}return t(r,[{key:"resetFromJSON",value:function(t){null==this.start&&(this.start={}),null==this.end&&(this.end={}),this._enable=void 0,this.setEnable(p(t,"enable",!0)),this.setMode(p(t,"dir","8dir")),this.setDistanceThreshold(p(t,"forceMin",16));var e=p(t,"start.x",null),n=p(t,"start.y",null),i=p(t,"end.x",null),r=p(t,"end.y",null);return this.setVector(e,n,i,r),this}},{key:"toJSON",value:function(){return{enable:this.enable,dir:this.dirMode,forceMin:this.forceMin,start:{x:this.start.x,y:this.start.y},end:{x:this.end.x,y:this.end.y}}}},{key:"setMode",value:function(t){return"string"==typeof t&&(t=v[t]),this.dirMode=t,this}},{key:"enable",get:function(){return this._enable},set:function(t){if(this._enable!==t)return t||this.clearVector(),this._enable=t,this}},{key:"setEnable",value:function(t){return void 0===t&&(t=!0),this.enable=t,this}},{key:"toggleEnable",value:function(){return this.setEnable(!this.enable),this}},{key:"setDistanceThreshold",value:function(t){return t<0&&(t=0),this.forceMin=t,this}},{key:"clearVector",value:function(){return this.start.x=0,this.start.y=0,this.end.x=0,this.end.y=0,this.clearAllKeysState(),this}},{key:"setVector",value:function(t,e,n,i){if(this.clearVector(),!this.enable)return this;if(null===t)return this;if(void 0===n&&(n=t,i=e,e=t=0),this.start.x=t,this.start.y=e,this.end.x=n,this.end.y=i,0<this.forceMin&&this.force<this.forceMin)return this;var r=function(t,e,n){switch(void 0===n?n={}:!0===n&&(n=d),n.left=!1,n.right=!1,n.up=!1,n.down=!1,t=(t+360)%360,e){case 0:t<180?n.down=!0:n.up=!0;break;case 1:90<t&&t<=270?n.left=!0:n.right=!0;break;case 2:45<t&&t<=135?n.down=!0:135<t&&t<=225?n.left=!0:225<t&&t<=315?n.up=!0:n.right=!0;break;case 3:22.5<t&&t<=67.5?(n.down=!0,n.right=!0):67.5<t&&t<=112.5?n.down=!0:112.5<t&&t<=157.5?(n.down=!0,n.left=!0):157.5<t&&t<=202.5?n.left=!0:202.5<t&&t<=247.5?(n.left=!0,n.up=!0):247.5<t&&t<=292.5?n.up=!0:(292.5<t&&t<=337.5&&(n.up=!0),n.right=!0)}return n}(this.angle,this.dirMode,!0);for(var s in r)r[s]&&this.setKeyState(s,!0);return this}},{key:"forceX",get:function(){return this.end.x-this.start.x}},{key:"forceY",get:function(){return this.end.y-this.start.y}},{key:"force",get:function(){return b(this.start.x,this.start.y,this.end.x,this.end.y)}},{key:"rotation",get:function(){return m(this.start.x,this.start.y,this.end.x,this.end.y)}},{key:"angle",get:function(){return this.rotation*f}},{key:"octant",get:function(){var t=0;return this.rightKeyDown?t=this.downKeyDown?45:0:this.downKeyDown?t=this.leftKeyDown?135:90:this.leftKeyDown?t=this.upKeyDown?225:180:this.upKeyDown&&(t=this.rightKeyDown?315:270),t}}]),r}(),w={setEventEmitter:function(t,e){return void 0===e&&(e=Phaser.Events.EventEmitter),this._privateEE=!0===t||void 0===t,this._eventEmitter=this._privateEE?new e:t,this},destroyEventEmitter:function(){return this._eventEmitter&&this._privateEE&&this._eventEmitter.shutdown(),this},getEventEmitter:function(){return this._eventEmitter},on:function(){return this._eventEmitter&&this._eventEmitter.on.apply(this._eventEmitter,arguments),this},once:function(){return this._eventEmitter&&this._eventEmitter.once.apply(this._eventEmitter,arguments),this},off:function(){return this._eventEmitter&&this._eventEmitter.off.apply(this._eventEmitter,arguments),this},emit:function(t){return this._eventEmitter&&t&&this._eventEmitter.emit.apply(this._eventEmitter,arguments),this},addListener:function(){return this._eventEmitter&&this._eventEmitter.addListener.apply(this._eventEmitter,arguments),this},removeListener:function(){return this._eventEmitter&&this._eventEmitter.removeListener.apply(this._eventEmitter,arguments),this},removeAllListeners:function(){return this._eventEmitter&&this._eventEmitter.removeAllListeners.apply(this._eventEmitter,arguments),this},listenerCount:function(){return this._eventEmitter?this._eventEmitter.listenerCount.apply(this._eventEmitter,arguments):0},listeners:function(){return this._eventEmitter?this._eventEmitter.listeners.apply(this._eventEmitter,arguments):[]},eventNames:function(){return this._eventEmitter?this._eventEmitter.eventNames.apply(this._eventEmitter,arguments):[]}},E=Phaser.Utils.Objects.GetValue,k=Phaser.Geom.Circle,K=Phaser.Geom.Circle.Contains,_=function(){s(u,g);var o=c(u);function u(t,e){var n;h(this,u);var i=t.scene;n=o.call(this,i,e);var r=E(e,"eventEmitter",void 0),s=E(e,"EventEmitterClass",void 0);return n.setEventEmitter(r,s),n.scene=i,n.gameObject=t,n.radius=E(e,"radius",100),t.setInteractive(new k(t.displayOriginX,t.displayOriginY,n.radius),K),n.boot(),n}return t(u,[{key:"resetFromJSON",value:function(t){return r(a(u.prototype),"resetFromJSON",this).call(this,t),this.pointer=void 0,this}},{key:"toJSON",value:function(){var t=r(a(u.prototype),"toJSON",this).call(this);return t.radius=this.radius,t}},{key:"boot",value:function(){this.gameObject.on("pointerdown",this.onKeyDownStart,this),this.gameObject.on("pointerover",this.onKeyDownStart,this),this.scene.input.on("pointermove",this.onKeyDown,this),this.scene.input.on("pointerup",this.onKeyUp,this),this.gameObject.once("destroy",this.onParentDestroy,this)}},{key:"shutdown",value:function(){this.scene&&(this.scene.input.off("pointermove",this.onKeyDown,this),this.scene.input.off("pointerup",this.onKeyUp,this),this.destroyEventEmitter(),this.pointer=void 0,this.scene=void 0,this.gameObject=void 0,r(a(u.prototype),"shutdown",this).call(this))}},{key:"destroy",value:function(t){this.shutdown(t)}},{key:"onParentDestroy",value:function(t,e){this.destroy(e)}},{key:"onKeyDownStart",value:function(t){t.isDown&&void 0===this.pointer&&(this.pointer=t,this.onKeyDown(t))}},{key:"onKeyDown",value:function(t){this.pointer===t&&t.camera&&(this.setVector(this.gameObject.x+t.camera.scrollX,this.gameObject.y+t.camera.scrollY,t.worldX,t.worldY),this.emit("update"))}},{key:"onKeyUp",value:function(t){this.pointer===t&&(this.pointer=void 0,this.clearVector(),this.emit("update"))}}]),u}();Object.assign(_.prototype,w);var D=Phaser.Utils.Objects.GetValue,O=function(){function o(t,e){h(this,o),void 0===e&&(e={});var n=D(e,"eventEmitter",void 0),i=D(e,"EventEmitterClass",void 0);this.setEventEmitter(n,i),e.eventEmitter=this.getEventEmitter(),this.scene=t,this.base=void 0,this.thumb=void 0,this.touchCursor=void 0,this.setRadius(D(e,"radius",100)),this.addBase(D(e,"base",void 0),e),this.addThumb(D(e,"thumb",void 0));var r=D(e,"x",0),s=D(e,"y",0);this.base.setPosition(r,s),this.thumb.setPosition(r,s),D(e,"fixed",!0)&&this.setScrollFactor(0),this.boot()}return t(o,[{key:"destroy",value:function(){this.destroyEventEmitter(),this.base.destroy(),this.thumb.destroy(),this.base=void 0,this.thumb=void 0,this.touchCursor=void 0}},{key:"createCursorKeys",value:function(){return this.touchCursor.createCursorKeys()}},{key:"forceX",get:function(){return this.touchCursor.forceX}},{key:"forceY",get:function(){return this.touchCursor.forceY}},{key:"force",get:function(){return this.touchCursor.force}},{key:"rotation",get:function(){return this.touchCursor.rotation}},{key:"angle",get:function(){return this.touchCursor.angle}},{key:"up",get:function(){return this.touchCursor.upKeyDown}},{key:"down",get:function(){return this.touchCursor.downKeyDown}},{key:"left",get:function(){return this.touchCursor.leftKeyDown}},{key:"right",get:function(){return this.touchCursor.rightKeyDown}},{key:"noKey",get:function(){return this.touchCursor.noKeyDown}},{key:"pointerX",get:function(){return this.touchCursor.end.x}},{key:"pointerY",get:function(){return this.touchCursor.end.y}},{key:"pointer",get:function(){return this.touchCursor.pointer}},{key:"setPosition",value:function(t,e){return this.x=t,this.y=e,this}},{key:"x",get:function(){return this.base.x},set:function(t){this.base.x=t,this.thumb.x=t}},{key:"y",get:function(){return this.base.y},set:function(t){this.base.y=t,this.thumb.y=t}},{key:"setVisible",value:function(t){return this.visible=t,this}},{key:"toggleVisible",value:function(){return this.visible=!this.visible,this}},{key:"visible",get:function(){return this.base.visible},set:function(t){this.base.visible=t,this.thumb.visible=t}},{key:"enable",get:function(){return this.touchCursor.enable},set:function(t){this.touchCursor.setEnable(t)}},{key:"setEnable",value:function(t){return void 0===t&&(t=!0),this.enable=t,this}},{key:"toggleEnable",value:function(){return this.setEnable(!this.enable),this}},{key:"setRadius",value:function(t){return this.radius=t,this}},{key:"addBase",value:function(t,e){return this.base&&this.base.destroy(),void 0===t&&(t=this.scene.add.circle(0,0,this.radius).setStrokeStyle(3,255)),this.touchCursor=new _(t,e),this.base=t,this}},{key:"addThumb",value:function(t){return this.thumb&&this.thumb.destroy(),void 0===t&&(t=this.scene.add.circle(0,0,40).setStrokeStyle(3,65280)),this.thumb=t,this}},{key:"setScrollFactor",value:function(t){return this.base.setScrollFactor(t),this.thumb.setScrollFactor(t),this}},{key:"boot",value:function(){this.touchCursor.on("update",this.update,this)}},{key:"update",value:function(){var t=this.touchCursor,e=this.base.x,n=this.base.y;if(t.anyKeyDown)if(t.force>this.radius){var i=t.rotation;e+=Math.cos(i)*this.radius,n+=Math.sin(i)*this.radius}else e+=t.forceX,n+=t.forceY;return this.thumb.x=e,this.thumb.y=n,this}}]),o}();return Object.assign(O.prototype,w),function(){s(n,Phaser.Plugins.BasePlugin);var e=c(n);function n(t){return h(this,n),e.call(this,t)}return t(n,[{key:"start",value:function(){this.game.events.on("destroy",this.destroy,this)}},{key:"add",value:function(t,e){return new O(t,e)}}]),n}()});