////////////////////
// Main Execution //
////////////////////

import { htmlSetup } from './htmlSetup.js';
import { cssSetup } from './cssSetup.js';
import { keyPresses } from './keyPresses.js';
import { gameConfig } from './gameConfig.js';
import { skybox } from './skybox.js';
import { newGround } from './newGround.js';
import { gameState } from './gameState.js';
import { debug } from './debug.js';
import { gameCamera } from './gameCamera.js';
import { hud } from './hud.js';
import { newPlayer } from './newPlayer.js';
import { eventHandlers } from './eventHandlers.js';

// Set up page
htmlSetup.addHtml();
cssSetup.addCss();

// Listen for keyboard input 
keyPresses.process();

// SET UP SCENE, RENDERER, CLOCK AND PHYSICS

// Clock 
let clock = new THREE.Clock();

// scene
let scene = new THREE.Scene();

// Renderer
let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(gameConfig.window.width, gameConfig.window.height);

// Attach renderer to page
document.getElementById('gameArea').appendChild(renderer.domElement);

// Physics
let physicsWorld, rigidBodies = [], tmpTrans = null;
let tmpPos = new THREE.Vector3(), tmpQuat = new THREE.Quaternion();
let ammoTmpPos = null, ammoTmpQuat = null;
let playerObject = null;
let collisionConfiguration;
let dispatcher;
let overlappingPairCache;
let solver;

const STATE = {
    DISABLE_DEACTIVATION : 4 
}

const FLAGS = {
    CF_KINEMATIC_OBJECT: 2 
}

// Start
let start = function () {

    tmpTrans = new Ammo.btTransform();
    ammoTmpPos = new Ammo.btVector3();
    ammoTmpQuat = new Ammo.btQuaternion();

    gameState.preGame = true;
    gameState.initFpsHistory();
    let intervalId = window.setInterval( () => gameState.writeFpsHistory(), 1000);

    setupPhysicsWorld();
    
    skybox.addToScene(scene);

    newGround.createGroundGraphics();
    newGround.addToScene(scene);
    newGround.createGroundPhysics();
    newGround.addToPhysics(physicsWorld);

    newPlayer.createPlayerGraphics();
    newPlayer.createDebugAxes();
    newPlayer.createPlayerPhysics();
    newPlayer.addToPhysics(physicsWorld);
    newPlayer.addToRigidBodies(rigidBodies);
    newPlayer.addToScene(scene);

    eventHandlers.setup();

    renderFrame();

}

// Ammojs Initialization
Ammo().then(start);

// Render Frame
let renderFrame = function () {

    gameState.frame++;

    let deltaTime = clock.getDelta();
    gameState.gameTimeDelta = deltaTime;
    gameState.gameTime += deltaTime;

    if (deltaTime > 0) {

        gameState.fps = 1 / deltaTime;

    }

    if (gameState.frame > 100) {

        if (gameState.fps > gameState.fpsMax) {gameState.fpsMax = gameState.fps;}
        if (gameState.fps < gameState.fpsMin) {gameState.fpsMin = gameState.fps;}

    }

    if (gameState.preGame) {

        document.getElementById('messageArea').hidden = false;
        htmlSetup.populatePlayerArea('preGame');

    } else {

        document.getElementById('messageArea').hidden = true;

    }

    if (gameState.gameRunning) {

        newPlayer.move();
        newPlayer.regenHealth(deltaTime);
        newPlayer.regenThrust(deltaTime);
        
    }

    if (gameState.levelComplete) {

        // ground.removeLevelFromScene(scene);
        // skybox.removeFromScene(scene);
        // gameState.level++;
        // gameState.levelComplete = false;
        // ground.createLevel();
        // ground.addLevelToScene(scene);
        // skybox.setTexturesForLevel();
        // skybox.addToScene(scene);

    }

    if ((newPlayer.getHealth() <= 0 ) || (newPlayer.getPosVector().y < -50)) {

        gameState.gameOver = true;
        gameState.gameRunning = false;

    }

    if (gameState.gameOver) {

        document.getElementById('messageArea').hidden = false;
        htmlSetup.populatePlayerArea('gameOver');
        
    } 

    updatePhysics(deltaTime);
    
    detectCollisions(deltaTime);

    gameCamera.render(renderer, scene);

    requestAnimationFrame(renderFrame);  

    debug.write();
    hud.write();


    if (gameState.objectFocus) {

        gameCamera.setLookAtVector(newPlayer.getPosVector());

    }

};

function setupPhysicsWorld() {

    collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    overlappingPairCache = new Ammo.btDbvtBroadphase();
    solver = new Ammo.btSequentialImpulseConstraintSolver();

    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));

};

function updatePhysics(deltaTime){

    // Step world
    physicsWorld.stepSimulation(deltaTime, 10);

    // Update rigid bodies
    for ( let i = 0; i < rigidBodies.length; i++ ) {

        let objThree = rigidBodies[i];
        let objAmmo = objThree.userData.physicsBody;
        let ms = objAmmo.getMotionState();

        if ( ms ) {

            ms.getWorldTransform( tmpTrans );
            let p = tmpTrans.getOrigin();
            let q = tmpTrans.getRotation();
            objThree.position.set( p.x(), p.y(), p.z() );
            objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

        }
    }

};

function detectCollisions(deltaTime) {

//https://stackoverflow.com/questions/31991267/bullet-physicsammo-js-in-asm-js-how-to-get-collision-impact-force

    let i;
    let dp = dispatcher;
    let num = dp.getNumManifolds();
    let manifold, num_contacts, j, pt;

    for (i = 0; i < num; i++) {
        manifold = dp.getManifoldByIndexInternal(i);

        num_contacts = manifold.getNumContacts();
        if (num_contacts === 0) {
            continue;
        }

        for (j = 0; j < num_contacts; j++) {

            pt = manifold.getContactPoint(j);
            gameState.collisionImpulse = pt.getAppliedImpulse();

            if (gameState.collisionImpulse > gameState.collisionImpulseMax) {

                gameState.collisionImpulseMax = pt.getAppliedImpulse();

            }

            if (gameState.collisionImpulse > 100) {

                newPlayer.decreaseHealth(gameConfig.player.health.collisionHealthLoss * deltaTime);

            }

        }
    }

};

