var listBlock = [];
var listNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8];
listBlock[0] = [document.getElementById('t-l-block'), false, false];
listBlock[1] = [document.getElementById('t-m-block'), false, false];
listBlock[2] = [document.getElementById('t-r-block'), false, false];
listBlock[3] = [document.getElementById('m-l-block'), false, false];
listBlock[4] = [document.getElementById('m-m-block'), false, false];
listBlock[5] = [document.getElementById('m-r-block'), false, false];
listBlock[6] = [document.getElementById('b-l-block'), false, false];
listBlock[7] = [document.getElementById('b-m-block'), false, false];
listBlock[8] = [document.getElementById('b-r-block'), false, false];

var radioX = document.getElementById('radio-X');
var radioO = document.getElementById('radio-O');

var chooseX;
var aWin;
var pause;
var winPlay = document.getElementById('winAudio');
var losePlay = document.getElementById('loseAudio');
var fairPlay = document.getElementById('fairAudio');

function theWin() {
    winPlay.play();
    aWin = true;
    pause = true;
    document.getElementById('theModal').style.display = "block";
    $('#theResult').html('You have won');
}

function theLoss() {
    losePlay.play();
    aWin = true;
    pause = true;
    document.getElementById('theModal').style.display = "block";
    $('#theResult').html('You have lost');
}

function fairGame() {
    fairPlay.play();
    aWin = true;
    pause = true;
    document.getElementById('theModal').style.display = "block";
    $('#theResult').html('Fair game');
}

function choose() {
    if (radioX.checked || radioO.checked) {

        chooseX = false;
        if (radioX.checked) {
            chooseX = true;
        }
        radioX.disabled = true;
        radioO.disabled = true;

    } else {
        alert('Choose X or O');
    }
}

function autoDraw() {

    var blockRemp = 0;
    for (var check in listBlock) {
        if (listBlock[check][1] === true || listBlock[check][2] === true) {
            blockRemp++;
        }
    }

    if (blockRemp !== listBlock.length && !aWin) {
        do {
            var getIndex = Math.floor(Math.random() * listNumber.length);
        } while (listNumber[getIndex] === undefined);

        var clickedBox = listBlock[getIndex][0];
        if (chooseX) {
            clickedBox.style.background = 'url("images/o-icon.png")';
            listBlock[getIndex][2] = true;
        } else {
            clickedBox.style.background = 'url("images/x-icon.svg")';
            listBlock[getIndex][1] = true;

        }
        delete listNumber[getIndex];
        clickedBox.style.backgroundSize = "14em 10em";
        clickedBox.style.backgroundRepeat = "no-repeat";
        checkHor();
        pause = false;
    } 
}

function draw(x) {

    // alert(pause);
    if (chooseX !== undefined && !listBlock[x][1] && !listBlock[x][2] && !pause) {
        //document.getElementById("winAudio").play();
        var clickedBox = listBlock[x][0];
        if (chooseX) {
            clickedBox.style.background = 'url("images/x-icon.svg")';
            listBlock[x][1] = true;

        } else {
            clickedBox.style.background = 'url("images/o-icon.png")';
            listBlock[x][2] = true;

        }
        delete listNumber[x];
        clickedBox.style.backgroundSize = "14em 10em";
        clickedBox.style.backgroundRepeat = "no-repeat";
        pause = true;
        setTimeout(autoDraw, 1500);
        checkHor();
    }
}


function checkHor() {

    if (listBlock[0][1] && listBlock[1][1] && listBlock[2][1]) {
        if (chooseX) {
            theWin();
        } else {
            theLoss();
        }
        aWin = true;
    } else if (listBlock[0][2] && listBlock[1][2] && listBlock[2][2]) {
        if (chooseX) {
            theLoss();
        } else {
            theWin();
        }
    } else if (listBlock[3][1] && listBlock[4][1] && listBlock[5][1]) {
        if (chooseX) {
            theWin();
        } else {
            theLoss();
        }
    } else if (listBlock[3][2] && listBlock[4][2] && listBlock[5][2]) {
        if (chooseX) {
            theLoss();
        } else {
            theWin();
        }
    } else if (listBlock[6][1] && listBlock[7][1] && listBlock[8][1]) {
        if (chooseX) {
            theWin();
        } else {
            theLoss();
        }
    } else if (listBlock[6][2] && listBlock[7][2] && listBlock[8][2]) {
        if (chooseX) {
            theLoss();
        } else {
            theWin();
        }
    }
    checkVer();

}


function checkVer() {
    if (listBlock[0][1] && listBlock[3][1] && listBlock[6][1]) {
        if (chooseX) {
            theWin();
        } else {
            theLoss();
        }
    } else if (listBlock[0][2] && listBlock[3][2] && listBlock[6][2]) {
        if (chooseX) {
            theLoss();
        } else {
            theWin();
        }
    } else if (listBlock[1][1] && listBlock[4][1] && listBlock[7][1]) {
        if (chooseX) {
            theWin();
        } else {
            theLoss();
        }
    } else if (listBlock[1][2] && listBlock[4][2] && listBlock[7][2]) {
        if (chooseX) {
            theLoss();
        } else {
            theWin();
        }
    } else if (listBlock[2][1] && listBlock[5][1] && listBlock[8][1]) {
        if (chooseX) {
            theWin();
        } else {
            theLoss();
        }
    } else if (listBlock[2][2] && listBlock[5][2] && listBlock[8][2]) {
        if (chooseX) {
            theLoss();
        } else {
            theWin();
        }
    }
    checkDiag();
    
}

function checkDiag() {

    if (listBlock[0][1] && listBlock[4][1] && listBlock[8][1]) {
        if (chooseX) {
            theWin();
        } else {
            theLoss();
        }
    } else if (listBlock[0][2] && listBlock[4][2] && listBlock[8][2]) {
        if (chooseX) {
            theLoss();
        } else {
            theWin();
        }
    } else if (listBlock[2][1] && listBlock[4][1] && listBlock[6][1]) {
        if (chooseX) {
            theWin();
        } else {
            theLoss();
        }
    } else if (listBlock[2][2] && listBlock[4][2] && listBlock[6][2]) {
        if (chooseX) {
            theLoss();
        } else {
            theWin();
        }
    }
    checkTotal();
}

function checkTotal() {
     var blockRemp = 0;
    for (var check in listBlock) {
        if (listBlock[check][1] === true || listBlock[check][2] === true) {
            blockRemp++;
        }
    } if (blockRemp == listBlock.length && !aWin) {
        fairGame();
    }
}
