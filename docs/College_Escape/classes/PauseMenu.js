console.log("PauseMenu class");

class PauseMenu extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {        
        super(scene, x, y);
        scene.add.existing(this);
        this.closed = false;
        this.background = scene.add.sprite(x,y,'pauseMenu');
        // this.pauseMenu = this.add.sprite(this.scaleW/2, this.scaleH/2, "pauseMenu");
        this.quit = new UiButton(scene, x,y, 'button1', 'button2', 'QUIT', scene.startScene.bind(scene, 'Title'));

        this.closeBtn = scene.add.sprite(x,y+scene.scaleH/4,'close').setInteractive({useHandCursor:true});
        this.closeBtn.setScale(0.05)
        // Phaser.GameObjects.Image.call(this,scene,x,y+20,'close').setScale(0.1)

        this.closeBtn.on('pointerdown',(pointer)=>{
          console.log('close button pressed')
          this.closed = true;
          this.quit.destroy();
          this.closeBtn.destroy();
          this.background.destroy();


        });

    }
    startScene(targetScene) {
      this.scene.start(targetScene);
    }
}