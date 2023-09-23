const container = document.querySelector(".container");
const upper = document.querySelector(".upper");
const ball = document.querySelector(".ball");
const lower = document.querySelector(".lower");

//* position of ball and wall

let ballTop = ball.offsetTop;
let ballLeft = ball.offsetLeft;

const ballStartLeft = ballLeft;
const ballAtLower = lower.offsetTop - ball.offsetHeight;
const ballAtUpper = upper.offsetHeight;
ball.style.top = ballTop + "px";
ball.style.left = ballLeft + "px";

const padLeft = upper.offsetLeft;

const leftVal = lower.offsetLeft - ball.offsetWidth + 1;
const rightVal = lower.offsetLeft + lower.offsetWidth + ball.offsetWidth - 1;

upper.style.left = upper.offsetLeft + "px";
lower.style.left = lower.offsetLeft + "px";

//*Move the ball function
let touchedPad = true;
let movementUp = true;
let startDown = true;
let movementRight = true;

//>>>>>>>> score of the individual
let playerScore = 0;

//> reload the game on changing the browser size

window.addEventListener("resize", () => {
    window.location.reload();
});

//*start of the new game
function startPosition() {
    if (startDown) {
        ballTop = ballAtLower - 5;
        ballLeft = ballStartLeft;
        lower.style.left = padLeft + "px";
        upper.style.left = padLeft + "px";
    } else {
        ballTop = upper.offsetHeight - 5;
        ballLeft = ballStartLeft;
        lower.style.left = padLeft + "px";
        upper.style.left = padLeft + "px";
        movementUp = false;
    }
}

function touchedThePad() {
    const leftVal = lower.offsetLeft - ball.offsetWidth + 1;
    const rightVal =
        lower.offsetLeft + lower.offsetWidth + ball.offsetWidth - 1;

    if (leftVal <= ballLeft && ballLeft <= rightVal) {
        touchedPad = true;
    } else {
        startPosition();
        touchedPad = false;
    }
}

function changedMovement() {
    if (ballTop >= ballAtLower && touchedPad) {
        movementUp = true;
        playerScore += 1;
        score.textContent = playerScore;
    } else if (ballTop < ballAtUpper && touchedPad) {
        movementUp = false;
        playerScore += 1;
        score.textContent = playerScore;
    }
}

function endGame() {
    if (!touchedPad) {
        clearInterval(play);
        if (parseInt(ball.style.top.slice(0, -2)) < 50) {
            startDown = false;
        } else {
            startDown = true;
        }
        localStorageHighScore();
        startPosition();
    }
    end.style.zIndex = 5;
    end.style.visibility = "visible";
    endMenu();
    localStorageHighScore();
    highScoreVal.textContent = localStorage.getItem("highScore");
    playerScore = 0;
}

function moveTheBall() {
    if (movementUp && movementRight) {
        if (
            ball.offsetLeft + ball.offsetWidth >
            container.offsetWidth - 8 - 5
        ) {
            ballTop -= 5;
            ballLeft +=
                container.offsetWidth - 8 - ball.offsetLeft - ball.offsetWidth;
            ball.style.top = ballTop + "px";
            ball.style.left = ballLeft + "px";
            movementRight = false;
        } else {
            ballTop -= 5;
            ballLeft += 5;
            ball.style.top = ballTop + "px";
            ball.style.left = ballLeft + "px";
        }
    } else if (movementUp && !movementRight) {
        if (ball.offsetLeft < 5) {
            ballTop -= 5;
            ballLeft -= ball.offsetLeft;

            ball.style.top = ballTop + "px";
            ball.style.left = ballLeft + "px";
            movementRight = true;
        } else {
            ballTop -= 5;
            ballLeft -= 5;
            ball.style.top = ballTop + "px";
            ball.style.left = ballLeft + "px";
        }
    } else if (!movementUp && movementRight) {
        if (
            ball.offsetLeft + ball.offsetWidth >
            container.offsetWidth - 8 - 5
        ) {
            ballTop += 5;
            ballLeft +=
                container.offsetWidth - 8 - ball.offsetLeft - ball.offsetWidth;
            ball.style.top = ballTop + "px";
            ball.style.left = ballLeft + "px";
            movementRight = false;
        } else {
            ballTop += 5;
            ballLeft += 5;
            ball.style.top = ballTop + "px";
            ball.style.left = ballLeft + "px";
        }
    } else if (!movementUp && !movementRight) {
        if (ball.offsetLeft < 5) {
            ballTop += 5;
            ballLeft -= ball.offsetLeft;

            ball.style.top = ballTop + "px";
            ball.style.left = ballLeft + "px";
            movementRight = true;
        } else {
            ballTop += 5;
            ballLeft -= 5;
            ball.style.top = ballTop + "px";
            ball.style.left = ballLeft + "px";
        }
    }
}

