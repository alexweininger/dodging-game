/* Background pattern from Subtle Patterns */
let isGameRunning = false;

var canvasWidth = 680;
var canvasHeight = 680;

var canvasPad = 10;

var canvas = document.getElementById("myCanvas");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var ctx = canvas.getContext("2d");

//ball constants
var ballRadius = 25; // radius

var x = (canvas.width / 2); // initial position x
var y = (canvas.height / 2); // initial position y

var gridX = 3; //  initial grid position x
var gridY = 3; // initial grid position y

var gridSize = 5; // gridSize (width and height) how many spaces

var tileSize = ((canvas.width - (canvasPad / 2)) / gridSize); // var that calculates the tile size based on the canvas and the pad

// key and movement vars
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var obsSize = 30;

let score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {

    if (e.keyCode == 39) {

        rightPressed = true;

    } else if (e.keyCode == 37) {

        leftPressed = true;

    } else if (e.keyCode == 40) {

        downPressed = true;

    } else if (e.keyCode == 38) {

        upPressed = true;

    }

}
function keyUpHandler(e) {

    if (e.keyCode == 39) {

        rightPressed = false;

    } else if (e.keyCode == 37) {

        leftPressed = false;

    } else if (e.keyCode == 40) {

        downPressed = false;

    } else if (e.keyCode == 38) {

        upPressed = false;

    }

}

// movement functions
function moveRight() { // right

    if (gridX != gridSize) {

        x += tileSize;

        gridX += 1;

        rightPressed = false;

    }
}

function moveLeft() { // left

    if (gridX != 1) {

        x -= tileSize;

        gridX -= 1;

        leftPressed = false;
    }
}

function moveDown() { // down
    if (gridY != gridSize) {
        y += tileSize;
        gridY += 1;
        downPressed = false;
    }
}

function moveUp() { // up
    if (gridY != 1) {
        y -= tileSize;
        gridY -= 1;
        upPressed = false;
    }
}

// initializing the playing area (canvas)

// function to draw the checkerd background on the canvas
function drawCheckeredBackground(can, nRow, nCol) {

    var w = canvasWidth - (canvasPad);
    var h = canvasHeight - (canvasPad);

    nRow = nRow || 8; // default number of rows
    nCol = nCol || 8; // default number of columns

    w /= nCol; // width of a block
    h /= nRow; // height of a block
    ctx.beginPath();
    ctx.fillStyle = "#eee";
    for (var i = 0; i < nRow; ++i) {

        for (var j = 0, col = nCol / 2; j < col; ++j) {

            ctx.rect((2 * j * w + (i % 2 ? 0 : w)) + (canvasPad / 2), (i * h) + (canvasPad / 2), w, h);
        }
    }
    ctx.fill();
    ctx.closePath();
}

// drawing the ball
function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "pink";
    ctx.fill();
    ctx.closePath();
}

// drawing the pad
function drawPad() {
    ctx.beginPath();
    ctx.fillStyle = "#a6a6a6";
    ctx.rect(0, 0, canvasPad / 2, canvas.height); // left
    ctx.rect(0, canvas.height - canvasPad / 2, canvas.width, canvasPad / 2); // bottom
    ctx.rect(canvas.width - (canvasPad / 2), 0, (canvasPad / 2), canvas.height); // right
    ctx.rect(0, 0, canvas.width, (canvasPad / 2)); // top
    ctx.fill();
    ctx.closePath();
    //console.log("drawPad");
}

var warningSize = (canvas.width - canvasPad) / gridSize;

var pads = gridSize * 4;

function drawLocator(pad) {

    var x = pad / gridSize;

    var padSide;
    var padLoc;

    if (x <= 1) {

        padSide = 1;
        padLoc = pad;

    } else if (x <= 2) {

        padSide = 2;
        padLoc = pad - gridSize;

    } else if (x <= 3) {

        padSide = 3;
        padLoc = pad - (gridSize * 2);

    } else if (x <= 4) {

        padSide = 4;
        padLoc = pad - (gridSize * 3);

    }

    var padX, padY, w, h;

    if (padSide == 1) {

        padY = 0;

        padX = canvasPad / 2 + (warningSize * (padLoc - 1));

        w = warningSize;

        h = canvasPad / 2;

    }

    if (padSide == 2) {

        padX = canvas.width - canvasPad / 2;

        padY = canvasPad / 2 + (warningSize * (padLoc - 1));

        w = canvasPad / 2;

        h = warningSize;

    }

    if (padSide == 3) {
        padY = canvas.height - canvasPad / 2;
        padX = canvasPad / 2 + (warningSize * (padLoc - 1));
        w = warningSize;
        h = canvasPad / 2;

    }

    if (padSide == 4) {
        padX = 0;
        padY = canvasPad / 2 + (warningSize * (padLoc - 1));
        w = canvasPad / 2;
        h = warningSize;
    }

    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.rect(padX, padY, w, h);
    ctx.fill();
    ctx.closePath();
}

