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
    // this.ammoPrint;
   // this.scale.toggleFullscreen();
    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
    

  }

  create() { 
    this.activeBullet;
    this.ammo = 8;
    this.bulletCount = 0;
    this.score = 0;
    this.createAudio();
    this.createInput();
    this.createBackground();
    this.createFloor();
    
    this.deadEnemies = [];
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


    this.enemies = [];

    
    for(var i=1; i<4; i++){
      this['enemy'+i] = new Enemy(this,this.randomPos(),this.scaleH/1.7,'creature','walk')
      // this['enemy'+i].createEnemyTween(this,this['enemy'+i].x);
      console.log('enemy1x ' + this['enemy'+i].x)
      this.physics.add.collider(this['enemy'+i],this.platform);
      console.log('enemy'+i +' location is ' + this['enemy'+i].x)
      this.enemies.push(this['enemy'+i]);
    }
    for(var i=4;  i<7; i++){
      this['enemy'+i] = new Enemy(this,this.randomPos(),this.scaleH/1.7,'newCreature','walking')
      // this['enemy'+i].createEnemyTween(this,this['enemy'+i].x);
      this.physics.add.collider(this['enemy'+i],this.platform);
      console.log('enemy'+i +' location is ' + this['enemy'+i].x)
      this.enemies.push(this['enemy'+i]);
    }

    

    console.log('arraylength: ' + this.enemies.length)
  }



  changeTint(){
    this.enemies = [this.enemy1,this.enemy2,this.enemy3,this.enemy4,this.enemy5,this.enemy5,this.enemy6]
    for (let i = 1; i < this.enemies.length+1; i++) {
        this.enemies.forEach((enemy) =>{
            if (enemy.hitCount == 1) {
              enemy.tint =  0xa00900;
            }else if(enemy.hitCount == 2){
              enemy.tint =  0x7f0700;
            }else if(enemy.hitCount ==3){
              enemy.tint =  0x5c0500;
            }else if(enemy.hitCount >3){

              enemy.setActive(false);
              enemy.setVisible(false)

              if(enemy.enemyAlive){
                this.deadEnemies.push(enemy)
                enemy.destroy();
                enemy.enemyAlive = false;
              }
            }
        });
      }
}



checkDead(){
  if(this.enemy1.enemyAlive){
    this.deadEnemies.push(this.enemy1)
    this.enemy1.destroy();
    this.enemy1.enemyAlive = false;
  }
  else if(this.enemy2.enemyAlive){
    this.deadEnemies.push(this.enemy2)
    this.enemy2.destroy();
    this.enemy2.enemyAlive = false;

  }
  else if(this.enemy3.enemyAlive){
    this.deadEnemies.push(this.enemy3)
    this.enemy3.destroy();
    this.enemy3.enemyAlive = false;

  }
  else if(this.enemy4.enemyAlive){
    this.deadEnemies.push(this.enemy4)
    this.enemy4.destroy();
    this.enemy4.enemyAlive = false;

  }
  else if(this.enemy5.enemyAlive){
    this.deadEnemies.push(this.enemy5)
    this.enemy5.destroy();
    this.enemy5.enemyAlive = false;

  }
  else if(this.enemy6.enemyAlive){
    this.deadEnemies.push(this.enemy6)
    this.enemy6.destroy();
    this.enemy6.enemyAlive = false;

  }
}

changePlayerTint(){
  if(this.playerHitCount>5){
    this.player.tint = 0xa00900;
  } if(this.playerHitCount >10){
    this.player.tint = 0x7f0700;
  } if(this.playerHitCount>15){
    this.player.tint = 0x5c0500;
  } if(this.playerHitCount >20){
    this.isPlayerAlive = false;
    this.player.setVisible(false);
    this.player.setActive(false);
    this.music.stop();
    
    //08: fading out
    this.time.delayedCall(
      500,
      function () {
        this.cameras.main.fade(2500);
      },
      [],
      this
    );
  
    // restart game
    this.time.delayedCall(
      1000,
      function () {
        
        this.gameOver();
      },
      [],
      this
    );
    
    
  }
}

  collPlayerEnemy1() {
    this.touchingEnemy1 = true;
    // this.player.body.angularVelocity = -40;
    // this.player.setBounce(2,2)
    this.time.delayedCall(500, this.hitCountIncrease, [], this);
    // this.changePlayerTint();
    if(this.playerMelee){
      this.enemy1.hitCount+=0.5;
    }
  }

  collPlayerEnemy2() {
    this.touchingEnemy2 = true;
  // this.player.body.angularVelocity = -40;
  this.time.delayedCall(500, this.hitCountIncrease, [], this);
  // this.changePlayerTint();
  // this.player.velocityX*=-1;
  if(this.playerMelee){
    this.enemy2.hitCount+=0.5;
  }
}

  collPlayerEnemy3() {
    this.touchingEnemy3 = true;
  // this.player.body.angularVelocity = -40;
    // this.playerHitCount++;
    this.time.delayedCall(500, this.hitCountIncrease, [], this);
    // this.player.velocityX*=-1;
    if(this.playerMelee){
      this.enemy3.hitCount+=0.5;
    }
}

