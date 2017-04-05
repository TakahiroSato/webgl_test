var thrjs2d = (function() {
    var renderer;
    var scene;
    var camera;
    var div;
    var width;
    var height;
    var fov = 90;   // ����
    var near = 0.1;   // ҕ��e��ǰ�ޤǤξ��x
    var far = 1000; // ҕ��e�¤ޤǤξ��x
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
            renderer = new THREE.WebGLRenderer({antialias: false, alpha:true}); // ������`������
            renderer.setSize(width, height); // ������`�Υ�������div�Υ��������O��
            renderer.setClearColor(0x000000, 1); // ������`�α���ɫ���ɫ��͸�^�����O��
            div.appendChild(renderer.domElement); // div�I��˥�����`������
            scene = new THREE.Scene();  // ���`�������
            // �����S���ʾ
            var axes = new THREE.AxisHelper(width);
            scene.add(axes);
            var directionalLight = new THREE.DirectionalLight( 0xffffff );
            directionalLight.position.set( 0, 0.7, 0.7 );
            scene.add( directionalLight );
            //camera = new THREE.PerspectiveCamera(fov, width/height, near, far);
            camera = new THREE.OrthographicCamera(width/-2,width/2, height/2,height/-2,0.1,1000);
            camera.up.set(0,0,1);
            camera.position.set(0,0,height/2);
            camera.lookAt({x:0, y:0, z:0}); // �����ҕҰ���������ˤ��O��
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
            // geometry�����Ԥ�����
            var geometry = new THREE.Geometry();
            // 픵����ˤ�׷��
            geometry.vertices.push(new THREE.Vector3(sx-width/2, sy+height/2, 0));
            geometry.vertices.push(new THREE.Vector3(dx-width/2, dy+height/2, 0));

            // �����֥������Ȥ�����
            var material = new THREE.LineBasicMaterial({linewidth:w, color: color})
            var line = new THREE.Line(geometry, material);

            // scene��line��׷��
            scene.add(line);
        },
        fillRect:function(x, y, w, h){
            return this.drawRect(x, y, w, h, this.fillStyle);
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

            return plane;
        },
        drawBox:function(x, y, w, h, d, color){
            y *= -1;
            var boxGeo = new THREE.BoxGeometry(w, h, d);
            var material = new THREE.MeshLambertMaterial({color: color});
            material.transparent = true;
            material.opacity = this.globalAlpha;
            var box = new THREE.Mesh(boxGeo, material);
            scene.add(box);

            box.setPos = function(x, y, z){
                this.position.x = x-(width-w)/2;
                this.position.y = y+(height-h)/2;
                this.position.z = z;
            }

            box.setRotation = function(x, y, z){
                this.rotation.x = x;
                this.rotation.y = y;
                this.rotation.z = z;
            }

            box.setPos(x, y, z);
            return box;
        },
        clear:function(){
            scene.children.forEach(function(object){
                scene.remove(object);
            });
        },
        remove:function(obj){
            scene.remove(obj);
        },
        render:function(){
            renderer.render(scene, camera);
        }
    };
})();