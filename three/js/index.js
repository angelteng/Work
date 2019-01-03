var renderer;
function initThree() {
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    // document.body.appendChild(renderer.domElement);
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff, 1.0);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 200;
    camera.position.y = 500;
    camera.position.z = 800;
    // camera.up.x = 0;
    // camera.up.y = 0;
    // camera.up.z = 1;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var light;
function initLight() {
    light = new THREE.DirectionalLight(0xFF0000,1);
    light.position.set(100,100,1);
    scene.add(light);
}

var cube;
var mesh;
function initObject() {
    for(var k =0;k<2;k++){
        var geometry = new THREE.BoxGeometry( 100,100,100);
        for ( var i = 0; i < geometry.faces.length; i += 2 ) {

            var hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex( hex );
            geometry.faces[ i + 1 ].color.setHex( hex );

        }
        // var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors} );
        var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } )
        mesh = new THREE.Mesh( geometry,material);
        mesh.position.set(0,k*50,k * 400);
        scene.add(mesh);

    }
}

var stats;
function render()
{
    // renderer.clear();
    // mesh.position.x =mesh.position.x +1;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    stats.update();
    // TWEEN.update();
}


function initStats(){
    stats = new Stats();
    stats.setMode(1); // 0: fps, 1: ms
// 将stats的界面对应左上角
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );
    setInterval( function () {
        stats.begin();
        // 你的每一帧的代码
        stats.end();
    }, 1000 / 60 );
}

function initGrid(){
    // 网格的边长是1000，每个小网格的边长是50
    var helper = new THREE.GridHelper( 1000, 50,0x0000ff, 0x808080 );
    var helper2 = new THREE.GridHelper( 1000, 50,0x0000ff, 0x808080 );
    helper2.rotation.x = Math.PI/2;
    scene.add( helper );
    scene.add(helper2);
}


var INTERSECTED;
function initEvent(){
    var objects=[];
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
//监听全局点击事件,通过ray检测选中哪一个object
    document.addEventListener("mousedown", (event) => {
        console.log('mousedown');
        event.preventDefault();
        mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;


        raycaster.setFromCamera(mouse, this.camera);
        this.scene.children.forEach(child => {
            if (child instanceof THREE.Mesh) {//根据需求判断哪些加入objects,也可以在生成object的时候push进objects
                objects.push(child)
            }
        })
        var intersects = raycaster.intersectObjects(objects);


        if (intersects.length > 0) {
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0x0000ff );
        }
        else {
            if ( INTERSECTED ) {
                INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

                var originPoint = INTERSECTED.position.clone();
                var crash = false;
                for (var vertexIndex = 0; vertexIndex < INTERSECTED.geometry.vertices.length; vertexIndex++) {
                    // 顶点原始坐标
                    var localVertex = INTERSECTED.geometry.vertices[vertexIndex].clone();
                    // 顶点经过变换后的坐标
                    var globalVertex = localVertex.applyMatrix4(INTERSECTED.matrix);
                    // 获得由中心指向顶点的向量
                    var directionVector = globalVertex.sub(INTERSECTED.position);

                    // 将方向向量初始化
                    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
                    // 检测射线与多个物体的相交情况

                    var collisionResults = ray.intersectObjects(objects);
                    // 如果返回结果不为空，且交点与射线起点的距离小于物体中心至顶点的距离，则发生了碰撞
                    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                        crash = true;

                    }
                }
                if(crash){
                    alert('crash');
                    INTERSECTED.position.set(0,0,400);
                }
            }
            INTERSECTED = null;

        }
    }, false);

    // var mouse = new THREE.Vector2();
    document.addEventListener("mousemove",(event) => {
        event.preventDefault();
        if(INTERSECTED){
            
            var mouse = new THREE.Vector2();
            console.log(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
            mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

            raycaster.setFromCamera( mouse, camera );
            var objects = [];
            scene.children.forEach(child => {
                if (child instanceof THREE.GridHelper) {//根据需求判断哪些加入objects,也可以在生成object的时候push进objects
                    objects.push(child)
                }
            });

            var intersects = raycaster.intersectObjects( objects );


            if (intersects.length > 0) {
                var selected = intersects[ 0 ];
                // console.log(selected.point.x,selected.point.y,selected.point.z);
                INTERSECTED.position.copy(selected.point);
                INTERSECTED.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

            }
        }
    },false);
}


function initTween(){
    new TWEEN.Tween( mesh.position)
        .to( { x: -400,z:100,y:100 }, 3000 ).repeat( Infinity ).start();
}


function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    initGrid();
    initStats();
    initEvent();
    // initTween();
    render();
}
// setTimeout(function(){
    threeStart();
// },500)
