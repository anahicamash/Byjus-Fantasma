var tower, towerImg;
var doorImg, doorGroup;
var climberImg, climberGroup;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
   
  doorGroup = new Group();
  climberGroup = new Group();
  
  
  
  
}

function draw(){
  background(0);
  
  if(gameState==="play"){
    
    if(tower.y > 600){
        tower.y = 300
    }
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(climberGroup.isTouching(ghost) || ghost.y > 600 || ghost.x < 100 || ghost.x > 500 ){
      ghost.destroy();
      gameState = "end"
    }

    drawFigures();
    drawSprites();
  }
  else if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
}

function drawFigures(){
  if(frameCount%260 === 0){
    var door = createSprite(200,-50);
    door.addImage("door", doorImg);
    door.velocityY=3;
    door.x = Math.round(random(120, 400));
    door.lifetime = 800;
    doorGroup.add(door);
    ghost.depth = door.depth + 2;
    
    var climber = createSprite(200,10);
    climber.addImage("climber", climberImg);
    climber.velocityY=3;
    climber.x = door.x;
    climber.lifetime = 800;
    climber.debug = true;
    climberGroup.add(climber);
    
   
    
    
  }
}

