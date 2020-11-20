class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        console.log("Bullet instance");
        super(scene);
        this.scene = scene;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(1500, 1);
        this.setScale(.4);
        this.direction = "r";
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
        if (this.direction == "r") {
             this.x += this.speed * delta;
        } else if (this.direction == "l") {
            this.x -= this.speed * delta;   
        }

        if (this.x > this.x + 1920 || this.x < this.x-1920)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

}