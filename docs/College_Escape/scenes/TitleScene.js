
class TitleScene extends Phaser.Scene {

  constructor() {
    super('Title');
  }

  init() {
    console.log('TITLE SCENE IS OPEN')
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
    
  }

  create() {

    this.music = this.sound.add("title-music");
    this.music.play();

    // create title text
    // this.bg = this.add.sprite(0, 0, "deathScreen");
    // this.bg.setOrigin(0, 0);
    this.titleImage = this.physics.add.sprite(this.scaleW/2,this.scaleH/1.65, 'title-door', '../assets/title_door.png');
    this.titleText = this.add.bitmapText(this.scaleW / 2, this.scaleH / 16,'font','COLLEGE ESCAPE',150);
    this.titleText.setOrigin(0.5);
    

    // create the Play game button
    this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH /3, 'button1', 'button2', 'START', this.startScene.bind(this, 'Game'));
    this.optionsButton = new UiButton(this, this.scaleW / 2, this.scaleH /2, 'button1', 'button2', 'OPTIONS', this.startScene.bind(this, 'Options'));

  }

  startScene(targetScene) {
    const isNull = this.scene.get('Game');
    if (null === isNull) {
      this.scene.add('Game', GameScene, true);
    }
    // this.scene.add(targetScene)


      this.cameras.main.fade(2500);
      this.time.delayedCall(
        800,
        function () {
          this.music.stop();
          this.scene.start(targetScene);
        },
        [],
        this
      );
    

  }
}
