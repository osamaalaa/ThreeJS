 // el dat gui by5lena nst5dam UI controller

 //  el dat gui 5ad el pointlight w hycontrole 3la intensity mn 1 to 10

// speherGeometry :bta5od el size , wel width and el height segments values

// el shadows fel three js 2t3mlt b shadow maps technique

function init() {
	var scene = new THREE.Scene();
	var gui = new dat.GUI();

	var enableFog = false;

	if (enableFog) {
		scene.fog = new THREE.FogExp2(0xffffff, 0.2);
	}

	// var box = getBox(1, 1, 1);
	var plane = getPlane(30);
	// var pointLight = getPointLight(1);  // point light
  var spotLight = getSpotLight(1);

	var sphere = getSphere(0.05);
  var boxGrid = getBoxGrid(10, 1.5);  // el 10 de el amount  wel 1.5 de el seperation value

  // helper camera -------------------
  // var helper = new THREE.cameraHelper(spotLight.shadow.camera);


  //---------------------------------------------

	plane.name = 'plane-1';

	// box.position.y = box.geometry.parameters.height/2;
	plane.rotation.x = Math.PI/2;
	// pointLight.position.y = 2;
	// pointLight.intensity = 2;
  spotLight.position.y = 4;
  spotLight.intensity = 2;



	// scene.add(box);
	scene.add(plane);
	// pointLight.add(sphere);
  spotLight.add(sphere);
	// scene.add(pointLight);
  scene.add(spotLight);
  scene.add(boxGrid);

  // scene.add(helper);

	// gui.add(pointLight, 'intensity', 0, 10);
	// gui.add(pointLight.position, 'y', 0, 5);

  gui.add(spotLight, 'intensity', 0, 10);
  gui.add(spotLight.position, 'x', 0, 20);
  gui.add(spotLight.position, 'y', 0, 20);
  gui.add(spotLight.position, 'z', 0, 20);
  gui.add(spotLight, 'penumbra', 0, 1 );   // el spot light bya5od fel penumbra values ma ben 0 to 1

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

	var renderer = new THREE.WebGLRenderer();

  //------------ shadowing-------------
  // 2wl 7aga n2ol lel renderer 2n 27na hnuser el shadowing
  renderer.shadowMap.enabled = true;
  //---------------------------
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120, 120, 120)');
	document.getElementById('webgl').appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	update(renderer, scene, camera, controls);

	return scene;
}

function getBox(w, h, d) {
	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
  // el object hycast el shadow
  mesh.castShadow = true;


	return mesh;
}

function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)',
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
  // hn recieve el shadow
  mesh.receiveShadow = true;
	return mesh;
}

function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshBasicMaterial({
		color: 'rgb(255, 255, 255)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);

	return mesh;
}
//---------------------------------------------------------------

// group bey organize kza objects together
function getBoxGrid(amount, separationMultiplier) {
	var group = new THREE.Group();

	for (var i=0; i<amount; i++) {
		var obj = getBox(1, 1, 1);
		obj.position.x = i * separationMultiplier;
		obj.position.y = obj.geometry.parameters.height/2;
		group.add(obj);
		for (var j=1; j<amount; j++) {
			var obj = getBox(1, 1, 1);
			obj.position.x = i * separationMultiplier;
			obj.position.y = obj.geometry.parameters.height/2;
			obj.position.z = j * separationMultiplier;
			group.add(obj);
		}
	}

	group.position.x = -(separationMultiplier * (amount-1))/2;
	group.position.z = -(separationMultiplier * (amount-1))/2;

	return group;
}
//------------------------------------------------------------------

//=============Point Light====================

function getPointLight(intensity) {
	var light = new THREE.PointLight(0xffffff, intensity);
  // ---- shadowing
  // --- tane 7aga n2ol lel light 2n 27na hnuse el shadowing

  light.castShadow = true;   // cast y3ne hwa el source bta3 el shadow 3aks el recieve

	return light;
}

//------------------------------------------------------------------------
//-------------------------spotLight-------------------------------------
function getSpotLight(intensity) {
	var light = new THREE.SpotLight(0xffffff, intensity);
  // ---- shadowing
  // --- tane 7aga n2ol lel light 2n 27na hnuse el shadowing

  light.castShadow = true;   // cast y3ne hwa el source bta3 el shadow 3aks el recieve

  light.shadow.bias = 0.001;

  // el mapSize lel width w el height by5le el shadows sharper shwya
  light.shadow.mapSize.width = 2048;

  light.shadow.mapSize.height = 2048;

	return light;
}
//-------------------------------------------------------------------------

function update(renderer, scene, camera, controls) {
	renderer.render(
		scene,
		camera
	);

	controls.update();

	requestAnimationFrame(function() {

		update(renderer, scene, camera, controls);
	})
}

var scene = init();


// lights 3ndna 3 types :
//-------------------------
// 1 - PointLight
// 2- spotLight
// 3- Directional light
// 4- Ambient Light 
// 5- rectangular area light
