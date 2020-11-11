class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  init() {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
  }

  create() {
    // create title text
    this.titleImage = this.physics.add.sprite(this.scaleW/2,this.scaleH/1.65, 'title-door', './assets/title_door.png');
    this.titleText = this.add.bitmapText(this.scaleW / 2, this.scaleH / 16,'font','COLLEGE ESCAPE',150);
    this.titleText.setOrigin(0.5);

    // create the Play game button
    this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH /3, 'button1', 'button2', 'START', this.startScene.bind(this, 'Game'));
    this.optionsButton = new UiButton(this, this.scaleW / 2, this.scaleH /2, 'button1', 'button2', 'OPTIONS', this.startScene.bind(this, 'Game'));
    this.controlsButton = new UiButton(this, this.scaleW / 2, this.scaleH / 1.5, 'button1', 'button2', 'CONTROLS', this.startScene.bind(this, 'Game'));
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
