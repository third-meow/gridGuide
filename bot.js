
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

export {Bot};
