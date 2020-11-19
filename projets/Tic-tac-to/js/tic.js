let status = ['', '', '', '', '', '', '', '', ''];
let filled = [false, false, false, false, false, false, false, false, false];
let radioX = document.querySelector('#radio-X');
let radioO = document.querySelector('#radio-O');
let button = document.querySelector('.start-btn');
let block;
let isX;
let image = '';
let opp = '';
let oppSymbol = '';
let symbol = '';
let pursueWrite = true;
let appWrote = false;
let stopGame = false;
let count;
let random = [];
let randomNum;
let blockOpp;
let addOne;
let arg = [];
let args = [];
let winPlay = document.getElementById('winAudio');
let losePlay = document.getElementById('loseAudio');
let fairPlay = document.getElementById('fairAudio');
let modal = document.getElementById('theModal');
let result = document.querySelector('#theResult');
let barClass;

function choose() {

    if (radioX.checked) {
        isX = true;
        image = "url('images/x-logo.svg')";
        opp = "url('images/o-logo.svg')";
        symbol = 'X';
        oppSymbol = 'O';


    } else if (radioO.checked) {
        isX = false;
        image = "url('images/o-logo.svg')";
        opp = "url('images/x-logo.svg')";
        oppSymbol = 'X';
        symbol = 'O';
    } else {
        alert('Choose you symbol before starting')
    }
    if (isX || !isX && isX !== undefined) {
        radioX.disabled = true;
        radioO.disabled = true;
        button.value = 'Restart game';
        button.addEventListener("click", function () {
            location.reload();
        })
    }

}


function draw(num) {
    block = document.getElementsByClassName('block')[num];
    if (!filled[num] && isX !== undefined && pursueWrite && !stopGame) {
        block.style.backgroundImage = image;
        filled[num] = true;
        pursueWrite = false;
        if (isX) {
            status[num] = 'X'
        } else {
            status[num] = 'O'
        }

        setTimeout(function () {
            autoDraw(0, 1, 2);
            autoDraw(3, 4, 5);
            autoDraw(6, 7, 8);
            autoDraw(0, 3, 6);
            autoDraw(1, 4, 7);
            autoDraw(2, 5, 8);
            autoDraw(0, 4, 8);
            autoDraw(2, 4, 6);
        }, 1000);

    }
}

function autoDraw(a, b, c) {

    let oppCount = 0;
    let myCount = 0;

    for (let i in arguments) {
        if (status[arguments[i]] == oppSymbol) {
            oppCount++;

        } else if (status[arguments[i]] == symbol) {
            myCount++;
        }

    }

    if (oppCount == 2) {
        for (let x in arguments) {
            if (!filled[arguments[x]] && !appWrote && !stopGame) {
                block = document.getElementsByClassName('block')[arguments[x]];
                filled[arguments[x]] = true;
                status[arguments[x]] = oppSymbol;
                block.style.backgroundImage = opp;
                blockOpp = false;
                appWrote = true;
                addOne = false;

            }
        }
    } else if (myCount == 2 && oppCount < 1) {
        arg.push(a, b, c);
        blockOpp = true;
    } else if (oppCount == 1 && myCount < 1) {
        args.push(a, b, c);
        addOne = true;
    }

    if (a == 2 && b == 4 && c == 6) {
        random = [];


        if (blockOpp && !appWrote && !stopGame) {
            arg.forEach((index) => {
                if (!filled[index] && blockOpp) {
                    block = document.getElementsByClassName('block')[index];
                    block.style.backgroundImage = opp;
                    filled[index] = true;
                    status[index] = oppSymbol;
                    blockOpp = false;
                    arg = [];
                }
            });

        } else if (addOne && !appWrote && !stopGame && !blockOpp) {
            args.forEach((index) => {
                if (!filled[index] && addOne) {
                    block = document.getElementsByClassName('block')[index];
                    block.style.backgroundImage = opp;
                    filled[index] = true;
                    status[index] = oppSymbol;
                    addOne = false;
                    args = [];
                }
            });
        } else if (!blockOpp && !appWrote && !stopGame) {
            for (y in filled) {
                if (!filled[y]) {
                    random.push(y)
                }
            }

            do {
                randomNum = random[Math.floor(Math.random() * random.length)];
            } while (filled[randomNum]);
            block = document.getElementsByClassName('block')[randomNum];
            block.style.backgroundImage = opp;
            filled[randomNum] = true;
            status[randomNum] = oppSymbol;
        }

        pursueWrite = true;
        appWrote = false;
    }
    verify(0, 1, 2);
    verify(3, 4, 5);
    verify(6, 7, 8);
    verify(0, 3, 6);
    verify(1, 4, 7);
    verify(2, 5, 8);
    verify(0, 4, 8);
    verify(2, 4, 6);
}


function verify(d, e, f) {
    if (!stopGame) {

        if (status[d] === 'X' && status[e] === 'X' && status[f] === 'X') {
            switch (isX) {
                case true:
                    win(d, e, f);
                    break;
                default:
                    lose(d, e, f);
            }
        } else if (status[d] === 'O' && status[e] === 'O' && status[f] === 'O') {
            switch (isX) {
                case true:
                    lose(d, e, f);
                    break;
                default:
                    win(d, e, f);
            }
        }

        if (d == 2 && e == 4 && f == 6) {
            if (!stopGame) {
                let countFilled = 0;
                for (z in filled) {
                    if (filled[z]) {
                        countFilled++;
                    }
                }
                if (countFilled == 9) {
                    fair();
                }
            }
        }
    }
}

function win(d, e, f) {
    block = document.getElementsByClassName('block');
    winPlay.play();
    stopGame = true;
    modal.style.display = "block";
    result.innerHTML = 'You have won the game';
    for (x in arguments) {
        block[arguments[x]].style.backgroundColor = '#53d3f3';
    }
}

function lose(d, e, f) {
    block = document.getElementsByClassName('block');
    losePlay.play();
    stopGame = true;
    modal.style.display = "block";
    result.innerHTML = 'You lost the game';
    for (x in arguments) {
        block[arguments[x]].style.backgroundColor = '#ff4949';
    }
    block.classList.remove('hover-class');
}


function fair() {
    block = document.getElementsByClassName('block');
    fairPlay.play();
    stopGame = true;
    modal.style.display = "block";
    result.innerHTML = 'Fair match';
    block.classList.remove('hover-class');
}