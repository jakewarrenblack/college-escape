class EnemyBullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene);
        //Retrieve our bullet sprite.
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemyBullet');
        //Parameters passed our distance and time. The bullet will move 1500px in 1 second.
        this.speed = Phaser.Math.GetSpeed(1200, 1);
        this.setScale(.8);
        this.counter = 0;
    }
    
    fire (x, y){
        //Position in GameScene is set to playerX and playerY.
        this.setPosition(x, y);
        //Initially visible and active. If the bullet exists for too long, or hits an enemy,
        //it is destroyed.
        this.setActive(true);
        this.setVisible(true);
    }

    setDir(dir) {
        this.direction = dir; 
    }

    //We call this function in the GameScene.
    update(time, delta){ 
        //Has been initialised to 0, start counting.
        this.counter++;

        //If bullet exists.
        if(this){
            if (this.direction == "r") {
                this.x += this.speed * delta;
           } else if (this.direction == "l") {
               this.x -= this.speed * delta;   
           }
            //Speed is the same as its current speed multiplied by delta (passed from GameScene)
        }
        /*If modulus returns 0, so the same*/
        /*Destroying bullets after some time to stop them showing on the screen
        if they didn't hit an enemy*/
        if (this.counter >50){
            console.log('destroying bullet')
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
            //Reset to 0 for the next bullet.
            this.counter = 0;
        }
    }
}