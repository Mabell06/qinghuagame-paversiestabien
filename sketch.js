//personaje
var qinghua, qinghuarunImg;
var fondo, fondoImg;

//sonidos
var jumpSound, collidedSound;

//nose
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//extras
var roca, rocaImg
var pergaminos, pergaminosImg


function preload(){
  qinghuaRunImg = loadAnimation("img1.png", "img2.png", "Img3.png");
  fondoImg = loadImage("paisaje.png"); 
  rocaImg = loadImage("rocaa.png");
  pergaminosImg = loadImage("pergaminos.png");

  jumpSound = loadSound("sonidodesalto.mp3")
  collidedSound = loadSound("sonidodemuerte.mp3")
}

function setup() {
  createCanvas(600,300);
  //createCanvas(windowWidth, windowHeight);

  fondo = createSprite(0, 0, 600, 600)
  fondo.addImage(fondoImg);
  
  fondo.x = fondo.width /2;

  qinghua = createSprite(90,197,50,50);
  qinghua.addAnimation("running", qinghuaRunImg);
  qinghua.scale = 0.17;  
  
  roca = createSprite(200, 262, 50, 50);

  pergaminos = createSprite(200, 90, 50, 50);
  pergaminos.addImage(pergaminosImg);
  pergaminos.scale = 0.30;
}

function draw() {
 background("width");
 fondo.velocityX = -3; 
 textSize(20);
 fill("black")
 text("Puntuación insana: "+ score,30,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    fondo.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && qinghua.y  >= height-120) {
      jumpSound.play( )
      qinghua.velocityY = -10;
       touches = [];
    }
    
    //qinghua.velocityY = qinghua.velocityY + 0.8
  
    if (fondo.x < 0){
      fondo.x = fondo.width/2;
    }
  
    if (pergaminos.isTouching(qinghua)) {
      pergaminos.destroyEach;
      score=score+50;
    }
    //trex.collide(invisibleGround);
    //spawnClouds();
    //spawnObstacles();
  
    if(roca.isTouching(qinghua)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    //establecer la velocidad de cada objeto del juego como 0
    fondo.velocityX = 0;
    qinghua.velocityY = 0;
    //roca.setVelocityXEach(0);
    
    
    //establecer lifetime de los objetos del juego para que no sean destruidos nunca
   // roca.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }

  if(frameCount % 60 === 0) {
    roca.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    roca.velocityX = -(6 + 3*score/100);
    
    //generar obstáculos al azar
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: roca.addImage(rocaImg);
              break;
   
    
    //asignar escala y lifetime al obstáculo           
    roca.scale = 0.0480;
    roca.lifetime = 300;
    roca.depth = qinghua.depth;
    qinghua.depth +=1;
  }

  drawSprites();
  }
}