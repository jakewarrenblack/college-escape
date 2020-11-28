class UiScene extends Phaser.Scene {
  constructor() {
    super('Ui');
  }

  init() {
    // grab a reference to the game scene
    this.gameScene = this.scene.get('Game');
 
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
  }

  setupUiElements() {
    // create the score text game object
            this.closed = false;
        this.background = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'pauseMenu');
        // this.pauseMenu = this.add.sprite(this.scaleW/2, this.scaleH/2, "pauseMenu");
        this.quit = new UiButton(this, this.sys.game.config.width/2,this.sys.game.config.height/2, 'button1', 'button2', 'QUIT', this.startScene.bind(this, 'Title'));

        this.closeBtn = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/4,'close').setInteractive({useHandCursor:true});
        this.closeBtn.setScale(0.05)
        // Phaser.GameObjects.Image.call(this,scene,x,y+20,'close').setScale(0.1)
      //   this.input.once('pointerdown', function () {

      //     console.log('From SceneA to SceneB');

      //     this.scene.remove('Game'); 
      //     this.scene.stop('Ui');
      //     this.scene.switch('Title');
    
      // }, this);
        this.closeBtn.on('pointerdown',(pointer)=>{
          console.log('close button pressed')
          this.closed = true;
          this.quit.destroy();
          this.closeBtn.destroy();
          this.background.destroy();


        });

  }

  setupEvents() {
    // listen for the updateScore event from the game scene
    
    this.gameScene.events.on('updateScore', (score) => {
      this.scoreText.setText(`Coins: ${score}`);
    });
  }

  
  startScene(targetScene) {
          this.scene.stop('Game')
          this.scene.remove('Game'); 
          
          this.scene.stop('Ui');
          this.scene.switch('Title');
          this.scene.destroy('Game')
    // this.scene.start(targetScene);
  }
}