collPlayerEnemy4() {
  this.touchingEnemy4 = true;
// this.player.body.angularVelocity = -40;
this.time.delayedCall(500, this.hitCountIncrease, [], this);
// this.changePlayerTint();
// this.player.velocityX*=-1;
if(this.playerMelee){
  this.enemy4.hitCount+=0.5;
}
}

collPlayerEnemy5() {
  this.touchingEnemy5 = true;
// this.player.body.angularVelocity = -40;
this.time.delayedCall(500, this.hitCountIncrease, [], this);
// this.changePlayerTint();
// this.player.velocityX*=-1;
if(this.playerMelee){
  this.enemy5.hitCount+=0.5;
}
}

collPlayerEnemy6() {
  this.touchingEnemy6 = true;
// this.player.body.angularVelocity = -40;
this.time.delayedCall(500, this.hitCountIncrease, [], this);
// this.changePlayerTint();
// this.player.velocityX*=-1;
if(this.playerMelee){
  this.enemy6.hitCount+=0.5;
}
}

hitCountIncrease(){
  this.playerHitCount++;
  console.log('player hitcount is: '+ this.playerHitCount)
}


  collBulletEnemy1(bullet, enemy1) {
    this.bulletCollision1 = true;
    console.log(bullet);
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy1.hitCount++;
    console.log("enemy1 hitCount: " + this.enemy1.hitCount);
  }

  collBulletEnemy2(bullet, enemy2) {
    this.bulletCollision2 = true;
    console.log(bullet);
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy2.hitCount++;
    console.log("enemy2 hitCount: " + this.enemy2.hitCount);
  }

  collBulletEnemy3(bullet, enemy3) {
    this.bulletCollision3 = true;
    console.log(bullet);
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy3.hitCount++;
    console.log("enemy3 hitCount: " + this.enemy3.hitCount);
  }

  collBulletEnemy4(bullet, enemy4) {
    this.bulletCollision4 = true;
    console.log(bullet);
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy4.hitCount++;
    console.log("enemy4 hitCount: " + this.enemy4.hitCount);
  }

  collBulletEnemy5(bullet, enemy5) {
    this.bulletCollision5 = true;
    console.log(bullet);
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy5.hitCount++;
    console.log("enemy5 hitCount: " + this.enemy5.hitCount);
  }
  
  collBulletEnemy6(bullet, enemy6) {
    this.bulletCollision6 = true;
    console.log(bullet);
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy6.hitCount++;
    console.log("enemy6 hitCount: " + this.enemy6.hitCount);
  }





  createBullets() {
    
    //16 bullets array is a group inside arcade physics engine
    this.bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: this.ammo,
        runChildUpdate: true
    });

    this.bullet; //stores the current bullet being shot
    this.lastFired = 0;
    
    // this.enemy.collBulletEnemy(this,this.bullets,this.enemy);

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
    this.physics.add.collider(
      this.player,
      this['enemy' + i],
      this['collPlayerEnemy' + i],
      null,
      this
    );
    }

    this.handlePlayerEnemyCollider = this.physics.add.collider(this.enemies,this.player);
  }
  
  randomPos(){
    /*Randomly position enemies, but not right at the exit or right in front of the player.*/
    return Phaser.Math.Between(this.scaleW+this.scaleW/8,this.bg.width-200);
}   

  createExit(){
    this.exit = this.physics.add.sprite(14820, this.scaleH/1.89, "exit");
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
      repeat: 12,
      score: 5,
      scaleXY:5,
      setXY: {
        x: this.scaleW/3,
        y: this.scaleH/1.75,
        stepX: this.scaleW/1.48,
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

    this.infoTxt = this.add.text(50,50, 16, 'text', { fontSize: '50px', fill: '#fff' });
    this.infoTxt.setScrollFactor(0)

    this.scoreTxt = this.add.text(this.scaleW-400,50, 16, 'text', { fontSize: '50px', fill: '#fff' });
    this.scoreTxt.setScrollFactor(0)

    this.infoTxt.setScale(5);
    this.infoTxt.setTint(0xff00ff, 0xffffff, 0xff00ff,0xffffff);
    this.infoTxt.setDepth();

    this.scoreTxt.setScale(5);
    this.scoreTxt.setTint(0xff00ff, 0xffffff, 0xff00ff,0xffffff);
    this.scoreTxt.setDepth();

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
    this.deathSound = this.sound.add("death");
    this.roar = this.sound.add("roar")
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
    /*Stops the player being bounced around like mad if he's stuck between the enemy and the worldBounds.*/
    this.player.body.setMaxSpeed(1000);

    
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
    




// console.log('num dead enemies: ' + this.deadEnemies.length);
this.scoreTxt.setText('Score: ' + this.deadEnemies.length)

    
    this.changeTint();
    this.changePlayerTint();

    //this.enemy.setVelocityX(80);
    var doors = this.doors.getChildren();
    var cigs = this.cigs.getChildren();
    if(!this.touchingEnemy1 && !this.touchingEnemy2 && !this.touchingEnemy3 && !this.touchingEnemy4 && !this.touchingEnemy5 && !this.touchingEnemy6){
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
      this.seesPlayer = false;

    }

      else if(this.keyCtrl.isPressed){
        this.player.anims.play("crouch",true);
        // this.player.setVelocityX(0).setBounce(1);
      } 
        else if(this.keyShift.isDown){
          console.log('shift pressed')
          // this.player.setVelocityX(0).setBounce(1);
          this.player.anims.play("melee",true);

          this.playerMelee = true;

      }


    //If space is pressed and time passed in update > time since last fired
    else if (this.keySpace.isDown && time > this.lastFired && this.ammo>0) {
      if(this.ammo >= 0){
      this.ammo--;

      }
      console.log('ammo left: ' + this.ammo)
        console.log("fire")
        this.bulletCount+= 1;
        console.log('bulletcount ' + this.bulletCount)
        this.bullet = this.bullets.get();
        


        /*If bullet exists*/

        this.bullet.update(time,delta,this,this.player)
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

        }
      }

      else if(this.keyCtrl.isDown){
        this.player.anims.play("crouch",true);
      
        /*Let the attack animation run until the bullet is 1/4 the screen's width away from the player*/
      }else if(this.bullet && this.bullet.x < (this.player.x + this.scaleW/4) && this.bullet.active){
        // this.player.setVelocityX(0).setBounce(1)
        this.player.anims.play("attack",true);
      }
      else if(this.player.x<10 || this.player.x == this.bg.width){
      //  this.player.body.setMass(100000);
      }
    

    else {
      // this.player.setVelocityX(0).setBounce(1);
      this.player.body.setSize(60)
      // this.player.body.setVelocityX(0)
      this.player.anims.play("still",true);
      //console.log('running')
    }
  }else{
    if(this.touchingEnemy1 || this.touchingEnemy2 || this.touchingEnemy3 || this.touchingEnemy4 || this.touchingEnemy5 || this.touchingEnemy6){
      this.player.anims.play("crouch",true);
      this.player.body.setBounce(2,2);
      this.cameras.main.shake(500);
      
      
    }else{
      this.player.body.setBounce(0,0);
    }
  }
    
    var numCigs = cigs.length;
    // console.log(cigs.length)
    // console.log('numdoors: ' + numDoors)



