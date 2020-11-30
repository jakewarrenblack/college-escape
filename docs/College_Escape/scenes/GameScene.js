//13: Physics
class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  
  init(data) {
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
    this.isMuted = data.isMuted;
  }

  create() { 
    //Max ammo
    this.ammo = 8;
    //Used by our cigs to find out how many bullets have been fired
    this.bulletCount = 0;
    this.score = 0;
    this.playerCrouch;
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
    
    //Collisions
    this.createBullets();
    this.createEnemyBullets();
    this.createEnemies();
    this.collideBulletsPlayer();

    this.createPrinters();
    this.createDesks();

    this.fastestDeath;
    //If a localStorage item called 'fastestDeath' doesn't already exist, instantiate it to 0.
    //Otherwise, set our blank variable of fastestDeath to be the same as what we have in local storage.
    //This means our fastestDeath won't be reset after every game.

    if(localStorage.getItem('fastestDeath')===null){
      this.fastestDeath = 0;
    }else{
      this.fastestDeath=localStorage.getItem('fastestDeath');
    }

    //The floor is an invisible platform the same width as the background. The player and enemies collide with it.
    //There is gravity in this game, so this is necessary to stop them from falling through the world.
    this.physics.add.collider(this.player, this.platforms);
  }

  
  //I was creating a pause menu as a class, but then realised it'd be better to use the UIScene.

  // createPauseMenu(){
    
  //   this.pauseMenu = new PauseMenu(this,this.player.x,this.scaleH/2)
  //   this.pauseMenu.setScrollFactor(0)
  //   this.player.anims.stop();
  //   if(this.pauseMenu.closed == true){
  //     this.pauseMenu.destroy();
  //     // this.pauseMenu.destroy();
  //   }
  // }



   startScene(targetScene) {
    this.scene.start(targetScene);
  }



  createEnemies(){
    this.enemiesGroup = this.physics.add.group();
     //Instantiate as an empty array, then push enemies as they're created.
    this.enemiesArray = [];
  
    for(var i =1; i<4;i++){
      this['enemy'+i] = new Enemy(this,this.randomPos(),this.scaleH/1.7,'creature','walk');
      this.enemiesGroup.add(this['enemy'+i],true);
      this.enemiesArray.push(this['enemy'+i]);
    }
  
    for(var j = 4; j<7;j++){
      this['enemy'+j] = new Enemy(this,this.randomPos(),this.scaleH/1.7,'newCreature','walking');
      this.enemiesGroup.add(this['enemy'+j],true);
      this.enemiesArray.push(this['enemy'+j]);
    }
  
    this.physics.add.collider(this.enemiesGroup,this.platform);
  }


