class UiScene extends Phaser.Scene {
  constructor() {
    super('Ui');
  }

  init() {
    //Get a reference to the gameScene.
    this.gameScene = this.scene.get('Game');
  }

  create() {
    this.setupUiElements();
  }

  setupUiElements() {
    //Adding our background colour image.
    this.background = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'pauseMenu');

    //This button returns us to the title page, though the music overlaps when you do this and restart the game. The links in the options
    //menu will also ALL lead into the gameScene.
    this.quit = new UiButton(this, this.sys.game.config.width/2,this.sys.game.config.height/4, 'button1', 'button2', 'QUIT', this.startScene.bind(this, 'Title'));
   
    //Button from FontAwesome to close our menu. Uses the hand cursor when hovered over.
    this.closeBtn = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/1.2,'close').setInteractive({useHandCursor:true});
    this.closeBtn.setScale(0.05)

    //When the close button is pressed, destroy all objects that make it up.
    this.closeBtn.on('pointerdown',(pointer)=>{
      this.quit.destroy();
      this.closeBtn.destroy();
      this.soundButton.destroy();
      this.background.destroy();
    });

    //Add the same mute button used on the options menu.
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
  
  startScene(targetScene) {
    //When we press the quit button, destroy the current game, stop the UI menu, stop the music, and switch to the title screen.
    this.scene.stop('Game')
    game.sound.stopAll();
    this.scene.remove('Game'); 
    this.scene.stop('Ui');
    this.scene.switch('Title');
    this.scene.destroy('Game')
  }
}
