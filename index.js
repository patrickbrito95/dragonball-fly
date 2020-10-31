
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

// PERSONAGEM 

function drawGoku(){
    
    ctx.drawImage(goku, 50, 100);    
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
  





