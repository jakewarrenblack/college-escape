//13: Physics
class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.playerSpeed = 2.8;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
    this.smokePos;
    this.score = 0;
    this.mapWidth = 15360;
    
    
   // this.scale.toggleFullscreen();
    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
  }

  create() {
    this.createAudio();
    this.createInput();
    this.createBackground();
    
    this.createExit();
    this.createCamera();
    this.createWindows();
    this.createDoor();
    this.createPlayer();
    
    this.createEnemy();
    //this.text = this.add.bitmapText(0, 0, 'myfont', 16.34);

    //this.scoreLabel = this.add.bitmapText(50, 50, 'font', '0', 128); 

    //this.font = this.add.bitmapText(20,80,"font","This is a test line",15);
  }


  createExit(){
    this.exit = this.physics.add.sprite(14850, this.scaleH/1.89, "exit");
    this.exit.setPipeline('Light2D')
    this.exit.setScale(0.75)
  }


  createWindows() {
    //11: add  physics to group
    this.windows = this.physics.add.group({
      key: "window",
      repeat: 20,
      score: 5,
      setXY: {
        x: this.scaleW/5,
        y: this.scaleH/2,
        stepX: this.scaleW/3,
        stepY: 0,
      },
      pipeline: 'Light2D',
    });
    this.windows.setAlpha(0.8)

    // scale enemies down
    Phaser.Actions.ScaleXY(this.windows.getChildren(), 1.5,1.5 );
    //Phaser.Actions.setPipeline('Light2D')
  }

  createDoor() {
    //13: add  player sprite to physics engine
    this.doors = this.physics.add.group({
      key: "door",
      repeat: 2,
      score: 5,
      scaleXY:5,
      setXY: {
        x: this.scaleW/3,
        y: this.scaleH/1.75,
        stepX: this.scaleW/4,
        stepY: 0,
      },
      pipeline: 'Light2D',
    });

    this.anims.create({
      key: "closed",
      frames: this.anims.generateFrameNumbers("door", { start: 0, end: 0}),
      frameRate: 2,
      repeat: 1,
    });

    this.anims.create({
      key: "open",
      frames: this.anims.generateFrameNumbers("door", { start: 1, end: 1}),
      frameRate: 2,
      repeat: 1,
    });

    Phaser.Actions.ScaleXY(this.doors.getChildren(), 5, 5);

  }






  createEnemy(){
    //this.enemy = this.add.sprite(0, 255, 'creature', 'creature/walk/001.png');

    this.enemy = this.physics.add.sprite(this.scaleW/3,this.scaleH/1.7, 'creature', 'creature/walk/001.png');
    this.enemy.setScale(5);
    this.player.setScrollFactor(1,0)
    
    this.frameNames = this.anims.generateFrameNames('creature', {
        start: 1,
        end: 2,
        zeroPad: 3,
        prefix: 'creature/walk/',
        suffix: '.png',
    });

    //console.log(frameNames);

    this.config = {
        key: 'walk',
        frames: this.frameNames,
        frameRate: 2,
        repeat: -1
    };

    this.anims.create(this.config);
 this.enemy.play('walk')


  
  this.enemy.setPipeline('Light2D');
  }





  createAudio() {
    this.music = this.sound.add("bgmusic");
    this.music.play();
    this.music.loop = true;
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }



  createBackground() {
    this.lights.enable().setAmbientColor(0x333333);

    //  Add an image and set it to use Lights2D
    this.bg = this.add.sprite(0, 0, "background");
    // change the origin to the top-left corner
    this.bg.setOrigin(0, 0);

    this.bg.setScale(1);
   // this.bg.setScrollFactor(0);
    //this.furniture = this.add.tileSprite(0,0, game.config.width, game.config.height, "furniture");
    //this.furniture.setOrigin(0,0);
    //this.furniture.setScale(1);
    //this.furniture.setScrollFactor(0);

    //this.furniture.setPipeline('Light2D');
    this.bg.setPipeline('Light2D');
    var light = this.lights.addLight(20,20, 200).setScrollFactor(0.0).setIntensity(3);
    this.lights.enable().setAmbientColor(0x555555);

    //  Track the pointer
    this.input.on('pointermove', function (pointer) {

        light.x = pointer.x;
        light.y = pointer.y;

    });


  }

  createCamera() {
    // Phaser supports multiple cameras, but you can access the default camera like this:
    this.camera = this.cameras.main;
    // Set up the arrows to control the camera
    this.cursors = this.input.keyboard.createCursorKeys();

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    this.camera.setBounds(
      0,
      0,
      14850,
      1140
    );
    // Constrain the physics world to the same dimensions
    this.physics.world.setBounds(
      0,
      0,
      14850,
      1140
    );
    //this.camera.setRenderToTexture('Light2D');
  }




  //this.physics.add.collider(this.player, this.groundLayer);

  //this.camera.startFollow(this.player);

  createPlayer() {
    //13: add  player sprite to physics engine
    this.player = this.physics.add.sprite(this.scaleW/4,this.scaleH/1.75, "man");
    this.player.setScrollFactor(1,0)
    this.player.setScale(2)
    this.isPlayerAlive = true;
    this.player.score = 0;
    this.myCam = this.cameras.main.startFollow(this.player);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("man", {
        start: 5,
        end:13,
      }),
      frameRate: 7,
      repeat: -1,
      
    });

    this.anims.create({
      key: "still",
      frames: this.anims.generateFrameNumbers("man", { start: 0, end: 0}),
      frameRate: 2,
      repeat: 1,
    });

    this.anims.create({
      key: "hide",
      frames: this.anims.generateFrameNumbers("man", { start: 28, end: 28}),
      frameRate: 2,
      repeat: 1,
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("man", { start: 29, end: 29}),
      frameRate: 2,
      repeat: 1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("man", { start: 19, end: 27}),
      frameRate: 7,
      repeat: 1,
    });

    this.smokePos = this.player.x + 150
    this.camera.startFollow(this.player);
  }



  

  createSmoke() {
    //13: add  player sprite to physics engine
    this.smoke = this.physics.add.sprite(this.smokePos, this.scaleH /1.55, "smoke");
    this.smoke.setScale(2.5);

    this.anims.create({
      key: "puff",
      frames: this.anims.generateFrameNumbers("smoke", { start: 0, end: 4}),
      frameRate: 10,
      repeat: 1,
    });

  }

 
  //gameLoop
  update() {
    //this.enemy.setVelocityX(80);

    if (this.cursors.left.isDown) {
      this.bg.tilePositionX = this.myCam.scrollX -=5;
      //this.furniture.tilePositionX = this.myCam.scrollX -=5;
      this.player.setVelocityX(-250);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
     this.bg.tilePositionX = this.myCam.scrollX +=5;
     //this.furniture.tilePositionX = this.myCam.scrollX +=5;
      this.player.setVelocityX(250);
      this.player.anims.play("right", true);

    } else if(this.cursors.up.isDown){
      this.player.setVelocityX(0);
      this.player.anims.play("hide", true);
    }else if(this.cursors.down.isDown){
      this.player.setVelocityX(0);
      this.player.anims.play("attack", true);
      this.createSmoke();
      this.smokePos = this.player.x + 150;
      this.smoke.setVelocityX(500);
      this.smoke.setAlpha(0.2)
        this.smoke.anims.play("puff",true);
    
    }
    

    else {
      this.player.setVelocityX(0);
      this.player.anims.play("still",true);
      //console.log('running')
    }

    
    var doors = this.doors.getChildren();
    var numDoors = doors.length;
    console.log('numdoors: ' + numDoors)
  
    for (let i = 0; i < numDoors; i++) {

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.player.getBounds(),
          doors[i].getBounds()
        )
      ) {
        console.log("collided with the following door:", i);
        break;
      }
    }

    //this.spotlight.x = this.player.x + 25;








    

    //console.log(this.player.score);
    //11: add a score to the game
    //this.scoreText.setText("score: " + this.player.score);

    //08: check is player isPlayer dead -> exit the update loop
    if (!this.isPlayerAlive) {
      return;
      this.gameOver();
    }
    // check for active input
    if (this.input.activePointer.isDown) {
      // player walks
      this.player.x += this.playerSpeed;
    }

    


  }
  collisionCheck(player, doors) {
    console.log("overlap");
    //console.log('collided with door')
    //this.gameOver();
  }



  gameOver() {
    this.scene.start("GameOver");
  }
}
