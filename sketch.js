var gameState="PLAY"
var monkey , monkey_running, ground,groundImage;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var reset ,resetImage;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.jpg");
  resetImage = loadImage("1.jpg");
}



function setup() {
   createCanvas(500,500);
   monkey = createSprite(100,405,40,60);
   monkey.addAnimation("running",monkey_running);
   monkey.scale=0.2;
  reset1 = createSprite(400,50,10,10);
  reset1.addImage(resetImage);
  reset1.scale=0.2
  
   ground = createSprite(250,500,500,700);
   ground.addImage(groundImage);
  
  // ground.scale =1;
  
  score=0;
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  monkey.debug = false;
  
}


function draw() {
   background("lightblue");
   
  textSize(15);
  text ("Survival time: "+ score,125,100); 
  if (gameState === "PLAY"){
 score = score + Math.round(getFrameRate()/60);
 
  if(ground.x<0){
     ground.x = ground.width/2;
  }
  if (keyDown("space") && monkey.y>=395){
      monkey.velocityY= -16;
  }
  ground.velocityX= -4;
  
  food();
  obstacles();
    
  monkey.velocityY=  monkey.velocityY+0.35;
    if(monkey.isTouching(obstacleGroup)){
      gameState="END";
  } 
   }
  monkey.collide(ground);
    
   if(gameState==="END"){
    ground.velocityX=0;
    monkey.velocityY=0; 
    obstacleGroup.setLifetimeEach (-1);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
     
     if (mousePressedOver(reset1)){
       reset();
     }
   }    
     
  
  
  drawSprites();
}

function food(){
   if(frameCount %80===0) {
      banana = createSprite(500,250,20,20);
      banana.addImage(bananaImage);
      banana.y= Math.round(random(150,250));
      banana.scale=0.1;
      banana.velocityX=-4;
      banana.lifetime=125;
      bananaGroup.add(banana);
   }
}

function obstacles(){
    if(frameCount %300===0){
     obstacle = createSprite(500,407,50,50);
     obstacle.addImage (obstacleImage);
     obstacle.scale=0.3;
     obstacle.velocityX=-4;
     obstacle.lifetime=130;
     obstacleGroup.add(obstacle);
     obstacle.debug=false;
     obstacle.setCollider("rectangle",0,0,500,500); 
    }
}
function reset(){
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    score = 0;
    gameState = "PLAY";
}