//Changes the enemy's colour, progressively darker shades of red until the enemy dies.
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
              this.roar.play();
              if(enemy.enemyAlive){
                //Counts our dead enemies. This is our running score which is then shown in gameOver if the player dies.
                this.deadEnemies.push(enemy)
                //Removes from memory.
                enemy.destroy();
                enemy.enemyAlive = false;
              }
            }
        });
      }
}

  //This runs in the update, constantly checking the player's hitcount. Kills the player if hitcount is above 20,
  //Otherwise just increases hitcount and turns darker shades of red.
  //I could have restored health with pickups too, but wanted to make the game harder.
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
      
      //This functon is delayed by 500ms.
      this.time.delayedCall(
        500,
        function () {
          //Fade out for 2500ms.
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


  //This is triggered after our 500ms delay in the collPlayerEnemy functions.
  hitCountIncrease(){
    this.playerHitCount++;
  }


  createBullets() { 
  //We create a group of bullets, each an instance of our Bullet class
  this.bullets = this.physics.add.group({
    classType: Bullet,
    //Only 8 bullets allowed
    maxSize: this.ammo,
    runChildUpdate: true
  });

  //This allows us to access each SINGLE bullet
  this.bullet; 
  this.lastFired = 0;
  }

  createEnemyBullets(){
    this.enemyBullets = this.physics.add.group({
      classType:EnemyBullet,
      maxSize:20,
      runChildUpdate:true
    })
    this.enemyBullets;
    this.enemyLastFired = 0;
  }


  //We loop through and add a physics overlap or physics collider in each case.
  collideBulletsPlayer(){
    //For...of is new to javascript. This iterates over the values of an 'iterable' object, in our case an array.
    for(const enemy of this.enemiesArray){
      //Use collider rather than overlap as I want them to be separated.
      
      this.physics.add.collider(this.bullets,enemy,function(){
        //This function will run on collision. This eliminated the need for separate functions to check collisions.
        this.bullet.setActive(false);
        this.bullet.setVisible(false);
        this.bullet.destroy();
        enemy.hitCount++;
        this.monsterHurt.play();
      },function(){
      },this);


      this.physics.add.collider(this.player,this.enemyBullets,function(){
        //This function will run on collision. This eliminated the need for separate functions to check collisions.
        this.enemyBullet.setActive(false);
        this.enemyBullet.setVisible(false);
        this.enemyBullet.destroy();

        if(this.playerCrouch == false){
          this.oof.play();
          this.time.delayedCall(500, this.hitCountIncrease, [], this);
        }
        this.pop.play();
      },function(){
      },this);

      this.physics.add.collider(this.player,enemy, function(){
        this.touchingEnemy = true;
        this.oof.play();
        this.time.delayedCall(500, this.hitCountIncrease, [], this);
        if(this.playerMelee){
          enemy.hitCount+=0.5;
        this.monsterHurt.play();
      }},function(){
      },this);
    }
  }


  randomPos(){
    /*Randomly position enemies, but not right at the exit or right in front of the player.*/
    return Phaser.Math.Between(this.scaleW+this.scaleW/20,this.bg.width-200);
  }   

  //Creates our final exit door. Normal map added to this one for a reflective appearance.
  createExit(){
    this.exit = this.physics.add.sprite(14820, this.scaleH-100, "exit");
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
      //Light2D doesn't seem to be possible on groups.
      pipeline: 'Light2D',
    });
    //Slightly transparent
    this.windows.setAlpha(0.8)

    // scale windows up slightly
    Phaser.Actions.ScaleXY(this.windows.getChildren(), 1.5,1.5 );
  }

  createDoor() {
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

    //If player presses up, the door will open.
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
    //Ammo
    this.infoTxt = this.add.text(50,50, 16, 'text', { fontSize: '50px', fill: '#fff' });
    //0 scrollfactor allows us to fix the text to the centre, rather than allowing the camera to scroll past it.
    this.infoTxt.setScrollFactor(0)

    //Enemies killed
    //This tet is set to just 'text' up here, but this.scoreTxt.setText is used in the update to change it.
    this.scoreTxt = this.add.text(this.scaleW-400,50, 16, 'text', { fontSize: '50px', fill: '#fff' });
    this.scoreTxt.setScrollFactor(0)
    
    this.infoTxt.setScale(5);
    //Creates a three colour gradient
    this.infoTxt.setTint(0x700200, 0xffffff, 0xffed66,0xbfff66);

    this.scoreTxt.setScale(5);
    this.scoreTxt.setTint(0x700200, 0xffffff, 0xffed66,0xbfff66);
  }

  //Creating our group of cigs.
  //Random starting position, random number from 2 to 10, and a random stepX.
  createAmmo(){
    this.cigs = this.physics.add.group({
      key: "cig",
      repeat: Phaser.Math.Between(2,10),
      score: 5,
      setXY: {
        x: this.randomPos(),
        y: this.scaleH/1.52,
        stepX: Phaser.Math.Between(500,2000),
        stepY: 0,
      },
      pipeline: 'Light2D',
    });
  }

  //Adding our sounds. Background music looped.
  createAudio() {
    this.music = this.sound.add("bgmusic");
    this.music.play();
    this.music.loop = true;
    this.deathSound = this.sound.add("death");
    this.roar = this.sound.add("roar")
    this.monsterHurt = this.sound.add("monster-hurt")
    this.oof = this.sound.add("oof");
    this.pop = this.sound.add("pop");
  }

  //Allow input from cursor keys (arrows).
  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  //This is a transparent sprite the same width as our background, used to stop objects from falling through the world.
  createFloor(){
    this.platform = this.physics.add.sprite(0, this.scaleH/1.47, 'floor');
    this.platform.setOrigin(0,0);
  }


  createBackground() {
    //Turns on the Phaser lights.
    this.lights.enable().setAmbientColor(0x333333);

    //  Add an image and set it to use Lights2D
    this.bg = this.add.sprite(0, 0, "background");
    
    // change the origin to the top-left corner
    this.bg.setOrigin(0, 0);

    this.bg.setScale(1);
    this.bg.setPipeline('Light2D');
    var light = this.lights.addLight(20,20, 200).setScrollFactor(0.0).setIntensity(3);
    this.lights.enable().setAmbientColor(0x555555);

    //The mousePointer now controls the spotlight.
    this.input.on('pointermove', function (pointer) {
        light.x = pointer.x;
        light.y = pointer.y;
    });
  }

  //These are just for show. I did intend to have these and the desks act as cover against an enemy long-range attack, but I didn't
  //have time to implement this.
  createPrinters(){
    this.printers = this.physics.add.group({
      key: "printer",
      repeat: 1,
      score: 8,
      setXY: {
        x: this.scaleW/2,
        y: this.scaleH/1.68,
        stepX: this.bg.width/5,
        stepY: 0,
      },
      pipeline: 'Light2D',
    });
    
    Phaser.Actions.ScaleXY(this.printers.getChildren(), 3.2,2.1 );
    //Redundant, would have been used if used as cover and colliders added.
    this.printers.enableBody = true;
  }

  createDesks(){
    this.desks = this.physics.add.group({
      key: "desk",
      repeat: 1,
      score: 5,
      setXY: {
        x: this.scaleW/1.1,
        y: this.scaleH/1.63,
        stepX: this.bg.width/4,
        stepY: 0,
      },
      pipeline: 'Light2D',
    });
    
    Phaser.Actions.ScaleXY(this.desks.getChildren(), 1,1 );
    this.desks.enableBody = true;
  }

  createCamera() {
    // Accessing our default Phaser camera.
    this.camera = this.cameras.main;

    // Camera constrainted to width and height of our background.
    this.camera.setBounds(
      0,
      0,
      14850,
      1140
    );
    // Physics world contained by same constraints as the background.
    this.physics.world.setBounds(
      0,
      0,
      14850,
      1140
    );
  }

    createPlayer() {
      this.player = this.physics.add.sprite(this.scaleW/8,this.scaleH/1.75, "man");

      //Allows for horizontal drag when the player is hit by an enemy.
      this.player.body.gravity.y = 1500;
      this.playerHitCount = 0;

      //Prevents player falling through platform.
      this.physics.add.collider(this.player,this.platform);

      /*Stops the player being bounced around like mad if he's stuck between the enemy and the worldBounds.*/
      this.player.body.setMaxSpeed(1000);

      //Do not allow the camera to scroll past the player.
      this.player.setScrollFactor(1,0)
    
      this.player.setScale(2)
      this.isPlayerAlive = true;
      
      //Camera centres on the player and follows.
      this.myCam = this.cameras.main.startFollow(this.player);

      //Player not allowed to move outside the world bounds (left and right sides of the background).
      this.player.setCollideWorldBounds(true);


      this.touchingEnemy = false;

      //Simulates air resistance when the player is knocked back by an enemy.
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
    }



  update(time, delta) {

    //If no fastestDeath has been set, fastestDeath will equal zero.
    //If it does not equal zero, and the fastestDeath already set is more than the time elapsed, fastestDeath is set to equal time.
    if(this.fastestDeath!=0){
      if(this.fastestDeath > time){
      this.fastestDeath = time;
      }
    }

    if(this.fastestDeath==0){
      this.fastestDeath = time;
    }

    //Define controls.
    this.keyCtrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.keyTab = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

    //Open pause menu.
    if(this.keyTab.isDown){
      const isNull = this.scene.get('Ui');
      //If Ui scene doesn't already exist, add it.
      if (null === isNull) {
        this.scene.add('Ui', UiScene, true);
      }
      //Start the Ui scene, opening the pause menu.
      this.scene.launch('Ui')
    }

    //ScoreTxt is currently blank. Set it to equal the number of dead enemies.
    this.scoreTxt.setText('Score: ' + this.deadEnemies.length)

    //Running in update to always check player and enemy hitCounts.
    this.changeTint();
    this.changePlayerTint();

    /*Get children of our doors/cigs to access each of them individually.*/
    var doors = this.doors.getChildren();
    var cigs = this.cigs.getChildren();

    /*Wrapping all of our movement/action controls in this if statement. If not touching any enemy, move normally.*/
    if(!this.touchingEnemy){
      if (this.cursors.left.isDown) {
        /*Scroll the background left.*/
        this.bg.tilePositionX = this.myCam.scrollX -=5;

        /*Run away a little bit faster than the enemy can chase you*/
        this.player.setVelocityX(-550)
        this.player.anims.play("left", true);
      } 
      else if (this.cursors.right.isDown) {
        /*Scroll the background right.*/
        this.bg.tilePositionX = this.myCam.scrollX +=5;
        this.player.setVelocityX(400)
        this.player.anims.play("right", true);
      }
      else if(this.cursors.up.isDown){ 
        //Does not work to actually hide the player from the enemies.
        //But player alpha is reduced if this happens in front of a door.
        this.player.anims.play("hide", true);
        this.seesPlayer = false;
      }

      else if(this.keyCtrl.isDown){
        //Intended for this to be how the player used cover, which hasn't been implemented.
        this.player.anims.play("crouch",true);
        this.playerCrouch = true;
      } 
      else if(this.keyShift.isDown){
        //If playerMelee is true, and the player is touching an enemy, deal 0.5 damage to the enemy.
        this.player.anims.play("melee",true);
        this.playerMelee = true;
      }

      //If we press space and the time passed in the update is greater than lastFired, allow firing.
      //Naturally, We also must have ammo to fire.
      else if (this.keySpace.isDown && time > this.lastFired && this.ammo>0) {
        if(this.ammo >= 0){
          //Reduce ammo when the player fires.
          this.ammo--;
        }

        //Used by the cigs to check active bullets. Bullets returned by ammo will equal bullets used, up to a maximum of 8 bullets.
        this.bulletCount+= 1;

        //Get single bullet.
        this.bullet = this.bullets.get();

        //Running the bullet's update function, passing time and delta from this update function, as well as our player.
        //The Bullet's update can now access what we've passed into it.
        this.bullet.update(time,delta,this,this.player)
        {

        this.bullet.setDir("r");

        //Bullet's initial position is set to the player's x and y position.
        this.bullet.fire(this.player.x, this.player.y);
        
        /*Prevent bullet spamming, can only fire once every 500ms*/
        //Last fired is checked against time passed within the update loop.
        this.lastFired = time + 500;

        //If the bullet's x position is greater than the player's x position + the width of the screen, deactivate it.
        //I don't want the player to be able to kill enemies without even seeing them.
        //Bullet will be destroyed by the counter within its update function anyway.
        if(this.bullet.x > (this.player.x + this.scaleW)){
          this.bullet.setActive(false);
        }
      }
    }

      /*Let the attack animation run until the bullet is 1/4 the screen's width away from the player*/
      else if(this.bullet && this.bullet.x < (this.player.x + this.scaleW/4) && this.bullet.active){
        this.player.anims.play("attack",true);
      }

      //If we're not pressing any keys, just play the 'standing still' animation, which is a single frame.
      else {
        this.player.anims.play("still",true);
      }
    }
    else{
      //If we are touching an enemy, we turn on bouncing so the player bounces away from the enemy (once they're not running towards them).
      //The camera will also shake and the player's 'crouch' animation will play.
      if(this.touchingEnemy){
      this.player.anims.play("crouch",true);
      this.player.body.setBounce(2,2);
      this.cameras.main.shake(500);
      }
      else{
      //If not touching any enemies, reset the player's bounce to 0.
      this.player.body.setBounce(0,0);
      }
    }

    //The length of our cigs array.
    var numCigs = cigs.length;
    for (let i = 0; i < numCigs; i++) {
      /*You have a max of 8 bullets. Ammo can't be collected unless you have less than 8. Just refills to max.*/
      //Couldn't allow ammo to be picked up while the player was firing, caused strange behaviour.
      if(!this.keySpace.isDown && cigs[i]){
        //Detect intersection between the player and a member of the cigs group.If player is firing, don't even detect overlap between them and the cigs.
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(),cigs[i].getBounds())){
          //Once again, do not allow ammo to be collected while the player is firing.
          if(!this.keySpace.isDown){
            /*Return ammo when you pick up cigs*/
            if (this.bulletCount>0) {
              //Cigs disappear when collided with, provided at least one bullet is curently active.
              cigs[i].setVisible(false);
              cigs[i].setActive(false)
              cigs[i].destroy();
              //If ammo is already full, don't collect the cigs.
              if(this.ammo<8){
                //Only return as many bullets as are currently active, up to the maximum of eight.
                this.ammo+=this.bulletCount;
                //Reset our active bullets counter to zero.
                this.bulletCount = 0;
              }
            }
          } 
        }  
      }
    }


    for(const enemy of this.enemiesArray){
      //If we're to the right or left of any enemy, we aren't touching them.
      if(this.player.x > enemy.x || this.player.x < enemy.x ){
        this.touchingEnemy = false;
      }

        //Follow player is a method in the Enemy class.
        if(enemy.enemyAlive){
        //If the enemy comes within a certain distance of the player, seesPlayer is set to true.
          enemy.followPlayer(this, this.player.x);
        }

        //seesPlayer is set to true within the Enemy's followPlayer function.
        if(enemy.seesPlayer){
          this.roar.play();
        }

        if(enemy.seesPlayer && enemy.x > this.player.x+this.scaleW/3 && enemy.enemyAlive){
          if(time > this.enemyLastFired){
            this.enemyBullet = this.enemyBullets.get();
            this.enemyBullet.update(time,delta)
            {
              this.enemyBullet.setDir("l");
              this.enemyBullet.fire(enemy.x, enemy.y);
              this.enemyLastFired = time + 2000;
              if(this.enemyBullet.x < (this.player.x - this.scaleW)){
                this.enemyBullet.setActive(false);
              }
            }
          }

        }
    }

    //Ammo is initialised as blank, set it to equal our ammo count.
    this.infoTxt.setText('Ammo: ' + this.ammo) 

        
    var numDoors = doors.length;
    for (let i = 0; i < numDoors; i++) {
      //Loop through our doors and check for interesection with player, so only the door the player is intersecting with
      //will be 'open' when the player presses up while in front of it.
      if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(),doors[i].getBounds())){
        if(this.cursors.up.isDown){
          doors[i].anims.play("open",true);
          this.player.setAlpha(0.2);
        }else{
          doors[i].anims.play("closed",true);
          //Reset the player's opacity.
          this.player.setAlpha(1);
        }
        break;
      }
    }
    //Win conditions are kill all enemies or reach the exit door and press up.
    //Second win condition is not yet properly implemented. Since hiding doesn't work, you can't actually reach the end without killing them all.   
    if(this.playerAlive && this.player.x > 14800 && this.player.x < this.bg.width && this.cursors.up.isDown || this.deadEnemies.length == 6){
      this.time.delayedCall(500,function () {
        //If we win, stop the music and fade the camera out.Then launch into the GameWin scene and pass the length of the deadEnemies array as 'score'.
        //Passing the length of deadEnemies isn't really necessary. Since it's the win condition, it can be presumed we've killed them all.
        this.music.stop();
        this.cameras.main.fade(500);
        this.scene.start("GameWin", { score: this.deadEnemies.length })
      },
      [],
      this
      );
    }

  }

  gameOver() {
    //When the player dies, set the localStorage's 'fastestDeath' variable to our fastestDeath stored within gameScene.
    localStorage.setItem('fastestDeath',this.fastestDeath)
    //Delay by 500ms.
    this.time.delayedCall(500,function () {
      this.deathSound.play();
      //Pass the length of our deadEnemies array into our gameOver scene.
      this.scene.start("GameOver", { score: this.deadEnemies.length })
    },
    [],
    this
    );
  }
}

