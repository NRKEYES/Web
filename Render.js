var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 1, 10 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )

var sphere1 = new THREE.Mesh( geometry, material );
scene.add( sphere1 );

var sphere2 = new THREE.Mesh( geometry, material );
scene.add( sphere2 );
sphere2.position.set(2,2,1)

camera.position.z = 5;
camera.position.x = 2

var animate = function () {
  requestAnimationFrame( animate );

  sphere1.rotation.x += 0.1;
  sphere1.rotation.y += 0.1;

  renderer.render(scene, camera);
};

animate();
