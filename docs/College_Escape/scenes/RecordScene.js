class RecordScene extends Phaser.Scene {
  constructor() {
    super('Records');
  }

  init(data) {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
    this.fastestDeath = localStorage.getItem('fastestDeath');
  }

  create() {
    this.fastestDeathSeconds = (this.fastestDeath/1000).toString();

    this.fastestDeathMinutes = (this.fastestDeathSeconds / 60).toString();

    this.titleText = this.add.bitmapText(this.scaleW / 2, this.scaleH / 12,'font','RECORDS',150);
    this.titleText.setOrigin(0.5);
    
    this.fastestDeathScore = this.add.text(this.scaleW/2,this.scaleW/4, 'text', 'text', { fontSize: '500px', fill: '#fff' });
    
    if(localStorage.getItem('fastestDeath')===null){
      this.fastestDeathScore.setText('NO RECORD DEATH SET');
    }else{
      if(this.fastestDeathSeconds > 60){
        this.fastestDeathScore.setText('FASTEST DEATH: ' + this.fastestDeathMinutes.substr(0,5) + ' MINUTES');
      }else{
        this.fastestDeathScore.setText('FASTEST DEATH: ' + this.fastestDeathSeconds.substr(0,5) + ' SECONDS');
      }
    }

    this.fastestDeathScore.setScale(2)
    this.fastestDeathScore.setOrigin(0.5)

    this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH/1.1, 'button1', 'button2', 'BACK', this.startScene.bind(this, 'Title'));
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
