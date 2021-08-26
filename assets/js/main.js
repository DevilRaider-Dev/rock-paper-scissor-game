//vars
let game = { input: 0, rounds: 0, round: 0, target: 0, running: false, wins: 0 };

//helper
function getId(element) {
    return document.getElementById(element);
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

    do {
        game.target = (Math.random() * 10 / 3).toFixed(0);
    } while (game.target == 0);

    if (game.running == false) game.round = game.rounds;
}

//write rounds remain and win, loose or draw
function writeResult(result) {
    getId("counter").innerHTML = `${game.round} / ${game.rounds}`;
    getId("matchResult").innerHTML = `You have won ${game.wins} / ${game.rounds} rounds`;
    getId("result").innerHTML = `${result}`;
}

//read input and take a guess
function guess(input) {

    game.round--;

    if (game.round == 0) {
        writeResult("Game is over, press restart for another try");
        game.wins = 0
        game.running = false;
        return;
    }

    if (game.running) {

        readRounds();

        //0 = Rock
        //1 = paper
        //2 = scissor
        if (input == 0) {
            if (game.target == 2) {
                game.wins++;
                writeResult("win");
            } else if (game.target == 1) {
                writeResult("lose");
            } else {
                writeResult("draw");
            }
        } else if (input == 1) {
            if (game.target == 1) {
                game.wins++;
                writeResult("win");
            } else if (game.target == 2) {
                writeResult("lose");
            } else {
                writeResult("draw");
            }
        } else if (input == 2) {
            if (game.target == 1) {
                game.wins++;
                writeResult("win");
            } else if (game.target == 0) {
                writeResult("lose");
            } else {
                writeResult("draw");
            }
        }

    } else if(game.running == false && game.round > 0){
        readRounds();
        writeResult("Game not started, Press the Play Button");
    }
}

//start/restart game
function start() {

    if (game.running) {
        readRounds();
        writeResult("Game restarted");
        game.round = 0;
    } else {
        readRounds();
        writeResult("Game started");
        game.wins = 0;
        game.running = true;
        getId("start").innerHTML = "restart";
    }
}