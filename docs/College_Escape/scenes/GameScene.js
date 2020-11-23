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
    
    

    /*Make 3 enemies separately rather than a group.
    Couldn't apply Light2D pipeline to group, and I want this on the enemies.*/


    // this.enemy.createEnemyTween();
    // this.enemy2.createEnemyTween();
    // this.createEnemy1();
    // this.createEnemy2();
    // this.createEnemy3();

    // this.createEnemyTween();

    
    // this.createPrinters();
    //this.text = this.add.bitmapText(0, 0, 'myfont', 16.34);
    // this.createHealthBar();
    //this.scoreLabel = this.add.bitmapText(50, 50, 'font', '0', 128); 

    
  }

  createEnemies(){
    this.enemy = new Enemy(this,this.randomPos(),this.scaleH/1.7,'creature','walk')
    this.enemy.createEnemyTween(this,this.enemy.x);
    this.enemy.addBulletOverlap(this,this.bullet,this.player)
    // this.enemy.collBulletEnemy(this.bullets);
    
    // this.enemy.createEnemyTween(this.enemy)
    this.enemy2 = new Enemy(this,this.randomPos(),this.scaleH/1.7,'newCreature','walking')
    this.enemy2.createEnemyTween(this,this.enemy2.x);
    
    
    
    
    // this.enemy2.collBulletEnemy(this.bullet);
    // this.enemy.collBulletEnemy(this,this.bullets,this.enemy2);

    // this.enemy.addBulletOverlap(this,this.player);
    // this.physics.add.overlap(
    //   this.bullets,
    //   this.enemy,
    //   this.collBulletEnemy(this.enemy),
    //   null,
    //   this);

    //   this.physics.add.overlap(
    //     this.bullets,
    //     this.enemy2,
    //     this.collBulletEnemy(this.enemy2),
    //     null,
    //     this);


  }




  changeTint(){
    if(this.enemy.hitCount == 1){
      this.enemy.tint =  0xa00900;
    }
    else if(this.hitCount == 2){
      this.tint =  0x7f0700;
  
    }else if(this.hitCount == 3){
      this.tint =  0x5c0500;
  
    }else if(this.hitCount >3){
      this.destroy();
      this.enemyAlive = false;
    }
  
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
  
  // collBulletEnemy(enemy) {
  //   enemy.hitCount++;

  //   console.log('hitcount is ' + enemy.hitCount)
  //   // this.bullet.setActive(false);
  //   // this.bullet.setVisible(false);
  //   enemy.changeTint();
  //   enemy.seesPlayer = true;
  //   // this.enemy.destroy();
  //   // this.enemyAlive = false;
  //   this.bullet.setActive(false);
  //   this.bullet.setVisible(false);
    
  //   this.bullet.destroy();
    
  // }

  
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




  createEnemy1(){
    // this.randomX = Phaser.Math.Between(0,this.bg.width);
    // this.enemyAlive = true;

    // this.enemy = this.physics.add.sprite(500,this.scaleH/1.7, 'creature').setBounce(1);





    // this.anims.create({
    //   key: 'walk',
    //   frames: this.anims.generateFrameNumbers('creature', {
    //     start: 0,
    //     end:1,
    //   }),
    //   frameRate: 4,
    //   repeat: -1,
      
    // });

    // this.enemy.anims.play('walk',true)
    // // this.enemy = this.physics.add.sprite(this.randomX,this.scaleH/1.7, 'creature', 'creature/walk/001.png').setBounce(1);
    // this.enemy.setScale(5);
    // this.player.setScrollFactor(1,0)
    
    //Enemy is a json 'multiatlas' spritesheet with normal map
    // this.frameNames = this.anims.generateFrameNames('creature', {
    //     start: 1,
    //     end: 2,
    //     zeroPad: 3,
    //     prefix: 'creature/walk/',
    //     suffix: '.png',
    // });

    // //console.log(frameNames);

    // this.config = {
    //     key: 'walk',
    //     frames: this.frameNames,
    //     frameRate: 2,
    //     repeat: -1
    // };

    // this.anims.create(this.config);
    // this.enemy.play('walk')


    // this.enemy.enableBody = true;
    // //Collide with the walls
    // this.enemy.collideWorldBounds = true;


    // this.physics.add.overlap(
    //   this.bullets,
    //   this.enemy,
    //   this.collBulletEnemy,
    //   null,
    //   this);

    //   this.physics.add.overlap(
    //     this.player,
    //     this.enemy,
    //     this.collPlayerEnemy,
    //     null,
    //     this);


//Add enemy to the light2d 'pipeline'
//  this.enemy.setPipeline('Light2D');
  }

  createEnemy2(){
    this.randomX = Phaser.Math.Between(0,this.bg.width);

    this.enemy2 = this.physics.add.sprite(200,this.scaleH/1.7, 'newCreature').setBounce(1);





    this.anims.create({
      key: "walking",
      frames: this.anims.generateFrameNumbers("newCreature", {
        start: 0,
        end:1,
      }),
      frameRate: 4,
      repeat: -1,
      
    });

    this.enemy2.anims.play("walking",true)

       //Enemy is a json 'multiatlas' spritesheet with normal map
    //    this.frameNames = this.anims.generateFrameNames('newCreature', {
    //     start: 0,
    //     end:1,
    //     repeat: -1
    // });
    // this.enemyAlive = true;



    //Enemy is a json 'multiatlas' spritesheet with normal map
  //   this.frameNames = this.anims.generateFrameNames('creature', {
  //     start: 1,
  //     end: 2,
  //     zeroPad: 3,
  //     prefix: 'creature/walk/',
  //     suffix: '.png',
  // });

  // //console.log(frameNames);

  // this.config = {
  //     key: 'walk',
  //     frames: this.frameNames,
  //     frameRate: 2,
  //     repeat: -1
  // };

  // this.anims.create(this.config);
  // this.enemy.play("walk")

  // this.anims.create(this.config);
  // this.enemy.play('walk')



    this.enemy2.setScale(5)
    // this.player.setScrollFactor(1,0)

    this.enemy2.enableBody = true;
//     //Collide with the walls
    this.enemy2.collideWorldBounds = true;


    this.physics.add.overlap(
      this.bullets,
      this.enemy2,
      this.collBulletEnemy,
      null,
      this);

//       this.physics.add.overlap(
//         this.player,
//         this.enemy2,
//         this.collPlayerEnemy,
//         null,
//         this);


// //Add enemy to the light2d 'pipeline'
//  this.enemy2.setPipeline('Light2D');
  }

  createEnemy3(){

  }



  // createEnemyTween(){
  //   this.tween = this.tweens.add({
  //     targets: this.enemy,
  //     x: { from: this.enemy.x, to: this.enemy.x+1000 },
  //     // alpha: { start: 0, to: 1 },
  //     // alpha: 1,
  //     // alpha: '+=1',
  //     ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  //     duration: 2000,
  //     repeat: -1,            // -1: infinity
  //     yoyo: true,
  //     flipX:true
  //   });
  //   if(this.enemy.seesPlayer){
  //     this.tween.pause();
  //     console.log('tween has stopped')
  //   }else{
  //     this.tween.play();
  //     console.log('tween is playing')
  //   }

  //   this.tween2 = this.tweens.add({
  //     targets: this.enemy2,
  //     x: { from: this.enemy2.x, to: this.enemy2.x+1000 },
  //     // alpha: { start: 0, to: 1 },
  //     // alpha: 1,
  //     // alpha: '+=1',
  //     ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  //     duration: 2000,
  //     repeat: -1,            // -1: infinity
  //     yoyo: true,
  //     flipX:true
  //   });
  //   if(this.enemy2.seesPlayer){
  //     this.tween.pause();
  //     console.log('tween has stopped')
  //   }else{
  //     this.tween.play();
  //     console.log('tween is playing')
  //   }
  // }



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





  // collBulletEnemy(bullet, enemy) {
  //   this.hitCount++;

  //   console.log('hitcount is ' + this.hitCount)
  //   // this.bullet.setActive(false);
  //   // this.bullet.setVisible(false);
  //   this.changeTint(enemy);
  //   this.seesPlayer = true;
  //   // this.enemy.destroy();
  //   // this.enemyAlive = false;
  //   this.bullet.setActive(false);
  //   this.bullet.setVisible(false);
    
  //   this.bullet.destroy();
    
  // }

// collPlayerEnemy(player,enemy){
//   if(player.x < this.enemy.x){
    
//   this.enemy.x+=50;
//   }else{
//     this.enemy.x-=50;
//   }
//   player.playerDamage+=25;
//   console.log('collplayerenemy')
//   this.changePlayerTint();
// }

changePlayerTint(){
  console.log('changeplayertint')
  if(this.playerDamage == 25){
    
    this.cameras.main.shake(500);
    this.bg.setTint(0x5c0500);
    // this.player.setTint(0x5c0500);
    // this.doors.setTint(0x5c0500);
  }else if(this.playerDamage == 50){

  }else if(this.playerDamage == 75){

  }
  else if(this.playerDamage == 100){

  }
}



  
  update(time, delta) {
    this.keyCtrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);    // let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    // let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


if(this.enemy.hitCount != 0){
  this.changeTint();
}



    this.physics.add.collider(this.enemy,this.printer, this.hitObject, null, this);


    //this.enemy.setVelocityX(80);
    var doors = this.doors.getChildren();
    var cigs = this.cigs.getChildren();

    if (this.cursors.left.isDown) {
      this.bg.tilePositionX = this.myCam.scrollX -=5;
      //this.furniture.tilePositionX = this.myCam.scrollX -=5;
      this.player.setVelocityX(-250);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
     this.bg.tilePositionX = this.myCam.scrollX +=5;
     //this.furniture.tilePositionX = this.myCam.scrollX +=5;
      this.player.setVelocityX(1000);
      this.player.anims.play("right", true);

    } else if(this.cursors.up.isDown){
      this.player.setVelocityX(0);
      
      this.player.anims.play("hide", true);

    }

      else if(this.keyCtrl.isPressed){
        this.player.anims.play("crouch",true);
      } 
        else if(this.keyShift.isDown){
          console.log('shift pressed')
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
        this.player.setVelocityX(0)
        this.player.anims.play("attack",true);
      }
    

    else {
      
      this.player.setVelocityX(0);
      this.player.body.setSize(60)
      this.player.anims.play("still",true);
      //console.log('running')
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

    //this.spotlight.x = this.player.x + 25;


// this.collBulletEnemy(this.enemy);
    

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

    if(this.enemy.enemyAlive){
      this.enemy.followPlayer(this, this.player.x);
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

