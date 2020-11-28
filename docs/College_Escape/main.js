var config = {
  type: Phaser.WEBGL,
  //pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    parent:'phaser-game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width:1920,
    height:1140
  },
  

  scene: [
    BootScene,
    TitleScene,
    GameScene,
    UiScene,
    GameOverScene,
    GameWinScene,
    OptionScene
  ],
  physics: {
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
