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
    this.rng = 0;
    this.ammo;
    this.ammoPrint;
   // this.scale.toggleFullscreen();
    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
    

  }

  create() { 
    this.activeBullet;
    this.ammo = 9;
    this.ammoPrint = 10;
    this.createAudio();
    this.createInput();
    this.createBackground();
    this.createFloor();
    

    this.createExit();
    this.createCamera();
    this.createWindows();
    this.createDoor(); 
    this.createAmmo();
    this.createPlayer();
    this.createText();
    this.createPrinters();
    this.createBullets();
    this.createEnemies();
    this.collideBulletsPlayer();

    this.physics.add.collider(this.player, this.platforms);
  }

  createEnemies(){
    this.enemy1 = new Enemy(this,this.randomPos(),this.scaleH/1.7,'creature','walk')
    this.enemy1.createEnemyTween(this,this.enemy1.x);
    this.physics.add.collider(this.enemy1,this.platform);

    this.enemy2 = new Enemy(this,this.randomPos(),this.scaleH/1.7,'newCreature','walking')
    this.enemy2.createEnemyTween(this,this.enemy2.x);
    this.physics.add.collider(this.enemy2,this.platform);

    this.enemies = [this.enemy1,this.enemy2]
  }

  collideBulletsPlayer(){
    for(var i=1; i<this.enemies.length+1; i++){
      this.physics.add.overlap(
        this.bullets,
        this['enemy' + i],
        this['collBulletEnemy' + i],
        null,
        this
      );
    }

    for(var i=1; i<this.enemies.length+1; i++){
    this.physics.add.overlap(
      this.player,
      this['enemy' + i],
      this['collPlayerEnemy' + i],
      null,
      this
    );
    }

    this.handlePlayerEnemyCollider = this.physics.add.collider(this.enemies,this.player);
  }

  changeTint(){
    this.enemies = [this.enemy1,this.enemy2]
    for (let i = 0; i < this.enemies.length; i++) {
        this.enemies.forEach(function(enemy){
            if (enemy.hitCount == 1) {
              enemy.tint =  0xa00900;
            }else if(enemy.hitCount == 2){
              enemy.tint =  0x7f0700;
            }else if(enemy.hitCount ==3){
              enemy.tint =  0x5c0500;
            }else if(enemy.hitCount >3){
              enemy.destroy();
              enemy.enemyAlive = false;
            }
        });
      }
}

