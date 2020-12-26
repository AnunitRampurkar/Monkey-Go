//Create Global Variables:

var gameState = 1;
var PLAY = 1
var END = 0;

var monkey, monkey_running, monkeyImage, monkeyImage2;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;

//-------------------------------------------------------------------------

function preload(){
  
//Load running animation for monkey:
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  
//Load an image to change the animation to collided:
  monkeyImage = loadAnimation("sprite_7.png");
  
//Load an image to change the animation after jump:
  monkeyImage2 = loadAnimation("sprite_0.png");
  
//Load images for sprites:
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

//-------------------------------------------------------------------------

function setup() {
  
//Create canvas:
  createCanvas(600,300);
  
//Create Monkey sprites:
  monkey = createSprite(80,230,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided", monkeyImage);
  monkey.addAnimation("jumping", monkeyImage2);
  monkey.scale = 0.12;
  
//Create ground:
  ground = createSprite(400,270,900,10);
  ground.velocityX = -5;
  console.log(ground.x);
  
//Create groups:
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
//Define score:
  score = 0;
  
  console.warn("😊Made by Anunit Rampurkar😊");
  
}

//-------------------------------------------------------------------------

function draw() {
  
//Create background:
  background("lightGreen");
  
//Collide the monkey with ground:
  monkey.collide(ground);
  
//Give gravity to monkey:
  monkey.velocityY = monkey.velocityY + 0.8;
  
//Make the ground infinite:
    ground.x = ground.width/2;
  
  if(gameState === PLAY) {
    
//Make the monkey jump:
    if(keyDown("space") && monkey.y >= 228) {
      monkey.velocityY = -15;
      monkey.changeAnimation("jumping", monkeyImage2);
    }
    
    if(keyWentUp("space")) {
      monkey.changeAnimation("moving", monkey_running);
    }
    
//Spawn the bananas & obsatcles:
    Banana();
    Obstacles();
    
//Score:
  stroke("black");
  textSize(20);
  fill("black");
  score = Math.round(frameCount/frameRate());
  text("Survival Time: " + score, 420, 50);
    
  }
  
//Change the game state to end:
  if(monkey.isTouching(obstacleGroup)) {
    
    gameState = END;
    
    monkey.changeAnimation("collided", monkeyImage);
    
    monkey.velocityY = 0;
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);    
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
  
  if(gameState === END) {
    
    textSize(35);
    fill("blue");
    text("Game Over", 210, 130);
    
    textSize(35);
    fill("red");
    text("Press 'R' to restart the game", 80, 170);
  }
  
  if(keyDown("r") && gameState === END) {
//Make the score 0:
    score = 0;
    
//Make the game state play:
    gameState = PLAY;
    
//Change the animation of monkey:
    monkey.changeAnimation("moving", monkey_running);
  }
  
  //console.log(frameCount);
  
//Draw the sprites:
  drawSprites();
  
}

//-------------------------------------------------------------------------

function Banana() {
    
//Make the banana spawn after every 80 frames;
  if(frameCount%80 === 0) {
    banana = createSprite(600,50,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -5;
    
//Give random Y position to bananas:
    banana.y = Math.round(random(110,170));
    
//Give lifetime:
    banana.lifetime = 130;
    
//Make the depth of monkey more than the banana:
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+2;
    
//Add banana in its group:
    bananaGroup.add(banana);
    
  }
  
//console.log(banana.y);
  
}

//-------------------------------------------------------------------------

function Obstacles() {
  if(frameCount%170 === 0) {
    obstacle = createSprite(600,245,20,20);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.12;
    obstacle.velocityX = -5;
    obstacle.setCollider("circle", 0, 0, 150);
    
    obstacleGroup.add(obstacle);
    
//Give lifetime:
    obstacle.lifetime = 130;
    
    //obstacle.debug = true;
    
  }
}

