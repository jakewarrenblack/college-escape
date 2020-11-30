class Enemy extends Phaser.Physics.Arcade.Sprite {
  //I pass the spriteName and animKey as properties to the constructor, 
  //so I can create Enemy instances with different sprite names and animation keys.
  constructor(scene, x, y,spriteName,animKey,hitCount) {        
    super(scene, x, y, spriteName,animKey,hitCount);

    //Add this sprite to the GameScene. Scene is passed in our constructor when instantiating an enemy.
    scene.add.existing(this);
    //Add to the GameScene's physics.
    scene.physics.add.existing(this);

    //This is checked in GameScene. Plays the roar sound when true.
    //Set to true when the enemy is less than a certain distance from the player,
    //Or the enemy is shot.
    this.seesPlayer = false;
    this.enemyAlive = true;

    //Enemy not allowed to move outside the worldbounds (left and right sides of the background).
    this.collideWorldBounds = true;

    //Enables collision
    this.enableBody = true;

    //Checked within GameScene to reduce enemy's health/kill the enemy.
    this.hitCount = 0;

    this.roar = scene.sound.add("roar")

    scene.anims.create({
      //Passing our animKey and spriteName from the constructor.
      key: animKey,
      frames: scene.anims.generateFrameNumbers(spriteName, {
        start: 0,
        end:1,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.setScale(5)
    this.anims.play(animKey,true)
  }

 
  followPlayer(scene, x,player){
    //If enemy x is greater than or less than the player's position +- the width of the scene/2.
    if(x > (this.x - scene.scaleW/2) || x > (this.x + scene.scaleW/2) ){
      this.roar.play();

      /*seesPlayer can also be made true by shooting the enemy*/
      this.seesPlayer = true;
    }

    /*If to left*/
    if (x < this.x && this.seesPlayer) {
    this.flipX = true;
    this.setVelocityX(-500);
    
    } 
    /*If to right*/
    else if(x > this.x && this.seesPlayer) {
    this.setVelocityX(500);
    this.flipX = false;
    }   
  }

//Removed, couldn't get it working after implementing the Enemy class.
//Worked nicely before this class was implemented.

// createEnemyTween(scene,x){
//   this.tween = scene.tweens.add({
//     targets: this,
//     x: { from: x, to: x+300 },
//     ease: 'Linear', 
//     duration: 2000,
//     repeat: -1,  
//     yoyo: true,
//     flipX:true,
//     paused:false
//   });
//   if (this.tween.isPlaying() && this.seesPlayer)
//   {
//     this.tween.pause();
//       console.log('tween paused')
//     }
//   else
//   {
//     this.tween.resume();
//       console.log('tween resumed')
//   }
// }
}