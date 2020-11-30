
class TitleScene extends Phaser.Scene {

  constructor() {
    super('Title');
  }

  init() {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
  }

  create() {
    this.music = this.sound.add("title-music");
    this.music.play();
    this.titleImage = this.physics.add.sprite(this.scaleW/2,this.scaleH/1.65, 'title-door', '../assets/title_door.png');
    this.titleText = this.add.bitmapText(this.scaleW / 2, this.scaleH / 16,'font','COLLEGE ESCAPE',150);
    this.titleText.setOrigin(0.5);
    
    //Create buttons leading to different scenes. Passed in from this.startScene to the startScene function in each case.
    this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH /3, 'button1', 'button2', 'START', this.startScene.bind(this, 'Game'));
    this.optionsButton = new UiButton(this, this.scaleW / 2, this.scaleH /2, 'button1', 'button2', 'OPTIONS', this.startScene.bind(this, 'Options'));
    this.controlsButton = new UiButton(this, this.scaleW / 2, this.scaleH /1.5, 'button1', 'button2', 'CONTROLS', this.startScene.bind(this, 'Controls'));
    this.recordsButton = new UiButton(this, this.scaleW / 2, this.scaleH-this.scaleH/6, 'button1', 'button2', 'RECORDS', this.startScene.bind(this, 'Records'));
  }

  startScene(targetScene) {
    //If the GameScene doesn't already exist, add the GameScene.
    //This would be the case if we quit from the pause menu in the GameScene.
    //The GameScene is destroyed in this case, and needs to be readded.
    const isNull = this.scene.get('Game');
    if (null === isNull) {
      this.scene.add('Game', GameScene, true);
    }

    //Fade into each scene.
    this.cameras.main.fade(2500);
    this.time.delayedCall(800,function () {
        this.music.stop();
        this.scene.start(targetScene);
    },
    [],
    this
    );
  }
}