function paddingLoc(pad) {
    var x = pad / gridSize;

    var padSide;
    var padLoc;

    if (x <= 1) {
        padSide = 1;
        padLoc = pad;

    } else if (x <= 2) {
        padSide = 2;
        padLoc = pad - gridSize;

    } else if (x <= 3) {
        padSide = 3;
        padLoc = pad - (gridSize * 2);

    } else if (x <= 4) {
        padSide = 4;
        padLoc = pad - (gridSize * 3);

    }
    var loc = [padSide, padLoc];

    return loc;
}

function Warning(pad, time) {
    this.pad = pad;
    this.time = time;
}


var warnings = [];

function addWarning(pad, time) {
    var n = warnings.length;
    warnings[n] = new Warning();
    warnings[n].pad = pad;
    warnings[n].time = time;
}

function drawWarning(pad, time) {
    var x = pad / gridSize;

    var padSide;
    var padLoc;

    if (x <= 1) {
        padSide = 1;
        padLoc = pad;

    } else if (x <= 2) {
        padSide = 2;
        padLoc = pad - gridSize;

    } else if (x <= 3) {
        padSide = 3;
        padLoc = pad - (gridSize * 2);

    } else if (x <= 4) {
        padSide = 4;
        padLoc = pad - (gridSize * 3);

    }

    var padX, padY, w, h;

    if (padSide == 1) {
        padY = 0;
        padX = canvasPad / 2 + (warningSize * (padLoc - 1));
        w = warningSize;
        h = canvasPad / 2;

    }

    if (padSide == 2) {
        padX = canvas.width - canvasPad / 2;
        padY = canvasPad / 2 + (warningSize * (padLoc - 1));
        w = canvasPad / 2;
        h = warningSize;

    }

    if (padSide == 3) {
        padY = canvas.height - canvasPad / 2;
        padX = canvasPad / 2 + (warningSize * (padLoc - 1));
        w = warningSize;
        h = canvasPad / 2;

    }

    if (padSide == 4) {
        padX = 0;
        padY = canvasPad / 2 + (warningSize * (padLoc - 1));
        w = canvasPad / 2;
        h = warningSize;
    }

    ctx.beginPath();
    ctx.fillStyle = "#e56d67";
    ctx.rect(padX, padY, w, h);
    ctx.fill();
    ctx.closePath();
}

// function drawWarningPad() {
//     ctx.benginPath();
//     ctx.rect(x, y, w, h);
//     ctx.fillStyle = "red";
//     ctx.fill();
//     ctx.closePath();
// }


function checkWall() {
    if (gridX == gridSize || gridX == 1) {
        return true;
    } else if (gridY == gridSize || gridY == 1) {
        return true;
    } else {
        return false;
    }
}

// obstacle Object function
function Obstacle(x, y, vX, vY) {
    this.x = x;
    this.y = y;
    this.vX = vX;
    this.vY = vY;
}

var obs = []; // array of obstacles

function addObstacle(x, y, vX, vY) {
    var n = obs.length;
    obs[n] = new Obstacle();
    obs[n].x = x;
    obs[n].y = y;
    obs[n].vX = vX;
    obs[n].vY = vY;
    console.log("added a new obstacle:" + n)
}


function newObs(location, velocity) {
    var l = location;

    var loc = paddingLoc(l);
    var side = loc[0];
    var pad = loc[1];

    var x, y, w, h;
    var vX = velocity;
    var vY = velocity;

    if (side == 1) {
        y = 0;
        x = ((tileSize / 2) + ((pad - 1) * tileSize)) - obsSize / 2;

        vX = 0;
        vY = vY;

    } else if (side == 2) {
        y = ((tileSize / 2) + ((pad - 1) * tileSize)) - obsSize / 2;
        x = canvas.width - canvasPad;

        vX = vX * -1;
        vY = 0;
    } else if (side == 3) {
        y = canvas.height - canvasPad;
        x = (canvas.width - ((tileSize / 2) + ((pad - 1) * tileSize))) - obsSize / 2;

        vX = 0;
        vY = vY * -1;

    } else if (side == 4) {
        x = 0;
        y = ((tileSize / 2) + ((pad - 1) * tileSize)) - obsSize / 2;

        vX = vX;
        vY = 0;
    }

    addObstacle(x, y, vX, vY);
}

