/* globals threeJsFor2D, $ */
var threejs = threeJsFor2D;
threejs.init("canvas");

var mapWidth = 10;
var mapHeight = 10;
var map = [];

for(var i = 0; i < mapHeight; i++){
	var row = new Array(mapWidth);
	row.fill(0);
	map[i] = row;
}

var boxs = new Array(mapWidth*mapHeight);
for(i = 0; i < mapHeight; i++){
	for(var j = 0; j < mapWidth; j++){
		boxs[i * mapWidth + j] = threejs.drawBox(j*(50+10)+50, i*(50+10)+50, 50, 50, 50, "#ff0000");
	}
}

var x = 0;
var y = 0;
var z = 0;
function setAnimation(){
	x += 0.05;
	y += 0.05;
	z += 0.05;
	for(i = 0; i < mapHeight; i++){
		for(j = 0; j < mapWidth; j++){
			boxs[i*mapWidth +j].setRotation(x, y, z);
		}
	}
}

(function loop() {
	setAnimation();
	threejs.render();
	requestAnimationFrame(loop);
})();