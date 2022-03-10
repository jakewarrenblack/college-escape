class OptionScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  init() {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
  }

  create() {
    this.titleText = this.add.bitmapText(this.scaleW / 2, this.scaleH / 12,'font','OPTIONS',150);
    this.titleText.setOrigin(0.5);

    //Our sound icon from FontAwesome.
    this.soundButton = this.add.sprite(this.scaleW/2,this.scaleH/2, 'soundOn').setInteractive();
    this.soundButton.setScale(0.1)
    //Set to green tint initially.
    this.soundButton.tint = 0x00FF00;

    //When we click the mute buton, mute the game's sound and set its tint to red.
    this.soundButton.on('pointerdown',function(pointer){
    if(!game.sound.mute){
      game.sound.mute = true;
      this.tint = 0xa00900;

    }else{
      //If we click again, unmute the game and reset its tint to green.
      game.sound.mute = false;
      this.tint = 0x00FF00;
    }
  });

  this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH/1.1, 'button1', 'button2', 'BACK', this.startScene.bind(this, 'Title'));
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
