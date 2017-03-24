var t = thrjs2d;

t.init("canvas");

t.fillRect(250, 50, 300, 400);

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
}

setInterval(reload, 1);