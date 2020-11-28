class GameWinScene extends Phaser.Scene {
  constructor() {
    super('GameWin');
  }

  init(data) {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
    this.finalScore = data.score;
  }



  create() {
    this.music = this.sound.add("title-music");
    this.music.play();
    // create title text

    this.bg = this.add.sprite(0, 0, "winScreen");
    this.bg.setOrigin(0, 0);
    this.titleText = this.add.bitmapText(this.scaleW / 2.1, this.scaleH / 12,'font','YOU ESCAPED!',150);
    this.titleText.setOrigin(0.5);
    this.startGameButton = new UiButton(this, this.scaleW / 2.1, this.scaleH /3.4, 'button1', 'button2', 'PLAY AGAIN', this.startScene.bind(this, 'Game'));
  
  }



 

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
