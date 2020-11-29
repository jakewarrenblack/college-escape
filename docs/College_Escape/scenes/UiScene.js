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
        this.quit = new UiButton(this, this.sys.game.config.width/2,this.sys.game.config.height/4, 'button1', 'button2', 'QUIT', this.startScene.bind(this, 'Title'));

        this.closeBtn = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/1.2,'close').setInteractive({useHandCursor:true});
        this.closeBtn.setScale(0.05)

        this.closeBtn.on('pointerdown',(pointer)=>{
          console.log('close button pressed')
          this.closed = true;
          this.quit.destroy();
          this.closeBtn.destroy();
          this.soundButton.destroy();
          this.background.destroy();


        });

        this.soundButton = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/1.8, 'soundOn').setInteractive();
        this.soundButton.setScale(0.1)
        this.soundButton.tint = 0x00FF00;

        this.soundButton.on('pointerdown',function(pointer){
          if (!game.sound.mute) {
            game.sound.mute = true;
            this.tint = 0xa00900;
          }else{
            game.sound.mute = false;
            this.tint = 0x00FF00;
          }
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
