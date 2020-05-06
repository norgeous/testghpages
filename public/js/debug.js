import { htmlSetup } from './htmlSetup.js';
import { cssSetup } from './cssSetup.js';
import { gameCamera } from './gameCamera.js';
import { gameState } from './gameState.js';
import { newPlayer } from './newPlayer.js';

let debug = {
    
    write: function() {

        htmlSetup.writeDebugValue('player_row_0_col_0', 'Position');
        htmlSetup.writeDebugValue('player_row_0_col_1', newPlayer.getPosVector().x.toFixed(2).toString());
        htmlSetup.writeDebugValue('player_row_0_col_2', newPlayer.getPosVector().y.toFixed(2).toString());
        htmlSetup.writeDebugValue('player_row_0_col_3', newPlayer.getPosVector().z.toFixed(2).toString());

        htmlSetup.writeDebugValue('player_row_1_col_0', 'Rotation (Quaternion)');
        htmlSetup.writeDebugValue('player_row_1_col_1', newPlayer.getRotQuaternion().x.toFixed(2).toString());
        htmlSetup.writeDebugValue('player_row_1_col_2', newPlayer.getRotQuaternion().y.toFixed(2).toString());
        htmlSetup.writeDebugValue('player_row_1_col_3', newPlayer.getRotQuaternion().z.toFixed(2).toString());
        htmlSetup.writeDebugValue('player_row_1_col_4', newPlayer.getRotQuaternion().w.toFixed(2).toString());

        htmlSetup.writeDebugValue('player_row_2_col_0', 'Rotation (Euler degr)');
        htmlSetup.writeDebugValue('player_row_2_col_1', newPlayer.getEulerAngles().x.toFixed(2).toString());
        htmlSetup.writeDebugValue('player_row_2_col_2', newPlayer.getEulerAngles().y.toFixed(2).toString());
        htmlSetup.writeDebugValue('player_row_2_col_3', newPlayer.getEulerAngles().z.toFixed(2).toString());

        htmlSetup.writeDebugValue('playerMovement_row_0_col_0', newPlayer.getMoveDirection().left);
        htmlSetup.writeDebugValue('playerMovement_row_0_col_1', newPlayer.getMoveDirection().right);
        htmlSetup.writeDebugValue('playerMovement_row_0_col_2', newPlayer.getMoveDirection().forward);
        htmlSetup.writeDebugValue('playerMovement_row_0_col_3', newPlayer.getMoveDirection().back);
        htmlSetup.writeDebugValue('playerMovement_row_0_col_4', newPlayer.getMoveDirection().up);

        htmlSetup.writeDebugValue('camera_row_0_col_0', 'Position');
        htmlSetup.writeDebugValue('camera_row_0_col_1', gameCamera.getPosVector().x.toFixed(2).toString());
        htmlSetup.writeDebugValue('camera_row_0_col_2', gameCamera.getPosVector().y.toFixed(2).toString());
        htmlSetup.writeDebugValue('camera_row_0_col_3', gameCamera.getPosVector().z.toFixed(2).toString());

        htmlSetup.writeDebugValue('camera_row_1_col_0', 'Look At');
        htmlSetup.writeDebugValue('camera_row_1_col_1', gameCamera.getLookAtVector().x.toFixed(2).toString());
        htmlSetup.writeDebugValue('camera_row_1_col_2', gameCamera.getLookAtVector().y.toFixed(2).toString());
        htmlSetup.writeDebugValue('camera_row_1_col_3', gameCamera.getLookAtVector().z.toFixed(2).toString());

        htmlSetup.writeDebugValue('collision_row_0_col_0', 'Impulse');
        htmlSetup.writeDebugValue('collision_row_0_col_1', gameState.collisionImpulse.toFixed(2).toString());
        htmlSetup.writeDebugValue('collision_row_1_col_0', 'ImpulseMax');
        htmlSetup.writeDebugValue('collision_row_1_col_1', gameState.collisionImpulseMax.toFixed(2).toString());

        htmlSetup.writeDebugValue('gameState_row_0_col_0', 'gameOver');
        htmlSetup.writeDebugValue('gameState_row_0_col_1', gameState.gameOver);
        htmlSetup.writeDebugValue('gameState_row_1_col_0', 'gameRunning');
        htmlSetup.writeDebugValue('gameState_row_1_col_1', gameState.gameRunning);

        htmlSetup.writeDebugValue('performance_row_0_col_0', gameState.frame);
        htmlSetup.writeDebugValue('performance_row_0_col_1', gameState.gameTime.toFixed(1).toString());
        htmlSetup.writeDebugValue('performance_row_0_col_2', gameState.gameTimeDelta.toFixed(3).toString());

        htmlSetup.writeDebugValue('performance_row_1_col_0', 'FPS (last frame)');
        htmlSetup.writeDebugValue('performance_row_1_col_1', 'FPS (all time)');
        htmlSetup.writeDebugValue('performance_row_1_col_2', 'FPS (max)');
        htmlSetup.writeDebugValue('performance_row_1_col_3', 'FPS (min)');

        htmlSetup.writeDebugValue('performance_row_2_col_0', gameState.fps.toFixed(0).toString());
        htmlSetup.writeDebugValue('performance_row_2_col_1', (gameState.frame / gameState.gameTime).toFixed(0).toString());
        htmlSetup.writeDebugValue('performance_row_2_col_2', gameState.fpsMax.toFixed(0).toString());
        htmlSetup.writeDebugValue('performance_row_2_col_3', gameState.fpsMin.toFixed(0).toString());

        for (let i = 0 ; i < 50 ; i++) {

            cssSetup.setBarFpsValue(i, gameState.fpsHistory[i]);

        }
        
    },
}

export {debug};