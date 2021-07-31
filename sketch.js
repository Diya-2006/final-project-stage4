var bg, bgImg;
var player, shooterImg, shooter_shooting;
var bat, batimg, batgroup;
var zombie1group, zombie2group ,zombie1, zombie2, zombie;
var bullet;
var bullets=70;
var gameState="fight";
var heart1img,heart2img,heart3img;

function preload() {
  shooterImg = loadAnimation(
    "assets/sh1.png",
    "assets/sh2.png",
    "assets/sh3.png",
    "assets/sh4.png",
    "assets/sh5.png"
  );
  shooter_shooting = loadAnimation(
    "assets/s1.png",
    "assets/s2.png",
    "assets/s3.png",
    "assets/s4.png"
  );
  batimg = loadAnimation(
    "assets/bat1.png",
    "assets/bat2.png",
    "assets/bat3.png",
    "assets/bat4.png",
    "assets/bat5.png",
    "assets/bat6.png"
  );
  bgImg = loadImage("assets/backg.jpg");
  zombie1 = loadImage("assets/z1.png");
  zombie2 = loadImage("assets/z2.png");
  heart1img=loadImage("assets/heart_1.png")
  heart2img=loadImage("assets/heart_2.png")
  heart3img=loadImage("assets/heart_3.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.2;
  bg.x = width / 2;
  bg.velocityX = -6;

  //creating the player sprite
  player = createSprite(displayWidth - 1200, displayHeight - 280, 50, 50);
  player.addAnimation("standing", shooterImg);
  player.scale = 0.3;
  player.debug = false;
  player.setCollider("rectangle", 0, 0, 300, 300);

  heart1=createSprite(displayWidth-150,40,20,20);
  heart1.visible=false;
  heart1.addImage("heart1",heart1img)

  heart2=createSprite(displayWidth-100,40,20,20);
  heart2.visible=false;
  heart2.addImage("heart2",heart2img)

  heart3=createSprite(displayWidth-150,40,20,20);
 heart3.scale=0.4;
  heart3.addImage("heart3",heart3img)

  batgroup = new Group();
  zombie1group = new Group();
  zombie2group = new Group();
  bulletgroup=new Group();
  
}

function draw() {
  background(0);
if(gameState==="fight"){

  if (bg.x < 200) {
    bg.x = bg.width / 2;
  }

  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30;
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30;
    player.addAnimation("crouching", shooter_shooting);
  }

  if (keyWentDown("space")) {
    bullet=createSprite(displayWidth=-1150,player.y-30,20,10);
    bullet.velocityX=20;
    bulletgroup.add(bullet);
    player.depth=bullet.depth;
    player.depth=player.depth+2;
    player.addAnimation("crouching", shooter_shooting);
    bullets=bullets+1;
  } else if (keyWentUp("space")) {
    player.addAnimation("standing", shooterImg);
  }
  if(bullet==0){
    gameState="bullet";
  }

  if(zombie1group.isTouching(bulletgroup)){
    for(var i=0; i<zombie1group.length;i++){
      if(zombie1group[i].isTouching(bulletgroup)){
        zombie1group[i].destroy();
        bulletgroup.destroyEach();
      }
      }}
    if(zombie2group.isTouching(bulletgroup)){
      for(var i=0; i<zombie2group.length;i++){
        if(zombie2group[i].isTouching(bulletgroup)){
          zombie2group[i].destroy();
          bulletgroup.destroyEach();
        }
      }
  }
  
  if(zombie1group.isTouching(player)){
    for(var i=0; i<zombie1group.length;i++){
      if(zombie1group[i].isTouching(player)){
        zombie1group[i].destroy();
      }
      }
    }
    if(zombie2group.isTouching(player)){
      for(var i=0; i<zombie2group.length;i++){
        if(zombie2group[i].isTouching(player)){
          zombie2group[i].destroy();
        
        }
      }
  }
  spawnbats();
  spawnzombie1();
  spawnzombie2();
}
  drawSprites();
 
  if(gameState=="lost"){
    textSize(100);
    fill("yellow");
    text("YOU LOST",400,400);
    zombie1group.destroyEach();
    zombie2group.destroyEach();
    player.destroy();
  }
  if(gameState=="won"){
    textSize(100);
    fill("yellow");
    text("YOU WON",400,400);
    zombie1group.destroyEach();
    zombie2group.destroyEach();
    player.destroy();
  }
  if(gameState=="bullet"){
    textSize(50);
    fill("yellow");
    text("YOU RAN OUT OF BULLETS!",470,410);
    
    zombie1group.destroyEach();
    zombie2group.destroyEach();
    player.destroy();
    bulletgroup.destroyEach();
  }
}
function spawnbats() {
  if (frameCount % 160 === 0) {
    
    var bat = createSprite(width + 20, height - 300, 40, 10);
    bat.y = Math.round(random(100, 220));
    bat.addAnimation("flying", batimg);
    bat.scale = 0.2;
    bat.velocityX = -3;
    bat.lifetime = 600;
    bat.depth = player.depth;
    player.depth = player.depth + 1;
    batgroup.add(bat);
  }
}
function spawnzombie1() {
  if (frameCount % 160 === 0) {
    var zombie = createSprite(random(500,1100), random(100,500), 20, 30);
    zombie.setCollider('circle', 0, 0, 45)
    zombie.addImage(zombie1);
    zombie.scale=0.1;
    zombie.velocityX = -3
    zombie.lifetime = 400;
    zombie.depth = player.depth;
    player.depth += 1;

    zombie1group.add(zombie);

  }
}
function spawnzombie2() {
  if (frameCount % 160 === 0) {
    var Zombie = createSprite(random(500,1100), random(100,500), 20, 30);
    Zombie.setCollider('circle', 0, 0, 45)
    Zombie.addImage(zombie2);
    Zombie.scale=0.1;
    Zombie.velocityX = -3
    Zombie.lifetime = 400;
    Zombie.depth = player.depth;
    player.depth += 1;

    zombie2group.add(Zombie);
  }
}
