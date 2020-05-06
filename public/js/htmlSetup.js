import { gameState } from './gameState.js';

function addDivToBody(divId, divClass) {

    let element = document.createElement('div');
    element.setAttribute('id', divId); 
    element.setAttribute('class', divClass);
    document.body.appendChild(element); 

};

function addDivToDiv(divIdToAddTo, divId, divClass) {

    let targetDiv = document.getElementById(divIdToAddTo);
    let element = document.createElement('div');
    element.setAttribute('id', divId); 
    element.setAttribute('class', divClass);
    targetDiv.appendChild(element);

};

function populatePlayerHud() {

    const playerHud = document.getElementById('playerHud');

    let healthLabel = document.createElement('p');
    healthLabel.innerText = 'Health';
    playerHud.appendChild(healthLabel);

    let healthBarContainer = document.createElement('div');
    healthBarContainer.setAttribute('id', 'healthBarContainer');
    playerHud.appendChild(healthBarContainer);

    let healthBar = document.createElement('div');
    healthBar.setAttribute('id', 'healthBar');
    healthBarContainer.appendChild(healthBar);

    let thrustLabel = document.createElement('p');
    thrustLabel.innerText = 'Thrust';
    playerHud.appendChild(thrustLabel);

    let thrustBarContainer = document.createElement('div');
    thrustBarContainer.setAttribute('id', 'thrustBarContainer');
    playerHud.appendChild(thrustBarContainer);

    let thrustBar = document.createElement('div');
    thrustBar.setAttribute('id', 'thrustBar');
    thrustBarContainer.appendChild(thrustBar);

    let scoreLabel = document.createElement('p');
    scoreLabel.innerText = 'Score';
    playerHud.appendChild(scoreLabel);

    let score = document.createElement('p');
    score.setAttribute('id', 'playerScore');
    score.innerText = '0';
    playerHud.appendChild(score);

    let levelLabel = document.createElement('p');
    levelLabel.innerText = 'Level';
    playerHud.appendChild(levelLabel);

    let level = document.createElement('p');
    level.setAttribute('id', 'playerLevel');
    level.innerText = gameState.level;
    playerHud.appendChild(level);


}

function populateMessageArea() {

  const messageArea = document.getElementById('messageArea');

  messageArea.setAttribute('hidden', 'true');

  let h1 = document.createElement('h1');
  h1.setAttribute('id', 'messageAreaH1');
  messageArea.appendChild(h1);

  let p = document.createElement('p');
  p.setAttribute('id', 'messageAreaP');
  messageArea.appendChild(p);

}

function populateDebugArea() {

    const debugArea = document.getElementById('debugHud');
    debugArea.setAttribute('hidden', 'true');

    const title = document.createElement('h1');
    title.innerText = '-[DEBUG]-';
    debugArea.appendChild(title);

    const headingsPlayer = ['VECTOR', 'X', 'Y', 'Z', 'W', ];
    let table = createTable('PLAYER', 'player', 4, 5, headingsPlayer);
    debugArea.appendChild(table);

    const headingsPlayerMovement = ['LEFT', 'RIGHT', 'FORWARD', 'BACK', 'UP', ];
    table = createTable('PLAYER MOVEMENT', 'playerMovement', 1, 5, headingsPlayerMovement);
    debugArea.appendChild(table);

    const headingsCamera = ['VECTOR', 'X', 'Y', 'Z', ];
    table = createTable('CAMERA', 'camera', 2, 4, headingsCamera);
    debugArea.appendChild(table);

    const headingCollision = ['COLLISION', 'VALUE', ];
    table = createTable('COLLISION', 'collision', 2, 2, headingCollision);
    debugArea.appendChild(table);

    const headingGameState = ['GAME STATE', 'VALUE', ];
    table = createTable('GAME STATE', 'gameState', 2, 2, headingGameState);
    debugArea.appendChild(table);

    const headingPerformance = ['FRAME', 'TIME (s)', 'DELTA (s)', '',];
    table = createTable('PERFORMANCE', 'performance', 3, 4, headingPerformance);
    debugArea.appendChild(table);

    let fpsGraph = createFpsGraph();
    debugArea.appendChild(fpsGraph);

}

