let width_for_3d = 300;
let height_for_3d = 300;
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/200, 0.1, 1000 );
let renderer = new THREE.WebGLRenderer({alpha: true});

renderer.domElement.style.position = 'absolute';
renderer.setSize(  window.innerWidth,  200 );
container = document.getElementById('3d');
container.appendChild(renderer.domElement);

let geometry = new THREE.SphereGeometry( 1, 10 );


camera.position.z = 5;
camera.position.x = 2;


function render(local_x,local_y){
  this.x=local_x;
  this.y=local_y;

  let material1 = new THREE.MeshBasicMaterial( { color: 'blue' } )


  var sphere1 = new THREE.Mesh( geometry, material1 );
  sphere1.position.set(0,0,1)
  scene.add( sphere1 );

/*
  let material2 = new THREE.MeshBasicMaterial( { color: 'grey' } )
  var sphere2 = new THREE.Mesh( geometry, material2 );
  sphere2.position.set(2,2,1)
  scene.add( sphere2 );
*/



  function animate() {
    requestAnimationFrame( animate );

    sphere1.rotation.x += 0.1;
    sphere1.rotation.y += 0.1;

    renderer.render(scene, camera);
  };


animate();

}
