//Random Vines
var v = [];

function setup(){
	createCanvas(window.innerWidth,window.innerHeight);

	//*
	//TOP
	for (var n = 0; n < 5; n++) {
		var prtr = window.innerWidth*n/6;
		v.push(new Vine(prtr+window.innerWidth/6, 0, 50, Math.PI/2));
	}
	for (var n = 0; n < 5; n++) {
		var prtr = window.innerWidth*n/6;
		v.push(new Vine(prtr+window.innerWidth/6, window.innerHeight, 50, -Math.PI/2));
	}

	//LEFT
	for (var m = 0; m < 3; m++) {
		var prtr = window.innerHeight*m/4;
		v.push(new Vine(0, prtr+window.innerHeight/4, 50, 0));
	}
	for (var m = 0; m < 3; m++) {
		var prtr = window.innerHeight*m/4;
		v.push(new Vine(window.innerWidth, prtr+window.innerHeight/4, 50, Math.PI));
	}
	//*/
	//v.push(new Vine(0, window.innerHeight/2, 50, 0));
	//v.push(new Vine(window.innerWidth/2, 0, 50, Math.PI/2));
}

function draw(){
	for (var n = 0; n < v.length; n++) {
		v[n].move();
		v[n].draw();
	}
}

function Vine(x, y, rad, ang){
	this.x = x;
	this.y = y;
	this.rad = rad;
	var swap = 1;
	var inc = 10, xinc = 0, yinc = 0, prevx, prevy;

	//USING ANGLES
	var xinc = inc*cos(ang);
	var yinc = inc*sin(ang);

	this.move = function(){
		prevx = this.x;
		prevy = this.y;
		this.x = this.x+xinc;
		this.y = this.y+yinc;
		xinc=xinc+0.5*swap;
		yinc=yinc-0.5*swap;
		this.rad--;

		//CHANGE DIRECTION
		var c = Math.floor(Math.random()*5+1);
		if (chances(5)) {
			swap = -swap;
		}
	}

	this.draw = function(){
		if(this.rad<0)
			return;

		var angle = atan((this.y-prevy)/(this.x-prevx));
		var pangle = angle + Math.PI/2;
		var rangle = pangle;

		if(chances(2))
			rangle = rangle-Math.PI;

		//SPLIT
		if(chances(40))
			 v.push(new Vine(this.x, this.y, this.rad, rangle));

		colorPicker();
		noStroke();

		ellipse(this.x, this.y, this.rad*2, this.rad*2);
		quad(prevx+(this.rad+1)*cos(pangle), prevy+(this.rad+1)*sin(pangle), 
			 prevx-(this.rad+1)*cos(pangle), prevy-(this.rad+1)*sin(pangle), 
			 this.x-this.rad*cos(pangle), this.y-this.rad*sin(pangle), 
			 this.x+this.rad*cos(pangle), this.y+this.rad*sin(pangle));
	}

	function colorPicker(){
		var r = Math.floor(Math.random()*30+10); //10-40
		var g = Math.floor(Math.random()*30+120); //120-150
		var b = Math.floor(Math.random()*30); //0-30
		//console.log(r, g, b);
		fill(r, g, b);
		return color = [r, g, b];
	}

	function rnjesus(bound){
		var n = Math.floor(Math.random()*bound+1);
	}

	function chances(ez){
		var n = Math.floor(Math.random()*ez+1);
		console.log("n="+n);
		if(n==1)
			return true;
		return false;
	}
};