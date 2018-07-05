//canvas control object
var ctx;
//width and height of canvas
var width, height;
//timer
var timer;
//instance of BotCon
var quad;


//Bot
function Bot(initial_x, initial_y, initial_h){
  //setup image
  this.img = new Image();
  this.img.src = 'bot.png';
  //setup location and heading
  this.location = [initial_x, initial_y];
  this.heading = initial_h;


  //draw bot on grid at location
  this.draw = function(){
    ctx.save();
    ctx.translate(this.location[0], this.location[1]);
    ctx.rotate(this.heading * (Math.PI / 180));
    ctx.drawImage(this.img, -3, -3);
    ctx.restore();
    this.log();
  };

  //to manually move Bot somewhere
  this.moveTo = function(to_x, to_y){
    this.location = [to_x, to_y];
  };

  //translates heading and distance into location
  this.move = function(dis){
    this.location[0] += (dis * Math.sin(this.heading * (Math.PI/180)));
    this.location[1] -= (dis * Math.cos(this.heading * (Math.PI/180)));

  };

  //adjust heading
  this.turn = function(degs){
    this.heading += degs;
    this.heading = this.heading % 360;
  }

  this.log = function(extraMsg = ""){
    var logString = "X : " + this.location[0].toString() + ", Y : "
      + this.location[1].toString() + ", Heading : " + this.heading.toString()
      + extraMsg;
    console.log(logString);
  }
}

//Bot control system
function BotCon(initial_x = width/2, initial_y = height/2, initial_h = 0){
  //bot object to manipulate
  this.bot = new Bot(initial_x, initial_y, initial_h);
  //
  this.targets = [];

  //add new target to targets array
  this.setTarget = function(x,y){
    this.targets.push([x, y]);
  }

  //make small step towards target
  this.stepTowards = function(stpSize = 3){
    //stuff
  }

  //moves and draws
  this.run = function(){
    this.stepTowards();
    this.bot.draw();
  }
}


//draw background and grid
function background(){
  //background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
  //grid of dots
  ctx.fillStyle = '#AAAAAA';
  for(var h = 50; h < height; h += 50){
    for(var w = 50; w < width; w += 50){
      drawDot(w, h);
    }
  }
}

//draw a dot
function drawDot(x, y){
  ctx.beginPath();
  ctx.ellipse(x, y, 1, 1, 0, 0, (Math.PI * 2));
  ctx.fill();
}

//runs only once, sets stuff up
function setup(){
  background();
  quad = new BotCon(330,330);
}

//runs every 20ms
function update(){
  background();
  quad.run();
}

//runs upon window begin loaded
window.onload = function(){
  //get canvas object from html
  var canvas = document.getElementById('mainCanvas');
  //get width and height of canvas, stores in global variables
  width = canvas.width;
  height = canvas.height;
  //get canvas context from canvas, store in ctx
  ctx = canvas.getContext('2d');
  setup();
  //run update() 50 times a second
  timer = window.setInterval(update, 20);
}
