class RecordScene extends Phaser.Scene {
  constructor() {
    super('Records');
  }

  init(data) {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
    //Import fastest death from localStorage.
    this.fastestDeath = localStorage.getItem('fastestDeath');
  }

  create() {
    //Change from milliseconds to seconds and convert to string so we can get a substring of it.
    this.fastestDeathSeconds = (this.fastestDeath/1000).toString();
    //Divide seconds to get minutes, also convert to string to get a substring.
    this.fastestDeathMinutes = (this.fastestDeathSeconds / 60).toString();

    this.titleText = this.add.bitmapText(this.scaleW / 2, this.scaleH / 12,'font','RECORDS',150);
    this.titleText.setOrigin(0.5);
    
    //Set as just 'text' initially, then change.
    this.fastestDeathScore = this.add.text(this.scaleW/2,this.scaleW/4, 'text', 'text', { fontSize: '500px', fill: '#fff' });
    
    //If there is no item in localStorage called 'fastestDeath', just say 'no record death set'.
    if(localStorage.getItem('fastestDeath')===null){
      this.fastestDeathScore.setText('NO RECORD DEATH SET');
    //If there is an item called fastestDeath and it's more than 60 seconds, show it in minutes.
    }else{
      if(this.fastestDeathSeconds > 60){
        //Only show the first 5 characters, including a decimal point.
        this.fastestDeathScore.setText('FASTEST DEATH: ' + this.fastestDeathMinutes.substr(0,5) + ' MINUTES');
      //If it's 60 seconds or less, show it in seconds.
      }else{
        this.fastestDeathScore.setText('FASTEST DEATH: ' + this.fastestDeathSeconds.substr(0,5) + ' SECONDS');
      }
    }

    this.fastestDeathScore.setScale(2)
    this.fastestDeathScore.setOrigin(0.5)
    this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH/1.1, 'button1', 'button2', 'BACK', this.startScene.bind(this, 'Title'));
  }

  //We pass the scene we want to switch to on line 41, when we say this.startScene.bind(this, 'Title'). This will switch us to the 'Title' scene.
  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
