var threejs = thrjs2d;
threejs.init("canvas");

threejs.fillStyle = "#0000ff";
var box = threejs.drawBox(0,0,100,100,100, threejs.fillStyle);
var box2 =  threejs.drawBox(0, 0, 200, 200, 200, "#ff0000");
var x = 0;
var y = 0;
var z = 0;
var addX = 0;
var addCnt = 0;
var cnt = 0;

var mousePos = {
    x:0,
    y:0
}

threejs.moveTo(0, 0);
threejs.lineTo(100, 100);

threejs.fillRect(100, 100, 100, 100);

$("#canvas").on("mousemove", function(e){
    mousePos.x = e.clientX;
    mousePos.y = -e.clientY;
});

$("#canvas").on("click", function(){
    addX = Math.PI/50;
    addCnt = 1;
});

(function reload(){
    x += addX;
    cnt += addCnt;
    if(cnt % 25 == 0){
        addX = 0;
        addCnt = 0;
    }
    if(!box.isEmpty()){
        box.setPos(mousePos.x, mousePos.y, 0);
        box.setRotation(x, y, z);
    }
    if(!box2.isEmpty()){
        box2.setPos(mousePos.x+100, mousePos.y+100, 0);
        box2.setRotation(x, y, z);
    }
    threejs.render();
    requestAnimationFrame(reload);
})();