function Pong(x, y, width, height) {
  const BALL_SPEED = 3;
  this.ball = {x: 250, y: 100, radius:10, dir:{}};
  this.paddles = [{x: width/2, y: 10, width:60, height: 10, inv: -1},
    {x: width/2, y: height-20, width:60, height: 10, inv: 1}];
  this.paddleSpeed = 5;
  this.input = [{},{}];

  this.setInput = function(input) {
    this.input = input;
  };
  this.render = function(ctx) {
    this.move();
    this.drawBoard(ctx);
  };
  this.resetBall = function(paddle) {
    this.ball.x = width / 2;
    this.ball.y = this.paddles[paddle].y - (this.paddles[paddle].inv * 30);
    var angle = Math.PI / 2 * Math.random() + Math.PI / 4;
    this.ball.dir.x = Math.cos(angle) * BALL_SPEED;
    this.ball.dir.y = -this.paddles[paddle].inv * Math.sin(angle) * BALL_SPEED;
  };
  this.move = function() {
    for (let i = 0; i < this.paddles.length; i++) {
      var x = this.input[i]['right'] ? this.paddles[i].inv * this.paddleSpeed : 0;
      x -= this.input[i]['left'] ? this.paddles[i].inv * this.paddleSpeed : 0;
      if(this.paddles[i].x <= this.paddles[i].width / 2 && x < 0
         || this.paddles[i].x >= width - this.paddles[i].width / 2 && x > 0)
        x = 0;
      this.paddles[i].x += x;
    }
    if(this.ball.y < -20) {
      this.resetBall(0);
    } else if (this.ball.y > height + 20) {
      this.resetBall(1);
    }
    this.ball.y = this.ball.y + this.ball.dir.y
    // if(this.ball.y - this.ball.radius < 0) {
    //   this.ball.y += -2*(this.ball.y - this.ball.radius);
    //   this.ball.dir.y *= -1;
    // }
    // if(this.ball.y + this.ball.radius > height) {
    //   this.ball.y -= 2*(this.ball.y - height + this.ball.radius);
    //   this.ball.dir.y *= -1;
    // }
    if(this.ball.y - this.ball.radius < this.paddles[0].y + this.paddles[0].height
      && this.ball.y > this.paddles[0].y
      && this.ball.x + this.ball.radius/2 > this.paddles[0].x - this.paddles[0].width/2
      && this.ball.x - this.ball.radius/2 < this.paddles[0].x + this.paddles[0].width/2) {
        this.ball.y += -2*(this.ball.y - (this.paddles[0].y + this.paddles[0].height) - this.ball.radius);
      this.ball.dir.y *= -1;
    }
    if(this.ball.y + this.ball.radius > this.paddles[1].y
      && this.ball.y < this.paddles[1].y + this.paddles[1].height
      && this.ball.x + this.ball.radius/2 > this.paddles[1].x - this.paddles[1].width/2
      && this.ball.x - this.ball.radius/2 < this.paddles[1].x + this.paddles[1].width/2) {
      this.ball.y -= 2*(this.ball.y - this.paddles[1].y + this.ball.radius);
      this.ball.dir.y *= -1;
    }
    this.ball.x = this.ball.x + this.ball.dir.x
    if(this.ball.x - this.ball.radius < 0) {
      this.ball.x += -2*(this.ball.x - this.ball.radius);
      this.ball.dir.x *= -1;
    }
    if(this.ball.x + this.ball.radius > width) {
      this.ball.x -= 2*(this.ball.x - width + this.ball.radius);
      this.ball.dir.x *= -1;
    }
  }
  this.drawBoard = function(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = 'white';
    for (const paddle of this.paddles) {
      ctx.fillRect(x + paddle.x - paddle.width / 2,
        y + paddle.y,
        paddle.width,
        paddle.height);
    }
    ctx.beginPath();
    ctx.arc(x + this.ball.x, y + this.ball.y, this.ball.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  this.resetBall(0);
}