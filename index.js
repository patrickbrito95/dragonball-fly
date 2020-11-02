
//DOM

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//START GAME

document.getElementById('start-button').onclick = function (){
document.getElementById('canvas-intro').style.display = "none";

document.getElementById('canvas').style.display = "block";

}

// IMAGES

const img = new Image();
img.src = './images/cenario2.png';

const goku = new Image();
goku.src = './images/goku.png';

const kiBlast = new Image();
kiBlast.src = './images/ki-blast.gif';


// SONS

const explositon = new Audio();
explositon.src = './sounds/explosion.mp3';

const music = new Audio();
music.src = './sounds/we-gotta-power.mp3';



// VARIÁVEIS






//PERSONAGEM 


const personagem = {
  goku: goku,
  y: 0,
  x: 0,
  gravity: -0.001,

  move: function() {
    this.y -= this.gravity--;
  },

  draw: function() {
   ctx.drawImage(this.goku, 50, this.y + this.goku.height, 50, 54);
  },

};

function drawGoku() {
    personagem.move();
    personagem.draw();
    music.play();
    requestAnimationFrame(drawGoku);
}
   window.onload = drawGoku;
  
  //  CRIAÇÃO DO BACKGROUND DO JOGO

const backgroundImage = {
  img: img,
  x: 0,
  speed: -5,

  move: function() {
    this.x += this.speed;
    this.x %= canvas.width;
  },

  draw: function() {
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  },
};

function updateCanvas() {
    backgroundImage.move();
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
  
    requestAnimationFrame(updateCanvas);
  }
  
  img.onload = updateCanvas;
  
 // OBSTACULOS
 
 



  // CONTROLES

document.addEventListener('keydown', function(e){
  if(e.key === " "){
    personagem.gravity = 10;
    }
    console.log(e.key);
  
});

document.addEventListener('keyup', function(e){
  if(e.key === " "){
    personagem.gravity = 0;
    }
    console.log(e.key);  
});

//SCORE




