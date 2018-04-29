/* globals threeJsFor2D, basicObjects, $ */
var threejs = threeJsFor2D;
var _b = basicObjects;
threejs.init("canvas");

let mapWidth = 15;
let mapHeight = 14;
let cellWidth = 50;
let cellHeight = 50;
var map = [];

threejs.fillStyle = "#ffffff";
for(var i = 1; i <= mapWidth; i++){
	threejs.moveTo(cellWidth*i, 0);
	threejs.lineTo(cellWidth*i, cellHeight*mapHeight);
}
for(var i = 1; i <= mapHeight; i++){
	threejs.moveTo(0, cellHeight*i);
	threejs.lineTo(cellWidth*mapWidth, cellHeight*i);
}

for (var i = 0; i < mapHeight; i++) {
	var row = new Array(mapWidth);
	row.fill(0);
	map[i] = row;
}

function box() {
	this.threeJsObj;
	this.movableObj = new _b.movableObject();
}

function headBox(){
	this.box = new box();
	this.mapPos = new _b.point(0, 0);
	this.nextMx;
	this.nextMy;
	this.speed;
	this.move = function(){
		this.box.movableObj.point.x += this.box.movableObj.vector.mx;
		if(this.box.movableObj.point.x < 0){
			this.box.movableObj.point.x = 0;
		}else if(this.box.movableObj.point.x + this.box.movableObj.size.w > mapWidth * cellWidth){
			this.box.movableObj.point.x = mapWidth * cellWidth - this.box.movableObj.size.w;
		}
		this.box.movableObj.point.y += this.box.movableObj.vector.my;
		if(this.box.movableObj.point.y < 0){
			this.box.movableObj.point.y = 0;
		}else if(this.box.movableObj.point.y + this.box.movableObj.size.h > mapHeight * cellHeight){
			this.box.movableObj.point.y = mapHeight * cellHeight - this.box.movableObj.size.h;
		}
		if(this.box.movableObj.point.x % cellWidth == 0 && this.box.movableObj.point.y % cellHeight == 0){
			this.box.movableObj.vector.mx = this.nextMx;
			this.box.movableObj.vector.my = this.nextMy;
		}
		this.box.threeJsObj.setPos(this.box.movableObj.point.x, this.box.movableObj.point.y, this.box.movableObj.point.z);
	};
}

var head = new headBox();
head.box.movableObj.point.x = 0;
head.box.movableObj.point.y = 0;
head.box.movableObj.point.z = 0;
head.speed = 5;
head.box.movableObj.vector.mx = head.speed;
head.box.movableObj.vector.my = 0;
head.nextMx = head.speed;
head.nextMy = 0;
head.box.movableObj.size.w = cellWidth;
head.box.movableObj.size.h = cellHeight;
head.box.movableObj.size.l = 50;
head.box.threeJsObj = threejs.drawBox(
	head.box.movableObj.point.x,
	head.box.movableObj.point.y,
	head.box.movableObj.size.w,
	head.box.movableObj.size.h,
	head.box.movableObj.size.l,
	"#ff0000");
/*
var boxs = new Array(mapWidth * mapHeight);
for (i = 0; i < mapHeight; i++) {
	for (var j = 0; j < mapWidth; j++) {
		var tmp = new box();
		tmp.movableObj.point.x = j * (50 + 10) + 50;
		tmp.movableObj.point.y = i * (50 + 10) + 50;
		tmp.movableObj.point.z = 0;
		tmp.movableObj.vector.mx = 0;
		tmp.movableObj.vector.my = 0;
		tmp.movableObj.vector.mz = 0;
		tmp.movableObj.lotation.lx = 0;
		tmp.movableObj.lotation.ly = 0;
		tmp.movableObj.lotation.lz = 0;
		tmp.movableObj.size.w = 50;
		tmp.movableObj.size.h = 50;
		tmp.movableObj.size.l = 50;
		tmp.threeJsObj = threejs.drawBox(
			tmp.movableObj.point.x,
			tmp.movableObj.point.y,
			tmp.movableObj.size.w,
			tmp.movableObj.size.h,
			tmp.movableObj.size.l,
			"#ff0000");
		boxs[i * mapWidth + j] = tmp;
	}
}
*/

$(window).keydown(function (e) {
	if (e.keyCode === 37) { // left key
		e.preventDefault();
		head.nextMx = -head.speed;
		head.nextMy = 0;
	}
	if (e.keyCode === 38) { // up key
		e.preventDefault();
		head.nextMx = 0;
		head.nextMy = -head.speed;
	}
	if (e.keyCode === 39) { // right key
		e.preventDefault();
		head.nextMx = head.speed;
		head.nextMy = 0;
	}
	if (e.keyCode === 40) { // down key
		e.preventDefault();
		head.nextMx = 0;
		head.nextMy = head.speed;
	}
});

function setAnimation() {
	head.move();
	/*for (i = 0; i < mapHeight; i++) {
		for (j = 0; j < mapWidth; j++) {
			boxs[i * mapWidth + j].movableObj.lotation.addLotation(0.03, 0.01, 0.01);
			var lot = boxs[i * mapWidth + j].movableObj.lotation;
			boxs[i * mapWidth + j].threeJsObj.setRotation(lot.lx, lot.ly, lot.lz);
		}
	}*/
}

(function loop() {
	setAnimation();
	threejs.render();
	requestAnimationFrame(loop);
})();