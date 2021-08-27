//vars
let game = { input: 0, rounds: 0, round: 0, target: 0, running: false, wins: 0 };

//helper
function getId(element) {
    return document.getElementById(element);
}

//change rounds
function changeRounds() {
    if (!game.running) {
        readRounds();
        writeResult("Press Start to play a Game");
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

    do {
        game.target = (Math.random() / 3.3333 * 10).toFixed(0);
    } while (game.target == 0);

    if (game.running == false) game.round = game.rounds;
}

//write rounds remain and win, loose or draw
function writeResult(result) {
    getId("counter").innerHTML = `${game.round} / ${game.rounds}`;
    getId("matchResult").innerHTML = `You have won ${game.wins} / ${game.rounds} rounds`;
    getId("result").innerHTML = `${result}`;
}

//response on guess button with blink
function flash(id, color) {

    let target = document.getElementById(id);

    if (target.style.backgroundColor == "lightgrey" || target.style.backgroundColor == "") {
        setTimeout(() => { target.style.backgroundColor = color }, 300);
        setTimeout(() => { target.style.backgroundColor = "lightgrey" }, 900);
    } else {
        target.style.backgroundColor = "lightgrey";
    }
}

//read input and take a guess
function guess(input) {

    if (game.round == 0) {
        writeResult("Game is over, press restart for another try");
        game.wins = 0
        game.running = false;
        return;
    }

    game.round--;

    if (game.running) {

        readRounds();

        //0 = Rock
        //1 = paper
        //2 = scissor
        //maybe switch next time for readability and performance at bigger code
        if (input == 0) {
            if (game.target == 2) {
                game.wins++;
                writeResult("win");
                flash("rock", "green");
            } else if (game.target == 1) {
                writeResult("lose");
                flash("rock", "red");
            } else {
                writeResult("draw");
                flash("rock", "yellow");
            }
        } else if (input == 1) {
            if (game.target == 1) {
                game.wins++;
                writeResult("win");
                flash("paper", "green");
            } else if (game.target == 2) {
                writeResult("lose");
                flash("paper", "red");
            } else {
                writeResult("draw");
                flash("paper", "yellow");
            }
        } else if (input == 2) {
            if (game.target == 1) {
                game.wins++;
                writeResult("win");
                flash("scissor", "green");
            } else if (game.target == 0) {
                writeResult("lose");
                flash("scissor", "red");
            } else {
                writeResult("draw");
                flash("scissor", "yellow");
            }
        }
    }
}

//start/restart game
function start() {

    if (game.running) {
        readRounds();
        game.round = game.rounds;
        writeResult("Game restarted");
    } else {
        readRounds();
        writeResult("Game started");
        game.wins = 0;
        game.running = true;
        getId("start").innerHTML = "restart";
    }
}