class OptionScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  init(data) {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
    this.finalScore = data.score;
  }



  create() {

    
    this.titleText = this.add.bitmapText(this.scaleW / 2, this.scaleH / 12,'font','OPTIONS',150);
    this.titleText.setOrigin(0.5);


this.soundButton = this.add.sprite(this.scaleW/2,this.scaleH/2, 'soundOn').setInteractive();
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

this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH/1.1, 'button1', 'button2', 'BACK', this.startScene.bind(this, 'Title'));




  }




  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
