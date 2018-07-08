import Bot from './bot.js';
import BotCon from './botCon.js';


//canvas control object
var ctx;
//width and height of canvas
var width, height;
//timer
var timer;
//instance of BotCon
var quad;

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
