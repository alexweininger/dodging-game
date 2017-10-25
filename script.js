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


    for (var i = 0; i < nRow; ++i) {

        for (var j = 0, col = nCol / 2; j < col; ++j) {

            ctx.rect((2 * j * w + (i % 2 ? 0 : w)) + (canvasPad / 2), (i * h) + (canvasPad / 2), w, h);
        }
    }
    ctx.fillStyle = "#eee";
    ctx.fill();
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
    ctx.fillStyle = "#eee";
    ctx.rect(0, 0, canvasPad / 2, canvas.height); // left
    ctx.rect(0, canvas.height - canvasPad / 2, canvas.width, canvasPad / 2); // bottom
    ctx.rect(canvas.width - (canvasPad / 2), 0, (canvasPad / 2), canvas.height); // right
    ctx.rect(0, 0, canvas.width, (canvasPad / 2)); // top
    ctx.closePath();
    // console.log("drawPad");
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

function drawWarning(pad) {

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
    ctx.fillStyle = "red";
    ctx.rect(padX, padY, w, h);
    ctx.fill();
    ctx.closePath();
}

function drawWarningPad() {
    ctx.benginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


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
    obs[obs.length] = new Obstacle();
    obs[n].x = x;
    obs[n].y = y;
    obs[n].vX = vX;
    obs[n].vY = vY;
}

for (i = 0; i < obs.length; i++) {
    if (obs[i].x < -100) {
        obs.splice(i, 1);
    } else if (obs[i].x > canvas.width + 100) {
        obs.splice(i, 1);
    } else if (obs[i].y < -100) {
        obs.splice(i, 1);
    } else if (obs[i].y > canvas.width + 100) {
        obs.splice(i, 1);
    } else {
        console.log(obs[i]);
    }


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
        x = (tileSize / 2) + ((pad - 1) * tileSize);

        vX = 0;
        vY = vY * -1;

    } else if (side == 2) {
        y = (tileSize / 2) + ((pad - 1) * tileSize);
        x = canvas.width - canvasPad;

        vX = vX;
        vY = 0;
    } else if (side == 3) {
        y = canvas.height - canvasPad;
        x = canvas.width - (tileSize / 2) + ((pad - 1) * tileSize);

        vX = vX;
        vY = 0;

    } else if (side == 4) {
        x = 0;
        y = (tileSize / 2) + ((pad - 1) * tileSize);

        vX = vX * -1;
        vY = 0;
    }

    addObstacle(x, y, vX, vY);
}

function drawObs() {
    for (i = 0; i < obs.length; i++) {
        vX = obs[i].vX;
        vY = obs[i].vY;

        ctx.beginPath();
        ctx.rect(obs[i].x, obs[i].y, 20, 20);
        ctx.fillStyle = "#eee";
        ctx.fill();
        ctx.closePath();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var a = false;

function draw() { // draw function

    clearCanvas(); // clearing the canvas
    drawCheckeredBackground(myCanvas, gridSize, gridSize); // drawing the checkered background
    drawBall(); // draw the ball

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

    drawLocator(gridX);
    drawLocator(gridX + (gridSize * 2));
    drawLocator(gridY + (gridSize));
    drawLocator(gridY + (gridSize * 3));

    drawPad();

    newObs(11, 10);
    newObs(13, 10);

    for (i = 0; i < obs.length; i++) {
        var vX, vY;
        for (i = 0; i < obs.length; i++) {
            console.log(obs[i].x);
            console.log(obs[i].y);
            console.log(vX);
            console.log(vY);

            vX = obs[i].vX;
            vY = obs[i].vY;

            obs[i].x = obs[i].x + vX;
            obs[i].y = obs[i].y + vY;
        }
    }

    drawObs();
    requestAnimationFrame(draw);
}
draw();