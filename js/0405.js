var threejs = thrjs2d;
threejs.init("canvas");

threejs.fillStyle = "#0000ff";
var box = threejs.drawBox(0,0,100,100,100, threejs.fillStyle);
var x = 0;
var y = 0;
var z = 0;

var mousePos = {
    x:0,
    y:0
}

$("#canvas").on("mousemove", function(e){
    mousePos.x = e.clientX;
    mousePos.y = -e.clientY;
});

(function reload(){
    x += 0.1;
    y += 0.1;
    box.setPos(mousePos.x, mousePos.y, 0);
    box.setRotation(x*0.2, y*0.1, z*0.5);
    threejs.render();
    requestAnimationFrame(reload);
})();