var rexC, rex, rexCollide;
var chao, chaoA, chaoIn;
var nuvem, nuvensIM, nuvensG;
var obs1, obs2, obs3, obs4, obs5, obs6, obsG;
var score = 0;
var play = 1;
var end = 0;
var estado = play;
var gameOverImg, restartImg, restart, gameover;


function preload (){
  rexC = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  rexCollide = loadAnimation ("trex_collided.png");
  chaoA = loadImage ("ground2.png");
  nuvensIM = loadImage ("cloud.png");
  obs1 = loadImage ("obstacle1.png");
  obs2 = loadImage ("obstacle2.png");
  obs3 = loadImage ("obstacle3.png");
  obs4 = loadImage ("obstacle4.png");
  obs5 = loadImage ("obstacle5.png");
  obs6 = loadImage ("obstacle6.png");
  gameOverImg = loadImage ("gameOver.png");
  restartImg = loadImage ("restart.png");
}


function setup(){

  createCanvas(600,200);


  rex = createSprite (50, 160, 20, 20);
  chao = createSprite (300,183,600,20 );

  rex.addAnimation ("running", rexC);
  rex.addAnimation ("collided", rexCollide);
  rex.scale = 0.5;

  chao.addImage ("chao", chaoA);

  gameover = createSprite (300,100);
  gameover.addImage (gameOverImg);
  gameover.scale = 0.5;

  restart = createSprite (300,140);
  restart.addImage (restartImg);
  restart.scale = 0.5;

  chaoIn = createSprite (200, 190, 400, 10);
  chaoIn.visible = false;

  obsG = createGroup();
  nuvens = createGroup();

  rex.setCollider("circle", 0, 0, 40);
  rex.debug = true;
}


function draw(){
  background(180);

  text ("pontuação:" + score, 500, 50);

  // !!ESTADO = JOGANDO!!
  if (estado === play){
    gameover.visible = false;
    restart.visible = false;

    chao.velocityX = -4;
    score = score + Math.round(frameCount/60);

    if (chao.x <0){
      chao.x = chao.width /2;
    }

    if (keyDown ("E") && rex.y >=100){
      rex.velocityY = -13;
    }

    rex.velocityY = rex.velocityY + 0.8;

    criar_nuvens ();
    criar_obs ();

    if (obsG.isTouching (rex)){
    estado = fim;
    }

  } else if (estado === fim){


    rex.velocityY = 0;
    chao.velocityX = 0;

    obsG.setLifetimeEach (-1);
    nuvens.setLifettimeEach (-1);

    gameover.visible = true;
    restart.visible = true;

    rex.changeAnimation ("collided", rexCollide);

    obsG.setVelocityXEach (0);
    nuvensG.setVelocityXEach (0);
  }

  rex.collide (chaoIn);

  drawSprites();
  
}

function criar_nuvens (){
  if (frameCount %60 === 0){
    nuvem = createSprite (600, 100, 40, 20);
    nuvem.scale = 0.7
    nuvem.addImage (nuvensIM);
    nuvem.y = Math.round (random(10,60))
    nuvem.velocityX = -5

    console.log ("rex:", rex.depth);
    console.log ("nuvem:", nuvem.depth);
    nuvem.lifetime = 200;

    nuvem.depth = rex.depth;
    rex.depth = rex.depth + 1;
    nuvensG.add (nuvem);
  }
 
}

function criar_obs () {
  if (frameCount % 60 == 0){
    var obs = createSprite (400, 165, 10, 40);
    obs.velocityX = -6;

    var rand = Math.round (random (1,6));
    switch (rand){
      case 1: obs.addImage(obs1);
             break;
      case 2: obs.addImage(obs2);
              break;
      case 3: obs.addImage(obs3);
              break;
      case 4: obs.addImage(obs4);
              break;
      case 5: obs.addImage(obs5);
              break;
      case 6: obs.addImage(obs6);
              break;
     default: break;
    }

    obs.scale = 0.5;
    obs.lifetime = 300;

    obsG.add (obs)
  }
}