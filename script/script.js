const container = document.querySelector(".container");
const upper = document.querySelector(".upper");
const ball = document.querySelector(".ball");
const lower = document.querySelector(".lower");
const player = document.querySelector(".player");
const score = document.querySelector(".score");

//* position of ball and wall

let ballTop = ball.offsetTop;
let ballLeft = ball.offsetLeft;
const ballAtLower = lower.offsetTop - ball.offsetHeight;
const ballAtUpper = upper.offsetHeight;
ball.style.top = ballTop + "px";
ball.style.left = ballLeft + "px";

const leftVal = lower.offsetLeft - ball.offsetWidth + 1;
const rightVal = lower.offsetLeft + lower.offsetWidth + ball.offsetWidth - 1;

//*Move the ball function
let touchedPad;
let movementUp;

function moveBall() {
    //* if ball touched the  any of the pad or not

    if (leftVal <= ballLeft <= rightVal) {
        touchedPad = true;
    }

    //* if ball is at lower or upper position

    if (ballTop >= ballAtLower && touchedPad) {
        movementUp = true;
    } else if (ballTop <= ballAtUpper && touchedPad) {
        movementUp = false;
    } else if (!touchedPad) {
        console.log("first");
        clearInterval(play);
    }

    //* move the ball
    if (movementUp) {
        ballTop -= 5;
        ball.style.top = ballTop + "px";
    } else if (!movementUp) {
        ballTop += 5;
        ball.style.top = ballTop + "px";
    }
}
const play = setInterval(moveBall, 50);
