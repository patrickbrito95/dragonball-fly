
// DOM

window.onload = function () {
  
    document.getElementById("start-button").onclick = function () {
    document.getElementById("title").style.display = "none";
    document.getElementById("game-board").style.display = "block";

    
    startGame();
  };

  function startGame() {
    game.start();


    // IMAGES

    background = new Background("./images/cenario2.png");
    goku = new Component(78, 70, "./images/goku.png", 100, 110);
    game.myObstacles = [];
  }


    // SOUNDS

    const music = new Audio();
    weGottaPower = './sound/we-gotta-power.mp3';
  
    // GAME


  const game = {
      
      canvas: document.createElement("canvas"),
      myObstacles: [],
      frames: 0,
      gravity: 0.2,
      drawCanvas: function () {
      this.canvas.width = 730;
      this.canvas.height = 400;
      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").append(this.canvas);
    },
    start: function () {
      this.drawCanvas();
      this.reqAnimation = window.requestAnimationFrame(updateGame);
    
    },
    
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
    score: function () {
      points = Math.floor(this.frames / 5);
      this.context.font = "20px Verdana";
      this.context.fillStyle = "black";
      this.context.fillText("Score: " + points, 20, 50);
    },
    
    stop: function () {
      cancelAnimationFrame(this.reqAnimation);
      this.gameOver();
    },
    
    gameOver: function () {
      this.clear();
      this.drawFinalPoints();
      this.restartGame();
    },
    drawFinalPoints: function () {
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.font = "38px Verdana";
      this.context.fillStyle = "red";
      this.context.fillText("GAME OVER!", 245, 130);
      this.context.fillStyle = "white";
      this.context.fillText("SCORE: " + points, 275, 180);
    },
    
    restartGame: function () {
      setTimeout(function () {
        document.getElementById("game-board").style.display = "none";
        document.getElementById("title").style.display = "block";
      }, 3500);
    },
  };
  

  //OBSTACLES


  function Component(width, height, image, x, y) {
    this.image = new Image();
    this.image.src = image;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.fly = 0;
    this.update = function () {
      
      game.context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    };

    
    this.newPos = function () {
      this.x += this.speedX;
      goku.speedY = goku.speedY + (game.gravity - goku.fly);
      this.y += goku.speedY;
    };
    this.left = function () {
      return this.x;
    };
    this.right = function () {
      return this.x + this.width;
    };
    this.top = function () {
      return this.y;
    };
    this.bottom = function () {
      return this.y + this.height;
    };


    this.crashObstacle = function (obstacle) {
      

      return !(
        goku.bottom() < obstacle.top() ||
        goku.top() > obstacle.bottom() ||
        goku.right() < obstacle.left() ||
        goku.left() > obstacle.right()
      );
    };

    
    this.outOfCanvas = function (obstacle) {
      return goku.bottom() > game.canvas.height || goku.top() < 0;
    };
  }

  function createObstacle() {
    
    x = game.canvas.width;
    y = game.canvas.height;
    height = Math.floor(Math.random() * (400 - 20 + 1) + 20);
    blastDistance = Math.floor(Math.random() * (400 - 100 + 1) + 100);
    
    game.myObstacles.push(
      new Component(100, 100, "./images/blast.png", x, height)
    );
    game.myObstacles.push(
      new Component(100, 100, "./images/blast2.png", x, blastDistance)
    );
  }
  function updateGame() {
    
    for (i = 0; i < game.myObstacles.length; i++) {
      if (goku.crashObstacle(game.myObstacles[i])) {
        game.stop();
        return;
      }
    }

    if (game.frames % 150 === 0) {
      createObstacle();
    }
    
    game.clear();
    background.draw();

      game.myObstacles.forEach(function (obstacle) {
      obstacle.x += -8;
      obstacle.update();
    });
    game.frames += 1;
    goku.newPos();
    goku.update();
    game.score();

    
    if (goku.outOfCanvas()) {
      game.stop();
      return;
    }
     game.reqAnimation = window.requestAnimationFrame(updateGame);
  }




  // BACKGROUND


  function Background(source) {
    this.img = new Image();
    this.img.src = source;
    this.scale = 2.5;
    this.y = 0;
    this.dx = 15;
    this.imgW = this.img.width;
    this.imgH = this.img.height;
    this.x = 0;
    this.clearX = 0;
    this.clearY = 0;
    that = this;
    this.img.onload = function () {
      that.imgW = that.img.width * that.scale;
      that.imgH = that.img.height * that.scale;
      
    };
    
    this.draw = function () {
      ctx = game.context;
      if (that.imgW <= game.canvas.width) {
        if (that.x > game.canvas.width) {
          that.x = -that.imgW + that.x;
        }
        if (that.x > 0) {
          ctx.drawImage(
            that.img,
            -that.imgW + that.x,
            that.y,
            that.imgW,
            that.imgH
          );
        }
        if (that.x - that.imgW > 0) {
          ctx.drawImage(
            that.img,
            -that.imgW * 2 + that.x,
            that.y,
            that.imgW,
            that.imgH
          );
        }
      } else {
        if (that.x > game.canvas.width) {
          that.x = game.canvas.width - that.imgW;
        }
        if (that.x > game.canvas.width - that.imgW) {
          ctx.drawImage(
            that.img,
            that.x - that.imgW + 1,
            that.y,
            that.imgW,
            that.imgH
          );
        }
      }
      ctx.drawImage(that.img, that.x, that.y, that.imgW, that.imgH);
      that.x += that.dx;
    };
  }
  
  // CONTROLS
  
  document.onkeydown = function (e) {
    if (e.key == " ") {
      goku.fly = 0.7;
    }
  };

  
  document.onkeyup = function (e) {
    if (e.key == " ") {
      goku.fly = 0;
    }
  };
};

Audio.play();
