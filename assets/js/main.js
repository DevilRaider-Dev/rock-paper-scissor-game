//vars
let game = { input: 0, rounds: 0, round: 0, target: 0, running: false };
let output = ["Result:<br>"];

//helper
function getId(element) {
    return document.getElementById(element);
}

function checkValidInput() {
    return game.input > 0 && game.input < 101;
}

//change rounds
function changeRounds() {
    if (!game.running) {
        readRounds();
        output[1] = "Press Start to play a Game"
        writeResult(true);
    }
}

//read rounds from page
function readRounds() {

    let arr = [
        getId("roundsFour"),
        getId("roundsFive"),
        getId("roundsSix"),
        getId("roundsCostum")
    ];

    for (var x in arr) {
        if (arr[x].checked) {
            switch (arr[x].id) {
                case "roundsFour":
                    game.rounds = 4;
                    break;
                case "roundsFive":
                    game.rounds = 5;
                    break;
                case "roundsSix":
                    game.rounds = 6;
                    break;
                case "roundsCostum":
                    game.rounds = Number(getId("txt-costumRounds").value);
                    break;
            }
        }
    };
    game.round = game.rounds;
}

//write rounds remain and play log to result
function writeResult(result) {
    //store output array backwards
    let reverse = output.slice().reverse();

    getId("counter").innerHTML = `${game.round} / ${game.rounds}`;

    if (result == true) {
        getId("result").innerHTML = `${output[1]}<br>`;
    } else {
        getId("result").innerHTML = `${reverse.pop()}<br>`;
        reverse.forEach(element => {
            getId("result").innerHTML += `${element}<br>`;
        });
    }
}

//read input and take a guess
function guess() {

    game.input = Number(getId("guess").value);

    if (game.running && checkValidInput()) {

        game.round--;
        if (game.input < game.target) {
            output.push(`${game.input} is to Low - Next Try`);
            writeResult(false);
        } else if (game.input > game.target) {
            output.push(`${game.input} is to high - Next Try`);
            writeResult(false);
        } else if (game.input == game.target) {
            output[1] = "WIN - Try Again";
            game.running = false;
            writeResult(true);
        } 
        if (game.round == 0) {
            output[1] = "Loose - Try Again";
            game.running = false;
            writeResult(true);
        }
        
    } else if (game.running) {
        output.push(`Choose a Number between 1 and 100`);
        writeResult(false);
    } else {
        output[1] = `Game not started, Press the Play Button`
        getRounds();
        writeResult(true);
    }
}

//start/restart game
function start() {

    game.input = Number(getId("guess").value);

    if (game.running) {
        output[1] = `Game restarted, take a guess`;
        readRounds();
    } else {
        output[1] = `Game started, take a guess`;
        readRounds();
        game.running = true;
        getId("start").innerHTML = "restart"
    }
    writeResult(true);
    output = ["Result:<br>"];
}