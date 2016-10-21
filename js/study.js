document.addEventListener("DOMContentLoaded", function(event){
    main();
});

function main(){
// canvas
var w = 400;
var h = 400;
var canvas = document.getElementById("canvas");
canvas.width = w;
canvas.height = h;
var gl = null;
try{
    gl = canvas.getContext("webgl");
}catch(e){}

// clear
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

/*
// 今いる場所[x=-1.0, y=1.0]
// 向かいたい座標
var x = 250;
var y = 250;

// 計算して算出する
var dx = (x-(w/2))/(w/2); // dx = 0.25
var dy = -(y-(h/2))/(h/2); // dy = -0.25
*/

// 1.空のバッファオブジェクトを生成
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// 2.バーテックス（頂点）シェーダー
var vSource = [
    "precision mediump float;",
    "attribute vec2 vertex;",
    "void main(void) {",
        "gl_Position = vec4(vertex, 0.0, 1.0);",
    "}"
].join("\n");

var vShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vShader, vSource);
gl.compileShader(vShader);
gl.getShaderParameter(vShader, gl.COMPILE_STATUS);

// 3.フラグメントシェーダー
var rgba = [1.0, 0.0, 0.0, 1.0]; // Red, Green, Blue, Alpha
var fSource = [
    "precision mediump float;",
    "void main(void) {",
        "gl_FragColor = vec4("+rgba.join(",")+");",
    "}"
].join("\n");

var fShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fShader, fSource);
gl.compileShader(fShader);
gl.getShaderParameter(fShader, gl.COMPILE_STATUS);

// 4.プログラムオブジェクトの生成
var program = gl.createProgram();
gl.attachShader(program, vShader);
gl.attachShader(program, fShader);
gl.linkProgram(program);
gl.getProgramParameter(program, gl.LINK_STATUS);
gl.useProgram(program);

// 5.シェーダー側の変数をjs側で受け取る
var vertex = gl.getAttribLocation(program, "vertex");
gl.enableVertexAttribArray(vertex);
gl.vertexAttribPointer(vertex, 2, gl.FLOAT, false, 0, 0);

// 6.座標をセットする
// 開始座標
var x = 200; // x座標
var y = 200; // y座標

// 向かいたい座標
var dx = 400; // x座標
var dy = 0;   // y座標

// 座標をセット
    var vertices = [
        (x-(w/2))/(w/2), -(y-(h/2))/(h/2),
        (dx-(w/2))/(w/2), -(dy-(h/2))/(h/2)
    ];


    // 7.描画する
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
gl.drawArrays(gl.LINE_STRIP, 0, vertices.length/2);

}