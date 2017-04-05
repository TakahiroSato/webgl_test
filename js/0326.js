var t = thrjs2d;

t.init("canvas");

t.fillStyle = "#ff0000";
var rect = t.fillRect(0, 0, 30, 30);
t.fillStyle = "#00ff00";
var rect2 = t.fillRect(0, 100, 50, 50);

t.fillStyle = "#0000ff";
var box = t.drawBox(0,0,100,100,100, t.fillStyle);

var boxs = [];

for(var i = 0 ; i < 30 ; i++){
    t.fillStyle = Math.floor(Math.random()*16581375*i);
    boxs[i] = t.drawBox(i*10,i*10,i*5, i*5, i*5, t.fillStyle);
}

t.drawLine(0,0,100,100,100,"#aabbcc");

t.render();

function camera(x,y,z){
    t.setCameraPosition(x,y,z);
    t.render();
}

var addx = 0;
var addy = 0;
var addz = 0;
var x = 0;
var y = 0;
var z = 0;
var flag = false;
$("#button1").on("mousedown", function(){
    addx = 1;
    flag = true;
});
$("#button2").on("mousedown", function(){
    addy = 1;
    flag = true;
});
$("#button3").on("mousedown", function(){
    addz = 1;
    flag = true;
});
$("#button4").on("mousedown", function(){
    addx = -1;
    flag = true;
});
$("#button5").on("mousedown", function(){
    addy = -1;
    flag = true;
});
$("#button6").on("mousedown", function(){
    addz = -1;
    flag = true;
});

$("input").on("mouseup", function(){
    addx = 0;
    addy = 0;
    addz = 0;
    flag = false;
});

function reload(){
    if(flag){
        x += addx;
        y += addy;
        z += addz;
        camera(x,y,z);
    }
    t.render();
    box.position.x += 0.2;
    box.position.y -= 0.2;
    box.rotation.z += 0.02;
    box.rotation.y += 0.02;
    box.rotation.x += 0.04;
    for(var i = 0 ; i < 30 ; i++){
        boxs[i].rotation.z += 0.001*(i % 2 == 0 ? i : i);
        boxs[i].rotation.y += 0.001*(i % 2 == 0 ? i : i);
        boxs[i].rotation.z += 0.001*(i % 2 == 0 ? i : i);
    }
    requestAnimationFrame(reload);
}

//setInterval(reload, 1);
reload();