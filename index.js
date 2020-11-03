
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

const blast = new Image();
blast.src = './images/blast.png';


    // SONS

const explositon = new Audio();
explositon.src = './sounds/explosion.mp3';

const music = new Audio();
music.src = './sounds/we-gotta-power.mp3';


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
    backgroundImage.draw();
  
    requestAnimationFrame(updateCanvas);
  }

 
    //PERSONAGEM 


const personagem = {
  goku: goku,
  y: 0,
  x: 0,
  gravity: -1,
  speedX: 0,
  speedY: 0,

  move: function() {
    this.y -= this.gravity--;  
    
  },

  draw: function() {
   ctx.drawImage(this.goku, 50, this.y + this.goku.height, 95, 90);
  },
  
  limits: function(){
    if(this.y >= canvas.height - goku.height - 90){
      this.gravity = 0;
    }
  },
    
  };


function drawGoku() {
    personagem.move();
    personagem.draw();
    personagem.limits();
    // music.play();
    requestAnimationFrame(drawGoku);
}
  
  //OBSTACULOS


  
    
    
    goku.onload = drawGoku;
    window.onload = updateObstacle;
    img.onload = updateCanvas;
    
  






    //CONTROLES

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

  
    // COLISÃO E OBSTÁCULOS

    // class Component {
    //   constructor(width, height, image, x, y) {
    //     this.image = new Image();
    //     this.image.src = image;
    //     this.x = x;
    //     this.y = y;
    //     this.width = width;
    //     this.height = height;
    //     this.speedX = 0;
    //     this.SpeedY = 0;
    //     this.frames = 0;
    //     this.obstacles = [];
    

    //   left() {
    //     return this.x;
    //   }
    
    //   right() {
    //     return this.x + this.width;
    //   }
    
    //   top() {
    //     return this.y;
    //   }
    
    //   bottom() {
    //     return this.y + this.height;
    //   }
    
    //   isCrashedWith(obstacle) {
    //     const condition = !(
    //       this.bottom() < obstacle.top() ||
    //       this.top() > obstacle.bottom() ||
    //       this.right() < obstacle.left() ||
    //       this.left() > obstacle.right()
    //     );
    
    //     return condition;
    //   }
    // };

    const obstacles = {
      blast: blast,
      x: 0,
      y: Math.floor(Math.random() * (400 - 100 + 1) + 1),
      speed: -7.5,
      frames: 0,
      obstacle: [],
  
      move: function() {
        this.x += this.speed;
        this.x %= canvas.width + 400;
        
      },
    
      draw: function() {
        ctx.drawImage(this.blast, this.x + canvas.width, this.y, 50, 50);  
      }
    
    };

    
    
    function updateObstacle() {
        obstacles.move();
        obstacles.draw();
        requestAnimationFrame(updateObstacle);
    }  

    //SCORE 

    const score = {
      score: 0,
      frames: 0,
  
      points: function() {
        this.frames++;
        if(this.frames % 20 === 0){
          this.score++;
        }
      },
    
      draw: function() {
          ctx.font = "20px Arial";
          ctx.fillStyle = "black";

          ctx.fillText(`Score: ${this.score}`, 600, 50);
      },
    };
    
    function updateScore() {
        score.points();
        score.draw();
        requestAnimationFrame(updateScore);
    }  

    // window.onload = updateScore;
  

