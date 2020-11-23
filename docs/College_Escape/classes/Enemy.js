console.log("Enemy class");

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y,spriteName,animKey) {        
        super(scene, x, y, spriteName,animKey);
  
        //     this.enemy = this.physics.add.sprite(this.randomX,this.scaleH/1.7, 'creature', 'creature/walk/001.png').setBounce(1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
  
        this.body.setSize(this.width, this.height -10);

        this.seesPlayer = false;
        this.enemyAlive = true;
        this.hitCount = 0;
        // this.randomX = Phaser.Math.Between(0,scene.bg.width);
        this.collideWorldBounds = true;
        this.enableBody = true;

        // scene.physics.add.overlap(
        //     scene.bullets,
        //     this,
        //     scene.collBulletEnemy,
        //     null,
        //     scene);
    // scene.physics.add.overlap(
    //     scene.bullets,
    //     this,
    //     scene.collBulletEnemy,
    //     null,
    //     scene);

        

  
  scene.anims.create({
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

 
        
    changeTint(){
        if(this.hitCount == 1){
            this.tint =  0xa00900;
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
      
      
      
        
    followPlayer(scene, x){
      
      if(x > (this.x - scene.scaleW/2) || x > (this.x + scene.scaleW/2) ){
       /*If seesPlayer is true, tweening stops*/
       /*seesPlayer can also be made true by shooting the enemy*/
        this.seesPlayer = true;
        console.log(this + ' sees player')
      }
            /*If to left*/
             if (x < this.x && this.seesPlayer) {
            
             this.flipX = true;
            this.setVelocityX(-500);
            /*If to right*/
          } else  if (x > this.x && this.seesPlayer) {
            this.setVelocityX(500);
            this.flipX = false;
          }
      }

      createEnemyTween(scene,x){
        this.tween = scene.tweens.add({
          targets: this,
          x: { from: this.x, to: this.x+800 },
          // alpha: { start: 0, to: 1 },
          // alpha: 1,
          // alpha: '+=1',
          ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 2000,
          repeat: -1,            // -1: infinity
          yoyo: true,
          flipX:true
        });
        if(this.seesPlayer){
          this.tween.pause();
          console.log('tween has stopped')
        }else{
          this.tween.play();
          console.log('tween is playing')
        }
      }

    //   collBulletEnemy(scene, bullet, enemy) {
    //     enemy.hitCount++;
    
    //     console.log('hitcount is ' + this.hitCount)
    //     // this.bullet.setActive(false);
    //     // this.bullet.setVisible(false);
    //     enemy.changeTint();
    //     enemy.seesPlayer = true;
    //     // this.enemy.destroy();
    //     // this.enemyAlive = false;
    //     bullet.setActive(false);
    //     bullet.setVisible(false);
        
    //     bullet.destroy();
        
    //   }
    


}