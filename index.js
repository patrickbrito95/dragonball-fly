
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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
weGottaPower = './sound/we-gotta-power.mp3';

// START GAME 

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {

  }

};

// CLASS GENÉRICA PARA CRIAR O PERSONAGEM E OS OBSTACULOS DO JOGO

class Component {
  constructor(x, y, width, height, speed){
    this.image = new Image();
    this.image.src = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
  }

  left(){
    return this.x;
  }

  right(){
    return this.y + this.width;
  }

  top(){
    return this.y;
  }

  bottom(){
    return this.y +this.height;
  }

}

//PERSONAGEM 


const personagem = {
  goku: goku,
  y: 0,
  x: 10,
  gravity: -1.5,

  move: function() {
    this.y -= this.gravity;
    this.y %= canvas.height;
  },

  draw: function() {
    
    // ctx.drawImage(this.goku, 0, this.y);
    if(this.gravity < 0){
      ctx.drawImage(this.goku, 0, this.y + this.goku.height);
    } else {
      ctx.drawImage(this.goku, 0, this.y - personagem.height);
    }
    
    
    // ctx.drawImage(this.goku, 50, 150, 75, 78);
    // if (this.gravity < 0) {
    //   ctx.drawImage(this.goku, this.y + canvas.height, 100);
    // } else {
    //   ctx.drawImage(this.goku, this.y - this.goku.height, 100);
    // }
  },
};

function drawGoku() {
    personagem.move();
    personagem.draw();
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
  
 
// CONTROLES







