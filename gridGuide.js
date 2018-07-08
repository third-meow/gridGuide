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
    this.location[0] += (dis * Math.sin(this.heading * (Math.PI / 180)));
    this.location[1] -= (dis * Math.cos(this.heading * (Math.PI / 180)));
  };

  //adjust heading
  this.turn = function(degs){
    this.heading += degs;
    this.heading = this.heading % 360;
  };

  //set heading
  this.setHeading = function(newHeading){
    this.heading = newHeading % 360;
  };

  //log position and heading
  this.log = function(extraMsg = ""){
    var logString = "X : " + Math.round(this.location[0]).toString() + ", Y : "
      + Math.round(this.location[1]).toString() + ", Heading : "
      + Math.round(this.heading.toString()) + extraMsg;
    console.log(logString);
  };
}

//Bot control system
function BotCon(initial_x = width/2, initial_y = height/2, initial_h = 0){
  //bot object to manipulate
  this.bot = new Bot(initial_x, initial_y, initial_h);
  //array of target positions (in format [x, y])
  this.targets = [];
  //desired heading and step distance
  this.desiredHeading = 0;
  this.desiredStepDistance = 0;


  //add new target to targets array
  this.setTarget = function(x,y){
    this.targets.push([x, y]);
    console.log("Target : "+ this.targets[this.targets.length - 1] + " added");
    console.log("Next Target : "+this.targets[0]);
    this.run();
  };

  //draw green dots at targets
  this.drawTargets = function(){
    ctx.fillStyle = '#11EE11';
    for(var t = 0; t < this.targets.length; t++){
      drawDot(this.targets[t][0], this.targets[t][1]);
    }
  };

  //make small step towards target
  this.stepTowards = function(){
    //if target list not empty
    if (this.targets.length != 0){
      //calculate x and y distance
      var xdis = (this.bot.location[0] - this.targets[0][0]);
      var ydis = (this.bot.location[1] - this.targets[0][1]);

      //is target is straight left/right
      if(ydis == 0){
        //dersired heading should equal 90 or 270
        if (xdis > 0) {
          this.desiredHeading = 90;
        }
        else{
          this.desiredHeading = 270;
        }

        //derired step distance should equal xdis
        this.desiredStepDistance = Math.abs(xdis);
      }
      //if target is straight up/down
      else if (xdis == 0){
        //dersired heading will equal 0 or 180
        if(ydis > 0){
          this.desiredHeading = 180;
        }
        else{
          this.desiredHeading = 0;
        }

        //derired step distance should equal ydis
        this.desiredStepDistance = Math.abs(ydis);
      }
      //else target is on an angle
      else{
        //calculate desired heading and step size with trig
        this.desiredHeading = Math.abs(Math.atan(xdis / ydis) * (180 / Math.PI));
        this.desiredStepDistance = Math.sqrt((xdis * xdis) + (ydis * ydis));

        //if target is down and to right add 90
        if (xdis < 0 && ydis < 0){
          this.desiredHeading += 90;
        }
        //if target is down and to left add 180
        else if (xdis > 0 && ydis < 0){
          this.desiredHeading += 180;
        }
        //if up and left add 270
        else if(xdis > 0 && ydis > 0){
          this.desiredHeading += 270;
        }
      }

      //move bot
      this.bot.setHeading(this.desiredHeading);
      this.bot.move(this.desiredStepDistance);

      //remove target
      this.targets.shift();
    }
  };

  //moves and draws
  this.run = function(){
    this.drawTargets();
    this.bot.draw();
  };
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
  quad = new BotCon(300,300);
  quad.bot.log(' - Initial Position');
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