changePlayerTint(){
  if(this.playerHitCount== 1){
    this.player.tint = 0xa00900;
  }else if(this.playerHitCount == 2){
    this.player.tint = 0x7f0700;
  }else if(this.playerHitCount== 3){
    this.player.tint = 0x5c0500;
  }else if(this.playerHitCount >3){
    this.isPlayerAlive = false;
    this.player.setVisible(false);
    this.player.setActive(false);
    this.gameOver();
  }
}

  collPlayerEnemy1() {
    this.touchingEnemy1 = true;
    // this.player.body.angularVelocity = -40;
    // this.player.setBounce(2,2)
    // this.playerHitCount++;
    // this.changePlayerTint();

  }

  collPlayerEnemy2() {
    this.touchingEnemy2 = true;
  // this.player.body.angularVelocity = -40;
    // this.playerHitCount++;
  // this.changePlayerTint();
  // this.player.velocityX*=-1;
}


  collBulletEnemy1(bullet, enemy1) {
    console.log(bullet);
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy1.hitCount++;
    console.log("enemy1 hitCount: " + this.enemy1.hitCount);
  }

  collBulletEnemy2(bullet, enemy2) {
    console.log(bullet);
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy2.hitCount++;
    console.log("enemy2 hitCount: " + this.enemy2.hitCount);
  }

  createBullets() {
    
    //16 bullets array is a group inside arcade physics engine
    this.bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: this.ammo,
        runChildUpdate: true
    });

    this.bullet; //stores the current bullet being shot
    this.activeBullet = this.bullet;
    this.lastFired = 0;
    
    // this.enemy.collBulletEnemy(this,this.bullets,this.enemy);

  }
  
  randomPos(){
    return Phaser.Math.Between(500,this.bg.width-200);
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
      repeat: 15,
      score: 5,
      scaleXY:5,
      setXY: {
        x: this.scaleW/3,
        y: this.scaleH/1.75,
        stepX: this.scaleW/1.5,
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

  createText() {

    this.infoTxt = this.add.text(50,50, 16, 'text', { fontSize: '100px', fill: '#fff' });
    this.infoTxt.setScrollFactor(0)
    /*this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#f00",
      
    });*/
    //13 bitmapFont
    // this.scoreText = this.add.bitmapText(16, 16, 'font', 'score: 0');
    // this.scoreText.setScale(0.25);
    // this.scoreText.setTint(0xff0000, 0xffffff, 0xff0000,0xffffff);
    // this.scoreText.setDepth();
    this.infoTxt.setScale(10);
    this.infoTxt.setTint(0xff00ff, 0xffffff, 0xff00ff,0xffffff);
    this.infoTxt.setDepth();

    // this.font = this.add.bitmapText(20,80,"font","Ammo: " + this.ammo,15);
  }


  createAmmo(){
    this.cigs = this.physics.add.group({
      key: "cig",
      repeat: 20,
      score: 5,
      setXY: {
        x: this.scaleW/2,
        y: this.scaleH/1.52,
        stepX: this.scaleW/3,
        stepY: 0,
      },
      pipeline: 'Light2D',
    });
    // this.cigarettes.setScale(5)
  }

  createAudio() {
    this.music = this.sound.add("bgmusic");
    this.music.play();
    this.music.loop = true;
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createFloor(){
    this.platform = this.physics.add.sprite(0, this.scaleH/1.47, 'floor');
    this.platform.setOrigin(0,0);
    this.bg.setScale(1);
    
    this.platform.setImmovable(true)  
  }


  createBackground() {
    this.lights.enable().setAmbientColor(0x333333);

    //  Add an image and set it to use Lights2D
 
    this.bg = this.add.sprite(0, 0, "background");
    
    // change the origin to the top-left corner
    this.bg.setOrigin(0, 0);




    this.bg.setScale(1);
    this.bg.setPipeline('Light2D');
    var light = this.lights.addLight(20,20, 200).setScrollFactor(0.0).setIntensity(3);
    this.lights.enable().setAmbientColor(0x555555);
    //  Track the pointer
    this.input.on('pointermove', function (pointer) {
        light.x = pointer.x;
        light.y = pointer.y;
    });
  }

  createPrinters(){
    
    this.printer = this.physics.add.sprite(1000,this.scaleH/1.68, "printer").setImmovable();
    this.printer.setScrollFactor(1,0)
    this.printer.setScale(3.5)
     this.printer.enableBody = true;

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

  createPlayer() {
    //13: add  player sprite to physics engine
    this.player = this.physics.add.sprite(this.scaleW/8,this.scaleH/1.75, "man");
    this.player.body.gravity.y = 1500;
    this.playerHitCount = 0;
    this.physics.add.collider(this.player,this.platform);
    this.physics.add.collider(this.player,this.enemy1);
    this.physics.add.collider(this.player,this.enemy2);
    this.player.setScrollFactor(1,0)
    this.player.setScale(2)
    this.isPlayerAlive = true;
    this.player.score = 0;
    this.myCam = this.cameras.main.startFollow(this.player);
    this.player.setCollideWorldBounds(true);

    this.touchingEnemy = false;
    this.player.body.setDrag(500, 1500);

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
      key: "crouch",
      frames: this.anims.generateFrameNumbers("man", { start: 30, end: 30}),
      frameRate: 2,
      repeat: 1,
    });
    this.anims.create({
      key: "melee",
      frames: this.anims.generateFrameNumbers("man", { start: 31, end: 31}),
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
    

    this.camera.startFollow(this.player);
  }



  update(time, delta) {
    this.keyCtrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    // this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
console.log('player velocity' + this.player.velocityX)
console.log('angle: ' + this.player.angle)

    this.changeTint();
    this.changePlayerTint();

    //this.enemy.setVelocityX(80);
    var doors = this.doors.getChildren();
    var cigs = this.cigs.getChildren();
if(!this.touchingEnemy1 && !this.touchingEnemy2){
    if (this.cursors.left.isDown) {
      this.bg.tilePositionX = this.myCam.scrollX -=5;
      //this.furniture.tilePositionX = this.myCam.scrollX -=5;
      this.player.setVelocityX(-700)
      this.player.anims.play("left", true);
    } 
    else if (this.cursors.right.isDown) {
     this.bg.tilePositionX = this.myCam.scrollX +=5;
     //this.furniture.tilePositionX = this.myCam.scrollX +=5;
      this.player.setVelocityX(400)
      this.player.anims.play("right", true);

    }
    else if(this.cursors.up.isDown){
      // this.player.setVelocityX(0).setBounce(1);
      
      this.player.anims.play("hide", true);

    }

      else if(this.keyCtrl.isPressed){
        this.player.anims.play("crouch",true);
        // this.player.setVelocityX(0).setBounce(1);
      } 
        else if(this.keyShift.isDown){
          console.log('shift pressed')
          // this.player.setVelocityX(0).setBounce(1);
          this.player.anims.play("melee",true)
      }


    //If space is pressed and time passed in update > time since last fired
    else if (this.keySpace.isDown && time > this.lastFired) {
      if(this.ammo >= 0){
      this.ammo--;
      this.ammoPrint--;
      }
      console.log('ammo left: ' + this.ammo)
        console.log("fire")
        this.bullet = this.bullets.get();
        
        
        /*If bullet exists*/
        if (this.bullet)
        {
          console.log('numbullets: ' + this.bullet)
          
          // this.player.setVelocityX(0)
          // this.player.anims.play("attack",true);
          /*Bullet moving right, seems uneccessary but will add player facing left eventually*/
            this.bullet.setDir("r");
            this.bullet.fire(this.player.x, this.player.y);
            this.bullet.body.setSize(this.bullet.width * 1, this.bullet.height * 1);
            /*Prevent bullet spamming, can only fire once every second*/
            this.lastFired = time + 1000;
            this.activeBullet = this.bullet;

            if(this.bullet.x > (this.player.x + this.scaleW)){
              this.bullet.setActive(false);
            }

        }}
      else if(this.keyCtrl.isDown){
        this.player.anims.play("crouch",true);
      
        /*Let the attack animation run until the bullet is 1/4 the screen's width away from the player*/
      }else if(this.bullet && this.bullet.x < (this.player.x + this.scaleW/4) && this.bullet.active){
        // this.player.setVelocityX(0).setBounce(1)
        this.player.anims.play("attack",true);
      }
    

    else {
      // this.player.setVelocityX(0).setBounce(1);
      this.player.body.setSize(60)
      // this.player.body.setVelocityX(0)
      this.player.anims.play("still",true);
      //console.log('running')
    }
  }else{
    if(this.touchingEnemy1 || this.touchingEnemy2){
      this.player.body.setBounce(2,2);
      this.cameras.main.shake(500);
      this.player.anims.play("crouch",true);
      
    }else{
      this.player.body.setBounce(0,0);
    }
  }
    
    var numCigs = cigs.length;
    // console.log(cigs.length)
    // console.log('numdoors: ' + numDoors)
  
    for (let i = 0; i < numCigs; i++) {

      if(!this.keySpace.isDown && cigs[i]){
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.player.getBounds(),
          cigs[i].getBounds()
        )
      ){
        if(!this.keySpace.isDown){
        /*Return ammo when you pick up cigs*/
        this.bullets.children.each(function(b) {

                if (b.active && b.x > this.player.x + this.scaleW) {
                        b.setActive(false); 
                        cigs[i].setActive(false)
                        cigs[i].setVisible(false);
                        cigs[i].destroy();
                        this.ammo = 9;
                        this.ammoPrint = 10;
                }
            }.bind(this));
          }

      
      }

    
  }
}


/*Prevent bounce agasint world bounds*/
if(this.player.x === 0 || this.player.x === this.bg.width){
  this.player.body.setVelocityX(0).setBounce(0,0);
}

if(this.player.x > this.enemy1.x || this.player.x < this.enemy1.x ){
  this.touchingEnemy1 = false;
}

if(this.player.x > this.enemy2.x || this.player.x < this.enemy2.x){
  this.touchingEnemy2 = false;
}

 
  this.infoTxt.setText('Ammo: ' + this.ammoPrint) 
    
    var numDoors = doors.length;
    // console.log('numdoors: ' + numDoors)
  
    for (let i = 0; i < numDoors; i++) {

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.player.getBounds(),
          doors[i].getBounds()
        )
      ) {
        // console.log("collided with the following door:", i);
        if(this.cursors.up.isDown){
          doors[i].anims.play("open",true);
          this.player.setAlpha(0.2);
          // console.log("up pressed in range of door", i)
          // this.doors.anims.play("closed");
        }else{
          doors[i].anims.play("closed",true);
          this.player.setAlpha(1);
        }
        break;
      }
    }
    

    //console.log(this.player.score);
    //11: add a score to the game
    //this.scoreText.setText("score: " + this.player.score);

    //08: check is player isPlayer dead -> exit the update loop
    if (!this.isPlayerAlive) {
      return;
      this.gameOver();
    }
    // check for active input
    // if (this.input.activePointer.isDown) {
    //   // player walks
    //   this.player.x += this.playerSpeed;
    // }

    if(this.enemy1.enemyAlive){
      this.enemy1.followPlayer(this, this.player.x);
    }
    if(this.enemy2.enemyAlive){
      this.enemy2.followPlayer(this, this.player.x);
    }
  }


  
   hitObject () {

    

}



  collisionCheck(player, doors) {
    console.log("overlap");
    //console.log('collided with door')
    //this.gameOver();
  }



  gameOver() {
    this.time.delayedCall(
      500,
      function () {
        this.cameras.main.fade(2500);
      },
      [],
      this
    );
    this.scene.start("GameOver");
  }

  
}

