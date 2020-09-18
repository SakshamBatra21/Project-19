var PLAY = 1;
var END = 0;
var Monkey;
var MonkeyRunning;
var Banana, bananaImage, bananaGroup;
var obstacleImage, obstacleGroup, obstacle;
var BackGround, BackGroundMoving;
var Score = 0;
var ground;
var gameState = PLAY;

function preload() {
BackGroundMoving = loadImage("jungle.jpg");
MonkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacleImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
}

function setup() {
  createCanvas(400, 400);
  
   BackGround = createSprite(200,200,400,400);
  BackGround.addAnimation("BackGround",BackGroundMoving);
  BackGround.x = BackGround.width /2;
  BackGround.velocityX = -(6 + 3*Score/100);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  Monkey = createSprite(100,345,20,20);
  Monkey.addAnimation("Monkey",MonkeyRunning);
  Monkey.scale = 0.1;
  
  ground = createSprite(200,380,400,20);
  ground.visible = false;
  
}

function draw() {
  background(400,400);  
  if(BackGround.x<0){
    BackGround.x = BackGround.width/2;
  }
if(Monkey.isTouching(bananaGroup)){
   bananaGroup.destroyEach();
  Score = Score + 2;
 
}
  if(Monkey.isTouching(obstacleGroup)){
  Monkey.scale = 0.05;
}

if(keyDown("space") && Monkey.y >= 340){
      Monkey.velocityY = -20 ;
    }
  Monkey.velocityY = Monkey.velocityY + 1;
  
Monkey.collide(ground);
fruit();
spawnObstacles();  
    
drawSprites();  
  text("Score: "+ Score, 300,50);
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -10;
    obstacle.addAnimation("obstacle",obstacleImage);
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.2;
  }
}
function fruit() {
  if(World.frameCount % 100 === 0) {  
     var Random = random(100,200);
    var Banana = createSprite(450,Random,10,40);
    Banana.velocityX = -10;
    Banana.addAnimation("banana",bananaImage);
    Banana.scale = 0.1;
    bananaGroup.add(Banana);
  }
}