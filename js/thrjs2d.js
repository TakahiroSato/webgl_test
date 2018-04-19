var thrjs2d = (function() {
    var renderer;
    var scene;
    var camera;
    var div;
    var width;
    var height;
    var fov = 45;       // 画角
    var near = 0.1;     // 視体積手前までの距離
    var far = 1000;     // 視体積奥までの距離
    var sx;
    var sy;
    var backGroundColor = "0x000000";

    var objectsArray = [];

    function createEmptyObject(){
        return {
            mesh: null,
            geometry: null,
            material: null,
            texture: null,
            setPos: function(x, y, z){
                this.mesh.setPos(x, y, z);
            },
            setRotation: function(x, y, z){
                this.mesh.setRotation(x, y, z);
            },
            remove: function(){
                if(objectsArray.indexOf(this) != -1){
                    objectsArray.splice(objectsArray.indexOf(this), 1);
                }
                if(this.mesh !== null) scene.remove(this.mesh);
                if(this.geometry !== null) this.geometry.dispose();
                if(this.material !== null) this.material.dispose();
                if(this.texture !== null) this.texture.dispose();

                this.mesh = null;
                this.geometry = null;
                this.material = null;
                this.texture = null;
            },
            isEmpty: function(){
                return this.mesh === null ? true : false;
            }
        }
    }

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
            renderer.setClearColor(backGroundColor, 1); // レンダラーの背景色を黒色（透過）に設定
            div.appendChild(renderer.domElement); // div領域にレンダラーを配置
            scene = new THREE.Scene();  // シーンの生成
            // 座標軸を表示
            var axes = new THREE.AxesHelper(width);
            scene.add(axes);
            var directionalLight = new THREE.DirectionalLight( 0xffffff );
            directionalLight.position.set( 0, 0.7, 0.7 );
            scene.add( directionalLight );
            //camera = new THREE.PerspectiveCamera(fov, width/height, near, far);
            camera = new THREE.OrthographicCamera(width/-2,width/2, height/2,height/-2, near, far);
            camera.up.set(0,1,0);
            camera.position.set(0,0,height/2);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
        },
        setCameraPosition:function(x, y, z){
            camera.position.set(-x,y,height/2+z);
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
            var obj = createEmptyObject();
            // geometryの宣言と生成
            obj.geometry = new THREE.Geometry();
            // 頂点座標の追加
            obj.geometry.vertices.push(new THREE.Vector3(sx-width/2, sy+height/2, 0));
            obj.geometry.vertices.push(new THREE.Vector3(dx-width/2, dy+height/2, 0));
            // 線オブジェクトの生成
            obj.material = new THREE.LineBasicMaterial({linewidth:w, color: color})
            obj.mesh = new THREE.Line(obj.geometry, obj.material);
            objectsArray.push(obj);
            // sceneにlineを追加
            scene.add(obj.mesh);
        },
        fillRect:function(x, y, w, h){
            return this.drawRect(x, y, w, h, this.fillStyle);
        },
        drawRect:function(x, y, w, h, color){
            y *= -1;
            var obj = createEmptyObject();
            obj.geometry = new THREE.PlaneGeometry(w, h);
            obj.material = new THREE.MeshBasicMaterial({color: color});
            obj.material.transparent = true;
            obj.material.opacity = this.globalAlpha;
            obj.mesh = new THREE.Mesh(obj.geometry, obj.material);
            obj.mesh.position.x = x-(width-w)/2;
            obj.mesh.position.y = y+(height-h)/2;
            obj.mesh.position.z = 0;
            objectsArray.push(obj);
            scene.add(obj.mesh);
            return obj;
        },
        drawBox:function(x, y, w, h, d, color){
            y *= -1;
            var obj = createEmptyObject();
            obj.geometry = new THREE.BoxGeometry(w, h, d);
            obj.material = new THREE.MeshLambertMaterial({color: color});
            obj.material.transparent = true;
            obj.material.opacity = this.globalAlpha;
            obj.mesh = new THREE.Mesh(obj.geometry, obj.material);
            scene.add(obj.mesh);
            obj.mesh.setPos = function(x, y, z){
                this.position.x = x-(width-w)/2;
                this.position.y = y+(height-h)/2;
                this.position.z = z;
            }
            obj.mesh.setRotation = function(x, y, z){
                this.rotation.x = x;
                this.rotation.y = y;
                this.rotation.z = z;
            }
            obj.mesh.setPos(x, y, z);
            objectsArray.push(obj);
            return obj;
        },
        clear:function(){
            while(objectsArray.length > 0){
                objectsArray[0].remove();
            }
        },
        render:function(){
            renderer.render(scene, camera);
        }
    };
})();