class ControlScene extends Phaser.Scene {
  constructor() {
    super('Controls');
  }

  init(data) {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
  }



  create() {

    this.controls = this.add.sprite(this.scaleW/2,this.scaleH/2,"controls")
    




    this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH/1.1, 'button1', 'button2', 'BACK', this.startScene.bind(this, 'Title'));




  }




  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
