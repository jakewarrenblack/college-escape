class GameScene extends Phaser.Scene {

create() {    
    
    
this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);  
    
    
    
    
    
this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);    

// Set the blend mode to MULTIPLY. This will darken the colors of    
// everything below this sprite.   

this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

}

update(){    
    
    
this.lightSprite.reset(this.game.camera.x, this.game.camera.y);    

this.updateShadowTexture();

}

updateShadowTexture(){   
    
    // Draw shadow    
    
    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';    
    
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);    
    
    var radius = 100 + this.game.rnd.integerInRange(1,10),        
    heroX = this.hero.x - this.game.camera.x,        
    heroY = this.hero.y - this.game.camera.y;       
    
    // Draw circle of light with a soft edge    
    
    var gradient =this.shadowTexture.context.createRadialGradient(heroX, heroY, 100 * 0.75,heroX, heroY, radius);    
    
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');    
    
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');    
    
    this.shadowTexture.context.beginPath();    
    
    this.shadowTexture.context.fillStyle = gradient;    
    
    this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);    
    
    this.shadowTexture.context.fill();    
    
    // This just tells the engine it should update the texture cache    
    
    this.shadowTexture.dirty = true;




}

}