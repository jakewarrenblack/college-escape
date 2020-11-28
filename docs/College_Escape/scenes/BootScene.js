class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    console.log("preloading");
    // load images
    this.loadImages();
    // load spritesheets
    this.loadSpriteSheets();
    // load audio
    this.loadAudio();
    this.loadFont();
    //this.load.bitmapFont('myfont', 'assets/hanging_tree_0.png', 'assets/hanging_tree.fnt');
    

  }

loadFont(){
  this.load.bitmapFont('font', '../assets/font/font.png', '../assets/font/font.fnt');
}


  loadImages() {
    this.load.image("pauseMenu","../assets/pauseMenu.png")
    this.load.image('myfont', '../assets/hanging_tree_0.png');
    // load images
    this.load.image("bullet", "../assets/smoke.png");
    this.load.image('title-door', '../assets/title_door.png');
    this.load.image("background", ["../assets/background_ext_lit.png", "../assets/background_ext_n.png"]);
    this.load.image("exit", ["../assets/exit.png", "../assets/exit_n.png"]);
    this.load.image("window", ["../assets/window_lit.png", "../assets/window_new_n.png"]);
    //this.load.image("player", "../assets/player.png");
    this.load.image("blue","../assets/blue.png")
    this.load.image("desk","../assets/desk.png")
    //this.load.image('enemy','../assets/creature.png');
    this.load.image('furniture',["../assets/furniture.png", "../assets/furniture_n.png"]);
    this.load.image('printer',"../assets/printer.png");
    //this.load.image("enemy", "../assets/dragon.png");
    this.load.image("treasure", "../assets/treasure.png");
    this.load.image("button1", "../assets/blue_button01.png");
    this.load.image("button2", "../assets/blue_button02.png");
    this.load.image("cig","../assets/smokes.png");
    this.load.image("floor", "../assets/floor.png");
    this.load.image("deathScreen", "../assets/deathscreen.png")
    this.load.image("winScreen", "../assets/winScreen.png")
    this.load.image("soundOn","../assets/soundOn.png")
    this.load.image("close","../assets/close.png")
    this.load.image("quit-text","../assets/quit-text.png")
    this.load.image("controls","../assets/controls.png")

    //this.load.setPath('../assets/');
    // this.load.multiatlas('creature', '../assets/creature_002.json');
    this.load.multiatlas('creatureLeft', '../assets/creature_left.json')
    this.load.multiatlas('creature2','../assets/creature2_002.json')
    // this.load.atlas('newCreature', '../assets/creatureNewSprite.png', '../assets/creatureNewSprite.json');
    //NEW CREATURE, MULTIATLAS
    //this.load.image("enemyOverlay", ["../assets/creature_lit.png", "../assets/creature_n.png"]);
    //this.load.image("door", "../assets/door.png");
  }

  loadSpriteSheets() {
    this.load.spritesheet("door", "../assets/door.png", {
      frameWidth: 26,
      frameHeight: 41,
    });
    this.load.spritesheet("man", "../assets/cleric-horizontal-crouch-attack.png", {
      frameWidth: 114,
      frameHeight: 120,
    });
    this.load.spritesheet("newCreature", "../assets/creature3_lit.png", {
      frameWidth: 50,
      frameHeight: 40,
    });
     this.load.spritesheet("creature", "../assets/creature_lit.png", {
      frameWidth: 50,
      frameHeight: 40,
    });


    // this.load.spritesheet("smoke", "../assets/smoke.png", {
    //   frameWidth: 38,
    //   frameHeight: 35,
    // });
    

  }



  loadAudio() {
    // Adding Sounds
    this.load.audio("bgmusic", [
      "../assets/soundtrack.mp3",
    ]);
    this.load.audio("roar", [
      "../assets/roar.ogg",
    ]);
    this.load.audio("death", [
      ("../assets/death.ogg")
    ]);
    this.load.audio("title-music",[
      ("../assets/title-music.ogg")
    ]);
    this.load.audio("monster-hurt",[
      ("../assets/monster-hurt.ogg")
    ]);
    this.load.audio("oof",[
      ("../assets/oof4.ogg")
    ]);
  }

  create() {
    this.scene.start("Title");
  }
}
