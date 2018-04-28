let width_for_3d = 300;
let height_for_3d = 300;


let colors = {1:"0x73BFB8",
              6:"0x2364AA",
              79:"0xEA7317"}


let renderer = new THREE.WebGLRenderer({alpha: true, antialiasing: true});
renderer.setClearColor( 0x000000, 0 );
renderer.domElement.style.position = 'absolute';
renderer.setSize(  window.innerWidth,  height_for_3d );

let camera = new THREE.PerspectiveCamera( 30,
                                        window.innerWidth/200,
                                        0.1,
                                        1000 );
camera.position.z = 20;

let scene = new THREE.Scene();

let pointLight = new THREE.PointLight( 0xd8d0d1 );
pointLight.position.x = 20;
pointLight.position.z = 20
scene.add(pointLight);

pointLight = new THREE.PointLight( 0xFEC601);
pointLight.position.x = -20;
pointLight.position.y = -20
scene.add(pointLight);

container = document.getElementById('3d');
container.appendChild(renderer.domElement);


var spheres = [];

function render(local_x,local_y,atoms, coords){

  for(var i=0; i< coords.length; i++){
    console.log(colors[atoms[i]]);
    let material = new THREE.MeshLambertMaterial({colors:colors[atoms[i]]});
    let geometry = new THREE.SphereGeometry( math.log10(atoms[i]*.5), 20,20 );
    let sphere = new THREE.Mesh( geometry, material);
    sphere.position.set(coords[i][0],coords[i][1],coords[i][2]);
    spheres.push(sphere);
    scene.add(sphere);
  };

  let theta = 0;
  function animate() {
    requestAnimationFrame( animate );
    renderer.render(scene, camera);

    camera.position.x = 20*math.cos(theta);
    camera.position.y = 20*math.sin(theta);
    camera.position.z = 20*math.sin(theta);
    theta+= .01;

    camera.lookAt(scene.position);
  }
  animate();
}
