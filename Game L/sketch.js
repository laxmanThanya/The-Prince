const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var bg,bg_img;
var bg2,bg2_img;
var bg3,bg3_img;
var prince,prince_img;
var invisGround;
var coin,coin_image;
var king,king_img;
var coin_img;
var coin2,coin3,coin4;
var coinScore=0;
var gameLevel=1;
var coinScore_img;
var level1,level1_img;
var level2,level2_img;
var thorn_img;

function preload(){
 bg_img = loadImage("background.jpg");
 prince_img = loadAnimation("p-1.png","p-2.png","p-3.png","p-5.png","p-6.png");
 coin_image = loadImage("coin.png");
 bg2_img = loadImage("backgr.jpg");
 level1_img = loadImage("level-1.png");
 coin_img = loadImage("money.png");
 level2_img = loadImage("level-2.png");
 thorn_img = loadImage("thorn.png");
 bg3_img = loadImage("bg3.jpg");
 king_img = loadAnimation("z-1.png","z-2.png","z-3.png","z-4.png");
}

function setup(){
    var canvas = createCanvas(1500,800);
    bg = createSprite(800,350,100,50);
    bg.addImage("img",bg_img);
    bg.scale = 3.3;
    bg.velocityX=-2;

    bg2 = createSprite(800,100,100,50);
    bg2.addImage("img",bg2_img);
    bg2.scale = 3.3;
    bg2.velocityX=-2;

    bg3 = createSprite(800,300,100,50);
    bg3.addImage("img",bg3_img);
    bg3.scale = 1.0;
    bg3.velocityX=-2;

    prince = createSprite(100,650,50,50);
    prince.addAnimation("img",prince_img);
    prince.scale = 2.5;

    invisGround = createSprite(100,780,1500,50);
    invisGround.visible = false;

        coin = createSprite(1600,500,50,50);
        coin.addImage("image",coin_image);
        coin.scale=0.2;
        coin.velocityX=-5;

        coin2 = createSprite(2400,500,50,50);
        coin2.addImage("image",coin_image);
        coin2.scale=0.2;
        coin2.velocityX=-5;

        coin3 = createSprite(3800,500,50,50);
        coin3.addImage("image",coin_image);
        coin3.scale=0.2;
        coin3.velocityX=-5;

        coin4 = createSprite(4800,500,50,50);
        coin4.addImage("image",coin_image);
        coin4.scale=0.2;
        coin4.velocityX=-5;

    king = createSprite(1150,680,50,50);
    king.addAnimation("img",king_img);
    king.scale = 0.4;
    king.velocityX=-4;

    coinScore_img = createSprite(1200,50,50,50);
    coinScore_img.addImage("image",coin_image);
    coinScore_img.scale = 0.1;

    level1 = createSprite(800,150,50,50);
    level1.addImage("img",level1_img);

    level2 = createSprite(800,150,50,50);
    level2.addImage("img",level2_img);

    

    ThornGroup = new Group();
    CoinGroup = new Group();
}

function draw(){
    //background(0);

    if(bg.x<700){
        bg.x = 800;
    }
    if(bg2.x<700){
        bg2.x = 800;
    }
    if(bg3.x<700){
        bg3.x = 800;
    }

    if(keyDown("space")){
        prince.velocityY=-9;
    }
    prince.velocityY = prince.velocityY+0.5;
    prince.collide(invisGround);

    if(prince.isTouching(coin)){
        coin.destroy();
        coinScore = coinScore+1;
    }

    if(prince.isTouching(coin2)){
        coin2.destroy();
        coinScore = coinScore+1;
    }

    if(prince.isTouching(coin3)){
        coin3.destroy();
        coinScore = coinScore+1;
    }

    if(prince.isTouching(coin4)){
        coin4.destroy();
        coinScore = coinScore+1;
    }

    
    
    if(coinScore ===0){
        bg2.visible = false;
        level2.visible = false;
        bg3.visible = false;
        king.visible = false;
    }
    if(coinScore ===1){
        bg2.visible = false;
        level2.visible = false;
        bg3.visible = false;
        king.visible = false;
    }

    if(coinScore === 2){
        gameLevel = 2;
        
    }

    if(gameLevel === 2){
        bg.visible = false;
        bg2.visible = true;
        bg3.visible = false;
        king.visible = false;
        level1.destroy();
        level2.visible = true; 
        spawnThorns();
        
    }

    if(coinScore ===3){
        bg.visible = false;
        bg2.visible = true;
        level2.visible = true;
        king.visible = false;
        level1.destroy();
        bg3.visible = false;
    }

    if(coinScore === 4){
        ThornGroup.destroyEach();
        gameLevel = 3;
    }

    if(gameLevel === 3){
        bg3.visible = true;
        king.visible = true;
        bg2.visible = false;
        level2.destroy();
    }

    if(prince.isTouching(ThornGroup)){
        prince.destroy();
        coinScore = 0;
        bg2.velocityX=0; 
        ThornGroup.setVelocityXEach(0);
        coin.destroy();
        textSize(30);
        fill("red");
        text("Game Over !",400,500);
    }
    
    console.log(king.depth);
    console.log(bg3.depth);

    drawSprites();
    textSize(30);
    fill("black");
    text(": "+coinScore,1250,60);
}

function spawnThorns(){

    if(frameCount % 200 === 0){
      var thorn = createSprite(1100,800,0,0);
      thorn.y = random(680,730);
      thorn.addImage(thorn_img);
      thorn.scale = random(0.4,0.7);
      thorn.velocityX = -5;
  
      thorn.lifetime = 300;
      ThornGroup.add(thorn);
    }
}