// sensitivity of the moevemtn of pad movement

let sensitivity = 50;

function leftRightMovement() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            if (upper.offsetLeft > 0) {
                if (upper.offsetLeft < sensitivity) {
                    let leftdist = upper.offsetLeft;
                    upper.style.left =
                        parseInt(upper.style.left.slice(0, -2)) -
                        leftdist +
                        "px";
                    lower.style.left =
                        parseInt(lower.style.left.slice(0, -2)) -
                        leftdist +
                        "px";
                } else {
                    upper.style.left =
                        parseInt(upper.style.left.slice(0, -2)) -
                        sensitivity +
                        "px";
                    lower.style.left =
                        parseInt(lower.style.left.slice(0, -2)) -
                        sensitivity +
                        "px";
                }
            }
        } else if (e.key === "ArrowRight") {
            if (
                upper.offsetLeft + upper.offsetWidth <
                container.offsetWidth - 8
            ) {
                if (
                    upper.offsetLeft + upper.offsetWidth >
                    container.offsetWidth - 8 - sensitivity
                ) {
                    let rightdist =
                        container.offsetWidth -
                        8 -
                        upper.offsetLeft -
                        upper.offsetWidth;
                    upper.style.left =
                        parseInt(upper.style.left.slice(0, -2)) +
                        rightdist +
                        "px";
                    lower.style.left =
                        parseInt(lower.style.left.slice(0, -2)) +
                        rightdist +
                        "px";
                } else {
                    upper.style.left =
                        parseInt(upper.style.left.slice(0, -2)) +
                        sensitivity +
                        "px";
                    lower.style.left =
                        parseInt(lower.style.left.slice(0, -2)) +
                        sensitivity +
                        "px";
                }
            }
        }
    });
}

function playGame() {
    //*start position
    //* if ball touched the  any of the pad or not

    if (
        ball.offsetTop <= upper.offsetHeight ||
        ball.offsetTop >= lower.offsetTop - ball.offsetHeight
    ) {
        touchedThePad();
    }

    //* if ball is at lower or upper position
    if (touchedPad) {
        changedMovement();
    } else {
        endGame();
    }
    //* move the ball
    moveTheBall();
}

/////////////////////////////////////////////////////////////////////////////////////////////
//>take the player name and take the high score form local storage

const start = document.querySelector(".start");
const input = document.querySelector(".input");
const button = document.querySelector(".button");
const player = document.querySelector(".player");
const score = document.querySelector(".score");
const scoreEnd = document.querySelector(".scoreEnd");
const endButton = document.querySelector(".endbutton");
const end = document.querySelector(".end");
const highScoreVal = document.querySelector(".highScore");

let play;

//> local storage high score

let highScore = localStorage.getItem("highScore");

function localStorageHighScore() {
    if (!highScore) {
        localStorage.setItem("highScore", playerScore);
    } else if (playerScore > highScore) {
        localStorage.setItem("highScore", playerScore);
    }
}

/////////////////////////////////////////////////////////////////
//> optimising the start menu
function startMenu() {
    button.addEventListener("click", () => {
        if (input.value.length > 1) {
            player.textContent =
                input.value.charAt(0).toUpperCase() + input.value.slice(1);
        }

        start.style.zIndex = "-15";
        start.style.visibility = "hidden";
    });
}

//> end menu after the end of game
function endMenu() {
    scoreEnd.textContent = playerScore;
    endButton.addEventListener("click", () => {
        end.style.zIndex = "-10";
        end.style.visibility = "hidden";
    });
}

// enter button to start the game
function enterButton() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            startPosition();
            leftRightMovement();
            play = setInterval(playGame, 50);
        }
    });
}

highScoreVal.textContent = highScore;
startMenu();
enterButton();
