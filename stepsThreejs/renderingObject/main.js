function init() {

  // el three.js m7taga 7agten el scene w el camera
	var scene = new THREE.Scene();

	var box = getBox(1, 1, 1);
	var plane = getPlane(4);

	box.position.y = box.geometry.parameters.height/2;
	plane.rotation.x = Math.PI/2;

	scene.add(box);
	scene.add(plane);

  // el camera hna PerspectiveCamera  bta5od
  // 1- vertical
  // 2- ration
  // 3- near
  // 4- far

	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	);

	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;

	camera.lookAt(new THREE.Vector3(0, 0, 0));

  // hna el three.js btst5dm el webgl renderer

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('webgl').appendChild(renderer.domElement);
	renderer.render(
		scene,
		camera
	);
}


// 2y 3d model m7tag geometry and material
function getBox(w, h, d) {
	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);

	return mesh;
}

function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshBasicMaterial({
		color: 0xff0000,
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);

	return mesh;
}

init();
