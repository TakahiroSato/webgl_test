var thrjs2d = (function() {
    var renderer;
    var scene;
    var camera;
    var div;
    var width;
    var height;
    var near = 0.001;   // 視体積手前までの距離
    var far = 1000; // 視体積奥までの距離
    var sx;
    var sy;

    return retObj = {
        fillStyle:0,
        lineWidth:1,
        globalAlpha:1,
        init:function(divid){
            div = document.getElementById(divid);
            width = div.clientWidth;
            height = div.clientHeight;
            renderer = new THREE.WebGLRenderer({antialias: false, alpha:true}); // レンダラーの生成
            renderer.setSize(width, height); // レンダラーのサイズをdivのサイズに設定
            renderer.setClearColor(0x000000, 0); // レンダラーの背景色を白色（透過）に設定
            div.appendChild(renderer.domElement); // div領域にレンダラーを配置
            scene = new THREE.Scene();  // シーンの生成
            //camera = new THREE.OrthographicCamera(width/-2, width/2, height/-2, height/2, near, far);
            camera = new THREE.PerspectiveCamera(90, width/height, near, far);
            camera.position.set(0,0,height/2);
            camera.lookAt({x:0, y:0, z:0}); // カメラ視野の中心座標を設定
        },
        moveTo:function(x, y){
            this.sx = x;
            this.sy = y;
        },
        lineTo:function(x, y){
            this.drawLine(this.sx, this.sy, x, y, this.lineWidth, this.fillStyle);
            this.sx = x;
            this.sy = y;
        },
        drawLine:function(sx, sy, dx, dy, w, color){
            dy *= -1;
            sy *= -1;
            // geometryの宣言と生成
            var geometry = new THREE.Geometry();
            // 頂点座標の追加
            geometry.vertices.push(new THREE.Vector3(sx-width/2, sy+height/2, 0));
            geometry.vertices.push(new THREE.Vector3(dx-width/2, dy+height/2, 0));

            // 線オブジェクトの生成
            var material = new THREE.LineBasicMaterial({linewidth:w, color: color})
            var line = new THREE.Line(geometry, material);

            // sceneにlineを追加
            scene.add(line);
        },
        fillRect:function(x, y, w, h){
            this.drawRect(x, y, w, h, this.fillStyle);
        },
        drawRect:function(x, y, w, h, color){
            y *= -1;
            var planeGeo = new THREE.PlaneGeometry(w, h);
            var material = new THREE.MeshBasicMaterial({color: color});
            material.transparent = true;
            material.opacity = this.globalAlpha;
            var plane = new THREE.Mesh(planeGeo, material);
            plane.position.x = x-(width-w)/2;
            plane.position.y = y+(height-h)/2;
            plane.position.z = 0;
            scene.add(plane);
        },
        clear:function(){
            scene.children.forEach(function(object){
                scene.remove(object);
            });
        },
        render:function(){
            renderer.render(scene, camera);
        }
    };
})();