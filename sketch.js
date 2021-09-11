var bow , arrow,  scene;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var arrowGroup, redB, blueB, greenB, pinkB;

var score=0;

//Game States
var PLAY=1;
var END=0;
var gameState = PLAY;

var gameOverImg;
var arrowSound , checkPointSound, blastSound;

var counter = 0;
var timeleft = 30;

function convertSeconds(s)
{
  var min = floor(s / 60);
  var sec = s % 60;
  return min + ':' + sec;
}

function preload()
{
  
  backgroundImage = loadImage("background.jpg");
  arrowImage = loadImage("arrow.png");
  bowImage = loadImage("bow.png");
  red_balloonImage = loadImage("balloon 1.png");
  green_balloonImage = loadImage("balloon 2.png");
  pink_balloonImage = loadImage("balloon 3.png");
  blue_balloonImage = loadImage("balloon 4.png");
  
  gameOverImg =loadImage("gameOver.png");

  arrowSound = loadSound("jump.mp3");
  blastSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");

}



function setup() 
{
  var timer = select('#timer');
  timer.html(convertSeconds(timeleft - counter));

  function timeIt(){
    counter++;
    timer.html(convertSeconds(timeleft - counter));
  }
  setInterval(timeIt, 1000);

  createCanvas(600, 450);
  
  //creating background
  scene = createSprite(0,0,400,600);
  scene.addImage(backgroundImage);
  scene.scale = 2.0;

  // creating bow to shoot arrow
  bow = createSprite(595,220,20,20);
  bow.addImage(bowImage); 
  bow.scale = 0.2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  redB = new Group();
  greenB = new Group();
  blueB = new Group();
  pinkB = new Group();
  arrowGroup = new Group();

  score = 0;    

}

function draw()
{

 if(gameState === PLAY)
  {
     gameOver.visible = false;

     // moving ground
     scene.velocityX = -3 

     if (scene.x < 0)
     {
       scene.x = scene.width/2;
     }
  
     //moving bow
     bow.y = World.mouseY
  
     // release arrow when space key is pressed
     if (keyDown("space")) 
     {
      createArrow();
      arrowSound.play();
     }
   
     //creating continous enemies
     var select_balloon = Math.round(random(1,4));
  
     if (World.frameCount % 100 == 0) {
      if (select_balloon == 1) {
        redBalloon();
      } else if (select_balloon == 2) {
        greenBalloon();
      } else if (select_balloon == 3) {
        blueBalloon();
      } else {
        pinkBalloon();
      }
     }   

     if (arrowGroup.isTouching(redB))
     {
      redB.destroyEach();
      blastSound.play();
      arrowGroup.destroyEach();
      score=score+1;
     }
     else if (arrowGroup.isTouching(greenB))
     {
      greenB.destroyEach();
      blastSound.play();
      arrowGroup.destroyEach();
      score=score+2;
     }

     else if (arrowGroup.isTouching(blueB))
     {
      blueB.destroyEach();
      blastSound.play();
      arrowGroup.destroyEach();
      score=score+3;
     }

     else if (arrowGroup.isTouching(pinkB))
     {
      pinkB.destroyEach();
      blastSound.play();
      arrowGroup.destroyEach();
      score=score+4;
     }
    
     else if (timeleft===0)
     {
      gameState = END;
     }

    else if (gameState === END) 
    {
     gameOver.visible = true;

     //set lifetime of the game objects so that they are never destroyed
     redB.setLifetimeEach(-1);
     greenB.setLifetimeEach(-1);
     blueB.setLifetimeEach(-1);
     pinkB.setLifetimeEach(-1);
     arrowGroup.setLifetimeEach(-1);

      redB.setVelocityXEach(0);
      greenB.setVelocityXEach(0); 
      blueB.setVelocityXEach(0);
      pinkB.setVelocityXEach(0);
      arrowGroup.setVelocityXEach(0);

    }

  }
  drawSprites();
  fill("white");
  textSize(30);
  text("Score: "+score, 450,50);
}


// Creating  arrows for bow
function createArrow() 
{
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -10;
  arrow.lifetime = 100;
  arrow.scale = 0.2;

  //add each arrow to the group
  arrowGroup.add(arrow);

}

function redBalloon()
{
  var red = createSprite(0,Math.round(random(20, 370)), 5, 5);
  red.addImage(red_balloonImage);
  red.velocityX = 4;
  red.lifetime = 150;

  //add each red balloon to the group
  redB.add(red);

}

function blueBalloon() 
{
  var blue = createSprite(0,Math.round(random(20, 370)), 5, 5);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 4;
  blue.lifetime = 150;

  //add each blue balloon to the group
  blueB.add(blue)

}

function greenBalloon() 
{
  var green = createSprite(0,Math.round(random(20, 370)), 5, 5);
  green.addImage(green_balloonImage);
  green.velocityX = 4;
  green.lifetime = 150;

  //add each green balloon to the group
  greenB.add(green)

}

function pinkBalloon() 
{
  var pink = createSprite(0,Math.round(random(20, 370)), 5, 5);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 4;
  pink.lifetime = 150;

  //add each pink balloon to the group
  pinkB.add(pink)

}
