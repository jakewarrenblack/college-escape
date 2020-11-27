class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        console.log("Bullet instance");
        super(scene);
        this.scene = scene;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(1500, 1);
        this.setScale(.4);
        this.direction = "r";
this.counter = 0;
this.bulletsFired = 0;
    }
    
    fire (x, y)
    {
        //inital position 20 px to the right.
        this.setPosition(x,  y);
        //make object active
        this.setActive(true);
        this.setVisible(true);
    }

    setDir(dir) {
        console.log("New dir: " , dir);
        this.direction = dir; 
    }

    update(time, delta)
    { 
        this.counter++;

    if(this){
        if (this.direction == "r") {
             this.x += this.speed * delta;
        } else if (this.direction == "l") {
            this.x -= this.speed * delta;   
        }
    }
        /*If modulus returns 0, so the same*/
        /*Destroying bullets after some time to stop them showing on the screen
        if they didn't hit an enemy*/
        if (this.counter >50)
        {
            console.log('destroying bullet')
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
            this.counter = 0;
      
        }
    }
}