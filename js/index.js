const letterHolder = document.getElementById("letterHolder");

let word;
let charArray = [];
let userGuesses = [];
let guessesRemaining = 6;
let charCounter = 0;

let buttonStart = document.getElementById("startPlay");
let guessSpan = document.getElementById("youveGuessed");

let imagePieces = {
    5: [0, 0],
    4: [1, 0],
    3: [2, 0],
    2: [0, 1],
    1: [1, 1],
    0: [2, 1]
};

buttonStart.onclick=function(){
    buttonStart.classList.add("invisible");
    buttonStart.id = "restartPlay";
    genWordDiv();
    genCatPic();
};

function genWord() {
    return Word_List.getRandomWord();
}


function genWordDiv() {
    let word = genWord();
    let wordLength = word.length;

    for (let i = 0; i < wordLength; i++) {
        let div = document.createElement("div");
        div.id = "letterBox_" + i;
        div.className = "letterBox";

        let curChar = word.charAt(i);
        charArray.push(curChar);

        let letter = document.createElement("div");
        letter.id = "letter_" + i;
        letter.className = "letterHidden invisible";
        letter.textContent = curChar;

        letterHolder.append(div);
        div.append(letter);
    }
}

function checkKey(key) {
    let charIndex = charArray.indexOf(key);
    let userGuessIndex = userGuesses.indexOf(key);

    if (userGuessIndex === -1){
        userGuesses.push(key);
        guessSpan.textContent = guessSpan.textContent + " " + key.toUpperCase();
    } else if(userGuessIndex !== -1) {
        guessesRemaining--;
        setGameStatus(1);
        return;
    }

    if (charIndex!== -1) {
        let index = [];
        for(i = 0; i< charArray.length; i++){
            if(charArray[i] === key){
                index.push(i);
                console.log(index);
            }
        }
        for(j=0; j < index.length; j++){
            let divToShow = document.getElementById("letter_" + index[j]);
            divToShow.classList.remove("invisible");
            charCounter++;
                if(charCounter === charArray.length){
                    setGameStatus(5);
                }
        }
    } else {
        guessesRemaining--;
        setGameStatus(2);
    }
}

function setGameStatus(set){
    let setDiv = document.getElementById("gameStatus");
    let gameGuesses = document.getElementById("guesses");
    gameGuesses.textContent = guessesRemaining;
    if(guessesRemaining === 0){
        setDiv.textContent="You lost!";
        setGameImage();
        gameEnd();
    } else if(set === 1){
        setDiv.textContent= "You've already guessed that!";
        setGameImage();
    } else if (set === 2){
        setDiv.textContent= "Nope.jpg";
        setGameImage();
    } else if (set === 3){
        setDiv.textContent= "yay";
    } else if (set === 4){
        setDiv.textContent = "";
    } else if (set === 5){
        setDiv.textContent = "Win!";
        gameEnd();
    }
}

function setGameImage(){
    let imageX = imagePieces[guessesRemaining][0];
    let imageY = imagePieces[guessesRemaining][1];
    drawImage(imageX, imageY);
}

function gameEnd(){
    for(i = 0; i < charArray.length; i++){
        let show = document.getElementById("letter_" + i);
        show.classList.remove("invisible");
    }
    let restartButton = document.getElementById("restartPlay");
    window.removeEventListener("keypress", keyFunctions);
    restartButton.textContent = "New Game?";

    restartButton.classList.remove("invisible");

    restartButton.onclick = function(){
        restart();
    };
}

function restart(){
    let restartButton = document.getElementById("restartPlay");
    restartButton.classList.add("invisible");
    ctx.clearRect(0,0,canvas.width,canvas.height);

    guessesRemaining = 6;

    while (letterHolder.firstChild) {
        letterHolder.removeChild(letterHolder.firstChild);
    }

    guessSpan.textContent = "";
    charArray = [];
    userGuesses=[];
    charCounter=0;

    image = new Image();


    image.onload = function(){
        setCanvas();
        gameInit();
    };

    image.src = "http://thecatapi.com/api/images/get?api_key[MTk2NzI0]";

    setGameStatus(4);
    genWordDiv();
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let image;
let image2 = new Image();

function drawImage(x, y) {
    let pieceHeight = Math.round(canvas.height / 2);
    let pieceWidth = Math.round(canvas.width / 3);

    console.log(pieceWidth, pieceHeight, x*pieceWidth, y*pieceHeight);

    ctx.drawImage(image, (x*pieceWidth), (y*pieceHeight), pieceWidth, pieceHeight, (x*pieceWidth), (y*pieceHeight), pieceWidth, pieceHeight);
}

function setCanvas(){
    console.log(this.naturalHeight, this.naturalWidth);
    image2.src=image.src;
    canvas.width = image2.width;
    canvas.height = image2.height;
}

function genCatPic(){
    image = new Image();


    image.onload = function(){
        setCanvas();
        gameInit();
    };

    image.src = "http://thecatapi.com/api/images/get?api_key[MTk2NzI0]";
}


function keyFunctions(){
    setGameStatus(4);
    checkKey(event.key);
}

function gameInit(){
    window.addEventListener("keypress", keyFunctions);
}