
    //DOM

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

    //START GAME

document.getElementById('start-button').onclick = function (){
document.getElementById('canvas-intro').style.display = "none";
document.getElementById('canvas').style.display = "block";

startGame();

};


    // GAME OVER

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

  // VARIÁVEIS

const myGameArea = {
  myObstacles: [],
  frames: 0,
}



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
  
  limitsBottom: function(){
    if(this.y >= canvas.height - goku.height - 90 || this.goku.height >= 300){
      this.gravity = 0;
      return;
    }
    
  },

  limitsTop: function(){
    if(this.y < 0){
      this.gravity = 0;
    }
  }
    
  };


function drawGoku() {
    personagem.move();
    personagem.draw();
    personagem.limitsBottom();
    personagem.limitsTop();
    // music.play();
    requestAnimationFrame(drawGoku);
}
  
  //COLISÕES

  // function createObstacles(){
  //   x = myGameArea.canvas.width;
  //   y = myGameArea.canvas.height;
  //   height = Math.floor(Math.random() * (200 - 20 + 1) + 20);
  //   gap = Math.floor(Math.random() + (200 - 100 + 1) + 100);
  //   myGameArea.myObstacles.push(
  //     new Component( 70, height, "./images/blast.png", x, 0)
  //   );
  
  //     myGameArea.myObstacles.push(
  //       new Component(
  //         70, y - height - gap, "./images/blast.png", x, height + gap
  //       )
  //     );
  // }

  //   if(myGameArea.frames % 120 === 0){
  //     createObstacles();
  //   }




    //CONTROLES

document.addEventListener('keydown', function(e){
  if(e.key === " "){
    personagem.gravity = 5;
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
      y: -480,
      speed: -50.5,
      frames: 0,
      obstacle: [],
  
      move: function() {
        this.x += this.speed;
        this.x %= canvas.width + 700;
        
      },
    
      draw: function() {
        ctx.drawImage(this.blast, this.x + canvas.width, this.y, 750, 750); 
      },
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


   function gameOver(){
     ctx.fillStyle = "black";
     ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
     ctx.font = "50px Arial";
     ctx.fillText("GAME OVER!!!", 350, 250);
   }

   



    window.onload = updateScore; 
    goku.onload = drawGoku;
    blast.onload = updateObstacle;
    img.onload = updateCanvas;
    
  
  

