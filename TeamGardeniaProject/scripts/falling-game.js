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
var fallenCount = 0; //counter for passed entities
var nakovOn = false; //toggle between entities
var nakovOccurrence = Math.floor(Math.random()*10)+5;

//sound button
var sound = true;
var soundLabel = 'sound/on';

var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

//start the game
window.onload = function () {
    document.body.insertBefore(canvas,document.body.childNodes[2]);
    init();
    animate(frameChange);
}


function init() {
    dX = 5;
    dY = 2;
    tick = 0;
    ticks = 0;
    basketPos = 350;
    spd = 20;
    startLives = 6;
    fallenCount = 0
    nakovOn = false;
    nakovOccurrence = Math.floor(Math.random()*10)+5;
}

// main loop
var frameChange = function () {
    if (!waitingInput) {
        if (nakovOn) {
            fallingNakov.move();
        } else {
            fallingMan.move();
        }
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
}

// creating objects
var man = new Image();
man.src = "images/fallingStudent.png";
var nak = new Image();
nak.src = "images/Nakov Head.png";
var fallingMan = new Entity(man, 200, 60, 54, 86, dY);
var fallingNakov = new Entity(nak, 400, 80, 60, 90, dY);

var SafetyImg = new Image();
SafetyImg.src = "images/tramplin.png";

var basket = new Safety(basketPos, 400, 200, 80);
var gameInfo = new GameInfo(startLives);
var keysPressed = {};
var waitingInput = false;
var gameover = false;

// drawing all the stuff
var imgBack = new Image();
imgBack.src = "images/softUni.png";
var renderField = function () {
    context.drawImage(imgBack, 0, 0, width, height);
    if (nakovOn) {
        fallingNakov.render();
    } else {
        fallingMan.render();
    }
    basket.render();
    gameInfo.render();
}
// Safety "class"
function Safety(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Safety.prototype.render = function () {
    context.drawImage(SafetyImg, basketPos, 520, this.width, this.height);
}
Safety.prototype.move = function () {
    for (var key in keysPressed) {
        // left arrow
        if (key == '37') {
            basketPos -= dX;
            if (basketPos < -20) {
                basketPos = -20;
            }
        }
        // right arrow
        else if (key == '39') {
            basketPos += dX;
            if (basketPos > width - this.width+20) {
                basketPos = width - this.width+20;
            }
        }
    }
}
// ------------------------------


// Entity "class"
function Entity(img, x, y, width, height, dY) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dY = dY;
}

Entity.prototype.render = function () {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
}


Entity.prototype.move = function () {
    tick++;
    ticks++;
    if (this.y < height - 100)
        this.y += this.dY;
    else {
        if (this.x > basketPos && this.x < basketPos + basket.width - 50) {
            if (nakovOn) gameInfo.lives++;
            else gameInfo.saved++;
            if(sound){
                catchedAudio.play()
            }

        } else {
            loseLive();
            if(sound){
                droppedAudio.play()
            }
        }
        this.dY = 2;
        this.x = 10+Math.random() * (width - 50);
        this.y = Math.random() * 30 + 0;

        fallenCount++;
        if (nakovOn) {
            fallenCount = 1;
            nakovOn = false;
        }
        if (fallenCount % nakovOccurrence == 0) {
            fallenCount=0;
            nakovOn = true;
            nakovOccurrence = Math.floor(Math.random()*10)+5;
        }
    }
    //speed up with time
    if (tick >= spd) {
        tick = 0;
        this.dY++;
    }
    if (ticks % 250 == 0 && spd > 1) {
        if (dX < 0)
            dX -= 1;
        else
            dX += 1;
        spd--;
    }
}

// gameinfo "class"
function GameInfo(lives) {
    this.saved = 0;
    this.lives = lives;
}
GameInfo.prototype.render = function () {
    context.fillStyle = 'orange';
    context.font = '22px Tahoma';
    context.fillText('Saved: ' + this.saved, 20, 30);
    context.fillText('Lives left: ' + this.lives, 20, 60);
    context.fillText(soundLabel, width - 100, 20);

    if (waitingInput) {
        context.font = '30px Tahoma';
        if (gameover) {
            init();
            context.fillText('Game Over. Press any key to play again.', 150, 300);
        } else {
            context.fillText('You Lost a Life. Press any key to continue.', 200, 50);
        }
    }
}
function loseLive() {
    gameInfo.lives--;
    if (gameInfo.lives <= 0) {
        gameover = true;
        waitingInput = true;
    }
}

// key listeners
window.addEventListener('keydown', function (event) {
    keysPressed[event.keyCode] = true;
});
window.addEventListener('keyup', function (event) {
    delete keysPressed[event.keyCode];
});

//click event to toggle sound
canvas.addEventListener('click',function(event){
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left ;
    var mouseY = event.clientY - rect.top ;
    //check for correct coordinates
    if(mouseX >= width-100 && mouseX <= width && mouseY >= 0 && mouseY <= 30) {
        sound ? soundLabel = 'sound/off' : soundLabel = 'sound/on';
        sound ? sound = false : sound = true;
    }
});