function createTable(title, id, rows, cols, headings) {

    let tableContainer = document.createElement('div');
    tableContainer.setAttribute('id', 'tableContainer');

    let tableTitle = document.createElement('h2');
    tableTitle.innerText = title;
    tableContainer.appendChild(tableTitle);
    
    let table = document.createElement('table');
    table.setAttribute('id', id);
    table.setAttribute('class', 'table');

    let row = document.createElement('tr');
    table.appendChild(row);
    for (let j = 0; j < cols; j++) {
        let heading = document.createElement('th');
        heading.innerText = headings[j];
        row.appendChild(heading);
    }

    for (let i = 0; i < rows; i++) {
        row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < cols; j++) {
            let data = document.createElement('td');
            data.setAttribute('id', `${id}_row_${i}_col_${j}`);
            row.appendChild(data);
        }
    }
    tableContainer.appendChild(table);
    return tableContainer;
}

function writePlayerArea(state) {

    let h1 = document.getElementById('messageAreaH1');
    let p = document.getElementById('messageAreaP');
    let text = '';
    
    switch (state) {
        case 'preGame':
            h1.innerText = 'A game by William Carter';
            text = 'Press any key to start<br><br>';
            text += '<u>CONTROLS</u><br><br>';
            text += '<u>Player</u><br><br>'; 
            text += 'Direction - Forward / Back - W / S<br>';
            text += 'Direction - Left / Right - A / D<br>';
            text += 'Thrust - SPACE<br><br>';
            text += '<u>Debug</u><br><br>'; 
            text += 'Window - Toggle - F<br>';
            text += 'GameState - Trigger GameOver - H<br><br>';
            text += '<u>Camera</u><br><br>';
            text += 'Focus On Player - Toggle - T<br>';
            text += 'Direction - Forward / Back - U / J<br>';
            text += 'Direction - Left / Right - O / P<br>';
            text += 'Direction - Up / Down - I / K<br>';
            break;
        case 'gameOver':
            h1.innerText = 'GAME OVER';
            text += 'Please try again';
            break;
    }

    p.innerHTML = text;

}

function createFpsGraph() {

    let fpsGraphContainer = document.createElement('div');
    fpsGraphContainer.setAttribute('id','fpsGraphContainer');

    let bars = document.createElement('ul');
    bars.setAttribute('id','bars');

    for (let i = 0 ; i < 50 ; i++) {

        let bar = document.createElement('li');

        bar.setAttribute('id', `bar${i}`);
        bar.setAttribute('class', 'bar');

        bar.style.left = (i * 5 + 12.5) + 'px';
        bar.style.margin = 0;
        bar.style.bottom = 5 + 'px';

        bars.appendChild(bar);

    }

    fpsGraphContainer.appendChild(bars);

    let title = document.createElement('div');
    title.innerText = 'Historic FPS';
    fpsGraphContainer.appendChild(title);

    return fpsGraphContainer;

}

let htmlSetup = {

    addHtml: function() {

        addDivToBody('gameArea', 'gameArea');
        addDivToDiv('gameArea', 'playerHud', 'hud');
        addDivToDiv('gameArea', 'debugHud', 'hud');
        addDivToDiv('gameArea', 'messageArea', 'hud');
        populatePlayerHud();
        populateMessageArea();
        populateDebugArea();

    },

    writeDebugValue: function(id, value) {

        const element = document.getElementById(id);
        element.innerText = value;

    },

    writeHudValue: function(id, value) {

        const element = document.getElementById(id);
        element.innerText = value;

    },

    populatePlayerArea: function(state) {

        switch (state) {
            case 'preGame':
                writePlayerArea('preGame');
                break;
            case 'gameOver':
                writePlayerArea('gameOver');
                break;
            default:
                break;

        }

    },

};

export {htmlSetup};

