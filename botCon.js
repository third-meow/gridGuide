

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
