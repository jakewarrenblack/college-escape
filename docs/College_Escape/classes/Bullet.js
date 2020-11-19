console.log("Bullet class");

class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        console.log("Bullet instance");
        super(scene);
        this.scene = scene;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(500, 1);
    }
    
    fire (x, y)
    {
        //inital position 20 px to the right.
        this.setPosition(x +20 ,  y);
        //make object active
        this.setActive(true);
        this.setVisible(true);
    }

    update(time, delta)
    { 
        //update of bullet movement
        //to the right in this case
        this.x += this.speed * delta;
        //check for bullet limit (500 px on X axis)
        if (this.x > this.scaleW)
        {
            //if outside view make inactive and invisible
            this.setActive(false);
            this.setVisible(false);
        }
    }

}