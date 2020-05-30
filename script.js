var player1 = document.getElementById("player1");
var ball = document.getElementById("ball");
var player2 = document.getElementById("player2");

const player1Name = "Player1";
const player2Name = "Player2";

let rod,
  maxscore,
  movement,
  ballSpeedY = 2,
  ballSPeedX = 2;

let gameOn = false;

let windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

function resetBoard(playername) {
  player1.style.left = (window.innerWidth - player1.offsetWidth) / 2 + "px";
  player2.style.left = (window.innerWidth - player2.offsetWidth) / 2 + "px";
  ball.style.left = (windowWidth - ball.offsetWidth) / 2 + "px";

  //loosing player gets the ball
  if (playername === player1Name) {
    ball.style.top = player1.offsetTop + player1.offsetHeight + "px";
    ballSpeedY = 2;
  } else if (playername === player2Name) {
    ball.style.top = player2.offsetTop - player2.offsetHeight + "px";
    ballSpeedY = -2;
  }
  score = 0;
  gameOn = false;
}

window.addEventListener("keypress", function () {
  let rodSpeed = 20;
  let rodRect = player1.getBoundingClientRect();

  if (
    this.event.code === "KeyD" &&
    rodRect.x + rodRect.width < this.window.innerWidth
  ) {
    player1.style.left = rodRect.x + rodSpeed + "px";
    player2.style.left = player1.style.left;
  } else if (this.event.code === "KeyA" && rodRect.x > 0) {
    player1.style.left = rodRect.x - rodSpeed + "px";
    player2.style.left = player1.style.left;
  }
  if (this.event.code === "Enter") {
    if (!gameOn) {
      gameOn = true;
      let ballRect = ball.getBoundingClientRect();
      let ballX = ballRect.x;
      let ballY = ballRect.y;
      let ballDia = ballRect.width;

      let player1Height = player1.offsetHeight;
      let player2Height = player2.offsetHeight;
      let player1Width = player1.offsetWidth;
      let player2Width = player2.offsetWidth;

      movement = this.setInterval(function () {
        ballX += ballSPeedX;
        ballY += ballSpeedY;

        player1X = player1.getBoundingClientRect().x;
        player2X = player2.getBoundingClientRect().x;

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";
        if (ballX + ballDia > windowWidth || ballX < 0) {
          ballSPeedX = -ballSPeedX;
        }

        let balllPos = ballX + ballDia / 2;
        if (ballY <= player1Height) {
          ballSpeedY = -ballSpeedY;
        } else if (ballY + ballDia >= windowHeight - player2Height) {
          ballSpeedY = -ballSpeedY;
        }
      }, 10);
    }
  }
});
