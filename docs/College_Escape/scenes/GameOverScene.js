class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
    this.finalScore = data.score;
  }



  create() {
    // create title text

    this.bg = this.add.sprite(0, 0, "deathScreen");
    this.bg.setOrigin(0, 0);
    this.titleText = this.add.bitmapText(this.scaleW / 2, this.scaleH / 12,'font','YOU DIED',150);
    this.titleText.setOrigin(0.5);
    this.scoreTxt = this.add.text(this.scaleW/2,this.scaleW/2, 'YOU KILLED: ' + this.finalScore + ' ENEMIES', 'text', { fontSize: '500px', fill: '#fff' });
    this.scoreTxt.setOrigin(0.5)
    this.scoreTxt.setScale(5)
        // create the Play game button
    this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH /1.6, 'button1', 'button2', 'PLAY AGAIN', this.startScene.bind(this, 'Game'));
  
  }



 

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