function drawObs() {
    for (i = 0; i < obs.length; i++) {
        ctx.beginPath();
        ctx.rect(obs[i].x, obs[i].y, obsSize, obsSize);
        ctx.fillStyle = "#e56d67";
        ctx.fill();
        ctx.closePath();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let lives = 3;

var bx, by;
function collisionCheck() {
    for (i = 0; i < obs.length; i++) {
        bx = obs[i].x;
        by = obs[i].y;
        if (x > bx - 10 && x < bx + 20 && y > by - 10 && y < by + 20) {
            obs.splice(i, 1);
            console.log("Player was hit by and obstacle!")
            lives -= 1;
            updateLives();
        }
    }
}

let gameDifficulty = 1;
let isGameOver = false;

function updateLives() {
    document.getElementById("lives-display").innerHTML = "Lives: " + lives + "     Score: " + score;
    if (lives <= 0) {
        isGameOver = true;
    }

    if(score > 10){
        gameDifficulty = 2;
    }
}

var ran;

function randomNumber() {
    return Math.floor(Math.random() * 25) + 1;
}

function startGame() {
    isGameRunning = true;
    console.log("Start game");
    document.getElementById("myCanvas").style = "border: 2px solid #eee";
    document.getElementById("startButton").style = "display: none;"
    resetVariables();
    updateLives();
    draw();
}

do {
    var timeInterval = 1000;
    window.setInterval(function () {
        if (isGameRunning) {
            ran = randomNumber();
            if (warnings.length > 0) {
                for (i = 0; i < warnings.length; i++) {
                    if (ran != warnings[i].pad) {
                        addWarning(ran, 100);
                        console.log("add warning" + ran);
                    }
                }
            } else {
                addWarning(ran, 100);
                console.log("add warning" + ran);
            }
        }
    }, timeInterval);
} while (isGameRunning);
function resetVariables() {
    lives = 3;
    isGameOver = false;
    gridX = 3;
    gridY = 3;
    x = (canvas.width / 2); // initial position x
    y = (canvas.height / 2); // initial position y
    obs = [];
    warnings = [];

}

function gameOver() {
    isGameRunning = false;
    console.log("Game over.")
    document.getElementById("startButton").style = "display: unset";

}

function draw() { // draw function

    clearCanvas(); // clearing the canvas

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    drawCheckeredBackground(myCanvas, gridSize, gridSize); // drawing the checkered background

    // movement functions
    if (rightPressed) {
        moveRight();
    }
    if (leftPressed) {
        moveLeft();
    }
    if (downPressed) {
        moveDown();
    }
    if (upPressed) {
        moveUp();
    }
    drawPad(); // draw the pad after the locators


    drawLocator(gridX);
    drawLocator(gridX + (gridSize * 2));
    drawLocator(gridY + (gridSize));
    drawLocator(gridY + (gridSize * 3));

    collisionCheck();

    for (i = 0; i < warnings.length; i++) {
        drawWarning(warnings[i].pad, warnings[i].time);
        warnings[i].time -= 1;
        if (warnings[i].time == 0) {

            newObs(warnings[i].pad, 10);
            warnings.splice(i, 1);
        }
    }

    // for-loop that runs through all obstacles and updates thier positions based on their velocities
    for (i = 0; i < obs.length; i++) {
        obs[i].x += obs[i].vX;
        obs[i].y += obs[i].vY;
        //console.log(obs[i])

        // if statement to remove obstacles once they go off the canvas
        if (obs[i].x < -100) {
            obs.splice(i, 1);
            score += 1;
            //console.log("removed obs");
        } else if (obs[i].x > canvas.width + 100) {
            obs.splice(i, 1);
            score += 1;
            //console.log("removed obs");
        } else if (obs[i].y < -100) {
            obs.splice(i, 1);
            score += 1;
            //console.log("removed obs");
        } else if (obs[i].y > canvas.width + 100) {
            obs.splice(i, 1);
            score += 1;
            //console.log("removed obs");
        }

    }
    drawBall(); // draw the ball
    drawObs(); // draw the obstacles
    collisionCheck();
    updateLives();
    if (isGameOver == false) {
        requestAnimationFrame(draw);
    } else {
        gameOver();
    }
}

