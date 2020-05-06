import { gameConfig } from './gameConfig.js';

let camera = new THREE.PerspectiveCamera(

    gameConfig.camera.fov, // fov
    (window.innerWidth)/(window.innerHeight), // aspect ratio
    gameConfig.camera.nearClip, // near clipping plane
    gameConfig.camera.farClip // far clipping plane

);

camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 20;

let gameCamera = {

    init: function() {

        camera.position.x = 0;
        camera.position.y = 1;
        camera.position.z = 20;

        return camera;

    },

    getPosVector: function() {

        return new THREE.Vector3(

            camera.position.x,
            camera.position.y,
            camera.position.z,

        );

    },

    movePosVector: function(x, y ,z) {

        camera.position.x += x;
        camera.position.y += y;
        camera.position.z += z;

    },

    getLookAtVector: function() {

        //console.log(camera.lookAt);

        return new THREE.Vector3(

            camera.lookAt.x,
            camera.lookAt.y,
            camera.lookAt.z,

        )

    },

    moveLookAtVector: function(x, y, z) {



    },

    setLookAtVector: function(vector) {

        camera.lookAt(vector);
        // Have to set these are they are not a property of camera
        camera.lookAt.x = vector.x;
        camera.lookAt.y = vector.y;
        camera.lookAt.z = vector.z;

    },

    render: function(renderer, scene) {

        renderer.render(scene, camera);

    },
}

export {gameCamera};