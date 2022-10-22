const blue = document.querySelector('.blue-tile');
const green = document.querySelector('.green-tile');
const yellow = document.querySelector('.yellow-tile');
const red = document.querySelector('.red-tile');


const getRandomTile = () => {
    const tilesArr = [blue, green, yellow, red];
    return tilesArr[parseInt(Math.random() * tilesArr.length)];
}

    const seq = [getRandomTile()];
    let guessSeq = [...seq];
    let score = 0;



const flash = tiles => {
    return new Promise((resolve, reject) => {
        tiles.className += ' active';
        setTimeout(() => {
            setTimeout(() => {
                reject();
            }, 10000);
            tiles.className = tiles.className.replace(' active', 
            ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
        }, 1000);
    });
};


let canClick = false;
const tileClicked = tileClicked => {
    if(canClick == false){
        return;
    }
    const expectedTile = guessSeq.shift();
    if(expectedTile === tileClicked){
        if(guessSeq.length === 0){
            // start new round by adding
            //a new random tile and making
            //a new copy of the seq array
            seq.push(getRandomTile());
            guessSeq = [...seq];
            score += 1;
            document.getElementById("current-score").innerHTML = "Current Score: " + score;
            console.log(score);
            startFlash();
        }
    }
    else{
        //end game bc clicked on wrong tile
        document.getElementById("message").innerHTML = "GAME OVER! You lost, refresh the page to start over!";
        document.getElementById("message").className += ' active-h2';
    }
};


const startFlash = async () => {
    canClick = false;
    for (const tiles of seq){
        await flash(tiles);
    }
    canClick = true;

};

startFlash();
