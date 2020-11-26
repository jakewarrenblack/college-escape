class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init() {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
  }



  create() {
    // create title text
    this.bg = this.add.sprite(0, 0, "deathScreen");
    this.bg.setOrigin(0, 0);
    this.titleText = this.add.bitmapText(this.scaleW / 2, this.scaleH / 4,'font','YOU DIED',150);
    this.titleText.setOrigin(0.5);
        // create the Play game button
    this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH /1.6, 'button1', 'button2', 'PLAY AGAIN', this.startScene.bind(this, 'Game'));
  
  }



 

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