for (let i = 0; i < numCigs; i++) {
/*You have a max of 8 bullets. Ammo can't be collected unless you have less than 8. Just refills to max.*/
  if(!this.keySpace.isDown && cigs[i]){
  if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        cigs[i].getBounds()
      )
    ){
    if(!this.keySpace.isDown){
    /*Return ammo when you pick up cigs*/

          if (this.bulletCount>0) {
            cigs[i].setVisible(false);
            cigs[i].setActive(false)
            cigs[i].destroy();
            if(this.ammo<8){
              this.ammo+=this.bulletCount;
              // this.ammoPrint = this.ammo-1;
              this.bulletCount = 0;
            }
          }

      } 
    }  
  }
}




if(this.player.x > this.enemy1.x || this.player.x < this.enemy1.x ){
  this.touchingEnemy1 = false;
}

if(this.player.x > this.enemy2.x || this.player.x < this.enemy2.x){
  this.touchingEnemy2 = false;
}

if(this.player.x > this.enemy3.x || this.player.x < this.enemy3.x){
  this.touchingEnemy3 = false;
}
if(this.player.x > this.enemy4.x || this.player.x < this.enemy4.x){
  this.touchingEnemy4 = false;
}
if(this.player.x > this.enemy5.x || this.player.x < this.enemy5.x){
  this.touchingEnemy5 = false;
}
if(this.player.x > this.enemy6.x || this.player.x < this.enemy6.x){
  this.touchingEnemy6 = false;
}


  this.infoTxt.setText('Ammo: ' + this.ammo) 

    
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
    
    if(this.playerAlive && this.player.x > 14800 && this.player.x < this.bg.width && this.cursors.up.isDown || this.deadEnemies.length == 6){
      this.time.delayedCall(
        500,
        function () {
          this.scene.start("GameWin", { score: this.deadEnemies.length })
        },
        [],
        this
      );
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
    if(this.enemy3.enemyAlive){
      this.enemy3.followPlayer(this, this.player.x);
    }
    if(this.enemy4.enemyAlive){
      this.enemy4.followPlayer(this, this.player.x);
    }
    if(this.enemy5.enemyAlive){
      this.enemy5.followPlayer(this, this.player.x);
    }
    if(this.enemy6.enemyAlive){
      this.enemy6.followPlayer(this, this.player.x);
    }
   

    if(this.enemy1.seesPlayer){
      this.roar.play();
    }
    if(this.enemy2.seesPlayer){
      this.roar.play();

    }
    if(this.enemy3.seesPlayer){
      this.roar.play();

    }
    if(this.enemy4.seesPlayer){
      this.roar.play();

    }
    if(this.enemy5.seesPlayer){
      this.roar.play();

    }
    if(this.enemy6.seesPlayer){
      this.roar.play();

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
        this.deathSound.play();
        this.scene.start("GameOver", { score: this.deadEnemies.length })
      },
      [],
      this
    );
  }

  
}

