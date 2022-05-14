
//Constants
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//Changing Varibles
let numOfBalls = 25
let trailsRandom = false
let trailsLong = false
let trailsShort = true
let strobe = false
let ballSizeBig = false
let ballSizeSmall = true
let hmmm = false
let ballColor = randomRGB()
let randomBallColor = false


//Random Ball Color
function newBallColor(){
    ballColor = randomRGB()
}

//Event Listeners - Trails
document.querySelector('.longTrails').addEventListener("click", () => {
    if(hmmm === true){
        hmmm = false;
        newBallColor();
    }
    trailsLong = true; trailsShort = false; trailsRandom = false;
    lastClicked('Long Trails')
});

document.querySelector('.shortTrails').addEventListener("click", () => {
    if(hmmm === true){
        hmmm = false;
        newBallColor();
    }
    trailsLong = false; trailsShort = true; trailsRandom = false; hmmm = false;
    lastClicked('Short Trails')
});

document.querySelector('.randomTrails').addEventListener("click", () => {
    if(hmmm === true){
        hmmm = false;
        newBallColor();
    }
    trailsLong = false; trailsShort = false; trailsRandom = true; hmmm = false;
    lastClicked('Random Trials')
});

//Event Listener - Strobe
document.querySelector('.strobe').addEventListener("click", () => {
    strobe = !strobe;  hmmm = false;
    lastClicked('Strobe')
});

//Event Listeners - Balls
document.querySelector('.bigBalls').addEventListener("click", () => {
    ballSizeBig = true; ballSizeSmall = false;
    balls = []
    makeBalls()
    lastClicked('Big Balls')
});

document.querySelector('.smallBalls').addEventListener("click", () => {
    ballSizeBig = false; ballSizeSmall = true;
    balls = []
    makeBalls()
    lastClicked('Small Balls')
});

document.querySelector('.lotsOfBalls').addEventListener("click", () => {
    numOfBalls = random(50, 100)
    balls = []
    makeBalls()
    lastClicked('Lots of Balls')
});

document.querySelector('.lessBalls').addEventListener("click", () => {
    numOfBalls = random(3, 10)
    balls = []
    makeBalls()
    lastClicked('Less Balls')
});

//Event Listeners - Ball Color
document.querySelector('.newBallColor').addEventListener("click", () => {
    randomBallColor = false; hmmm = false;
    newBallColor();
    lastClicked('New Ball Color')
});

document.querySelector('.randomBallColors').addEventListener("click", () => {
    randomBallColor = true; hmmm = false;
    lastClicked('Altering Ball Colors')
});

document.querySelector('.hmmm').addEventListener("click", () => {
    randomBallColor = false; hmmm = true;
    lastClicked('Hmmm')
});






//Change last clicked notification
function lastClicked(whatWasClicked){
    document.querySelector('.clickNotification').innerHTML = `${whatWasClicked} was Lasted Clicked`
}

//Random number between min and max
function random(min, max){
    return Math.floor(Math.random() *  (max - min + 1)) + min;
}

//Random RGB value generater
function randomRGB(){
    return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`
}

//Our Ball class
class Ball {
    constructor(x, y, velX, velY, color, size){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw(){
        ctx.beginPath();
        //if hmm is true, makes the balls erm ... blue
        if(hmmm === true){
            ctx.fillStyle = `rgb(6, 105, 138)`;
        }
        else if(randomBallColor === true){
            ctx.fillStyle = randomRGB();
        }
        else{
            ctx.fillStyle = ballColor
        }
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(){
        if((this.x + this.size) >= width){
            this.velX = -(this.velX)
        }
        if((this.x - this.size) <= 0){
            this.velX = -(this.velX)
        }
        if((this.y + this.size) >= height){
            this.velY = -(this.velY)
        }
        if((this.x - this.size) <= 0){
            this.velY = -(this.velY)
        }

        this.x += this.velX;
        this.y += this.velY;
    }


}

let balls = [];

//Creates our balls
function makeBalls(){
    while (balls.length < numOfBalls) {
        let size
        if(ballSizeBig === true){
            size = random(30,80);
        }
        else{
            size = random(10,20);
        }
        const ball = new Ball(
          // ball position always drawn at least one ball width
          // away from the edge of the canvas, to avoid drawing errors
          random(0 + size,width - size),
          random(0 + size,height - size),
          random(-7,7),
          random(-7,7),
          randomRGB(),
          size
       );
    
      balls.push(ball);
    }
}


// Animates our balls via loop
function loop() {
    if(hmmm === true){
        ctx.fillStyle = `rgba(0, 0, 0, .5)`
    }
    else if(trailsRandom === true && strobe === true){
        ctx.fillStyle = `rgba(${random(0,60)}, ${random(0,90)}, ${random(0,110)}, ${random(0.001, 0.02)})`
    }
    else if(trailsLong === true && strobe === true){
        ctx.fillStyle = `rgba(${random(0,250)}, ${random(0,250)}, ${random(0,100)}, .03)`
    }
    else if(trailsShort === true && strobe === true){
        ctx.fillStyle = `rgba(${random(0,60)}, ${random(0,90)}, ${random(0,110)}, .5)`
    }
    else if(trailsRandom === true){
        ctx.fillStyle = `rgba(0, 0, 0, ${random(0.001, 0.02)})`
    }
    else if(trailsLong === true){
        ctx.fillStyle = `rgba(0, 0, 0, .01)`
    }
    else if(trailsShort === true){
        ctx.fillStyle = `rgba(0, 0, 0, .5)`
    }
    // ctx.fillStyle = `rgba(0, 0, 0, .1)`
    ctx.fillRect(0, 0, width, height);
 
    for (const ball of balls) {
      ball.draw();
      ball.update();
    }
 
    requestAnimationFrame(loop);
 }

//Warns User of Flash/Strobe Lights
if(confirm('WARNING Flashing/Strobe Lights')){
     //Makes our first balls and initiates our loop
    makeBalls()
    loop();
}
else{
     close()
}


