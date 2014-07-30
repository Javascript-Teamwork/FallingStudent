var canvas = document.createElement('canvas');
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var spd = 20;
var tick = 0, ticks = 0, dY = 2;
dX = 5;
var basketPos; //horizontal position of basket
var startLives = 6;
var catchedAudio = new Audio('sounds/flyby.mp3');
var droppedAudio = new Audio('sounds/smashing.mp3');

//sound button
var sound = true;
var soundLabel = 'sound/on';

var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

window.onload = function () {
    document.body.appendChild(canvas);
    init();
    animate(frameChange);
};


function init() {
    dX = 5;
    dY = 2;
    tick = 0;
    ticks = 0;
    basketPos = 350;
//    appleX = rnd.nextInt(700) + 30;
//    appleY = rnd.nextInt(100) + 0;
    spd = 20;
    startLives = 6;
}

// main loop
var frameChange = function () {
    if (!waitingInput) {
        fallingMan.move();
        basket.move();
        renderField();
    } else {
        for (var key in keysPressed) {
            if (key != '') {
                waitingInput = false;
                if (gameover) {
                    gameInfo = new GameInfo(startLives);
                    gameover = false;
                }
            }
        }
    }
    animate(frameChange);
};

// creating objects

var fallingMan = new entity(200, 100, 54, 50);
var basket = new safety(basketPos, 400, 200, 80);
var gameInfo = new GameInfo(startLives);
var keysPressed = {};
var waitingInput = false;
var gameover = false;

// drawing all the stuff
var imgBack = new Image();
imgBack.src = "images/backImg.png";
var renderField = function () {
    context.drawImage(imgBack, 0, 0, width, height);
    fallingMan.render();
    basket.render();
    gameInfo.render();
};
// safety "class"
function safety(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}


var safetyImg = new Image();
safetyImg.src = "images/tramplin.png";
safety.prototype.render = function () {
    context.drawImage(safetyImg, basketPos, 520, this.width, this.height);
};
safety.prototype.move = function () {
    for (var key in keysPressed) {
        // left arrow
        if (key == '37') {
            basketPos -= dX;
            if (basketPos < 0) {
                basketPos = 0;
            }
        }
        // right arrow
        else if (key == '39') {
            basketPos += dX;
            if (basketPos > width - this.width) {
                basketPos = width - this.width;
            }
        }
    }
};
// ------------------------------


// entity "class"
function entity(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
var man = new Image();
man.src = "images/falling.png";
entity.prototype.render = function () {
    context.drawImage(man, this.x, this.y, this.width, this.height);
};


entity.prototype.move = function () {
    tick++;
    ticks++;
    if (this.y < height - 100)
        this.y += dY;
    else {
        if (this.x > basketPos && this.x < basketPos + basket.width - 50) {
            gameInfo.saved++;
            if(sound){

                catchedAudio.play()
            };
//            music("flyby.wav");
        } else {
            loseLive();
            if(sound){
                droppedAudio.play()
            }
//            music("smashing.wav");
        }
        dY = 2;
        this.x = Math.random() * 700 + 50;
        this.y = Math.random() * 100 + 0;
    }
    if (tick >= spd) {
        tick = 0;
        dY++;
    }
    if (ticks % 250 == 0 && spd > 1) {
        if (dX < 0)
            dX -= 1;
        else
            dX += 1;
        spd--;
    }
};

// gameinfo "class"
function GameInfo(lives) {
    this.saved = 0;
    this.lives = lives;
}
GameInfo.prototype.render = function () {
    context.fillStyle = 'red';
    context.font = '22px Tahoma';
    context.fillText('Saved: ' + this.saved, 20, 30);
    context.fillText('Lives left: ' + this.lives, 20, 60);

    context.fillText(soundLabel, width - 100, 20);

    if (waitingInput) {
        context.font = '30px Tahoma';
        if (gameover) {
            init();
            context.fillText('Game Over. Press any key to play again.', 200, 50);
        } else {
            context.fillText('You Lost a Life. Press any key to continue.', 200, 50);
        }
    }
};
function loseLive() {
    gameInfo.lives--;
    if (gameInfo.lives <= 0) {
        gameover = true;
        waitingInput = true;
    }
//    waitingInput = true;
}

// key listeners
window.addEventListener('keydown', function (event) {
    keysPressed[event.keyCode] = true;
});
window.addEventListener('keyup', function (event) {
    delete keysPressed[event.keyCode];
});

//exit button event catch
window.addEventListener('click',function(event){

    var mouse_X_Coordinates = event.clientX;
    var mouse_Y_Coordinates = event.clientY;

    var correctCor_X_Start = 707;
    var correctCor_X_end = 800;
    var correctCor_Y_Start = 12;
    var correctCor_Y_end = 30;

    //check for correct coordinates
    if(mouse_X_Coordinates >= correctCor_X_Start
        && mouse_X_Coordinates <= correctCor_X_end
        && mouse_Y_Coordinates >= correctCor_Y_Start
        && mouse_Y_Coordinates <= correctCor_Y_end) {

        sound ? soundLabel = 'sound/off' : soundLabel = 'sound/on';
        sound ? sound = false : sound = true;
    }
});