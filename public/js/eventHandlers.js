import {newPlayer} from './newPlayer.js';
import { gameState } from './gameState.js';

function handleKeyDown(event){

    let keyCode = event.keyCode;

    if(gameState.gameRunning) {

        switch(keyCode){

            case 87: //W: FORWARD
                newPlayer.setMoveDirectionForward(1);
                break;

            case 83: //S: BACK
                newPlayer.setMoveDirectionBack(1);
                break;

            case 65: //A: LEFT
                newPlayer.setMoveDirectionLeft(1);
                break;

            case 68: //D: RIGHT
                newPlayer.setMoveDirectionRight(1);
                break;

            case 32: //SPACE: UP
                if (newPlayer.getThrust() > 0) {

                        if (newPlayer.getThrust() > 0) {

                            newPlayer.setMoveDirectionUp(1);
                            newPlayer.decreaseThrust(10);

                        } else {

                            newPlayer.setMoveDirectionUp(0);

                        }
                        break;

                }
        }
    }
}

function handleKeyUp(event){

    let keyCode = event.keyCode;

    switch(keyCode){

        case 87: //FORWARD
            newPlayer.setMoveDirectionForward(0);
            break;

        case 83: //BACK
            newPlayer.setMoveDirectionBack(0);
            break;

        case 65: //LEFT
            newPlayer.setMoveDirectionLeft(0);
            break;

        case 68: //RIGHT
            newPlayer.setMoveDirectionRight(0);
            break;
        case 32: //SPACE: UP
            newPlayer.setMoveDirectionUp(0);
            break;

    }

}


let eventHandlers = {

    setup: function() {

        window.addEventListener('keydown', handleKeyDown, false);
        window.addEventListener('keyup', handleKeyUp, false);

    }

}

export {eventHandlers};