var config = {
  //WEBGL is necessary for my lighting effects.
  type: Phaser.WEBGL,
  scale: {
    mode: Phaser.Scale.FIT,
    parent:'phaser-game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width:1920,
    height:1140
  },
  
  //Our game is instantiated with all its scenes as part of the config.
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    UiScene,
    GameOverScene,
    GameWinScene,
    OptionScene,
    ControlScene,
    RecordScene
  ],
  physics: {
    //Enabling the 'arcade' physics engine.
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0,
      },
    },
  },
};

var game = new Phaser.Game(config);
