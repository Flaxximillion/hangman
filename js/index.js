/* *
 *
 *
 * SUPER IMPORTANT NOTES
 * "let" and "const" are replacements for "var". Don't worry about them.
 *
 * Any extraneous code that doesn't have to do with the base logic of the game will be marked. Ignore those too
 *
 * */


//vvvv--IMPORTANT STUFF--vvvv--IMPORTANT STUFF--vvvv--IMPORTANT STUFF--vvvv--IMPORTANT STUFF--vvvv//
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
//
//Declare all essential global variables here
//
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

//Get the div that holds all the letters.

let letterHolder = document.getElementById("letterHolder");

//Create the word variable globally.

let word;

//Create the array of word characters.

let charArray = [];

//Create the array of what the user has guessed.

let userGuesses = [];

//Set the amount of guesses the user start with.

let guessesRemaining = 6;

//Create the counter for the number of characters the users has guessed correctly.

let charCounter = 0;


//Get the start button.

let buttonStart = document.getElementById("startPlay");

//Get the span that displays what you've guessed.

let guessSpan = document.getElementById("youveGuessed");

let displayDiv = document.getElementById("gameTextHolder");

let descriptorText = document.getElementById("descriptorText");

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//



//--------------------------------------------------------------------------------------------------------------------------------------//
//vvvvvvvvvvvvvvvvvvUNIMPORTANTvvvvvvvvvvvvvvvvvvvvvvvvv//
//
//
//These variables are not for the game logic. You can ignore them.


//Get the div that displays the loading circle.

let loadingDiv = document.getElementById("loader");

//Set an arbitrary load time to give time for the first cat image to load because I am
//too lazy to use an async function :^)
window.onload = function(){
    window.setTimeout(function(){
        buttonStart.classList.remove("invisible");
        loadingDiv.classList.add("invisible");
    },1000);
};

//Set the position for each piece of the canvas.

const imagePieces = {
    5: [0, 0],
    4: [1, 0],
    3: [2, 0],
    2: [0, 1],
    1: [1, 1],
    0: [2, 1]
};

//Get the canvas and set the base image variables.

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let image = new Image();

let image2 = new Image();

//^^^^^^^^^^^^^^^^^^^UNIMPORTANT^^^^^^^^^^^^^^^^^^^^^^//





//vvvv--IMPORTANT STUFF--vvvv--IMPORTANT STUFF--vvvv--IMPORTANT STUFF--vvvv--IMPORTANT STUFF--vvvv//

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
//
//This is the code that starts the game when the "Start Game!" button is pressed.
//
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

buttonStart.onclick = function () {

    //First, we make the button invisible and change the class
    //so we can reuse it to restart the game later.

    buttonStart.classList.add("invisible");
    buttonStart.id = "restartPlay";

    //Second, we call the starting function(s).
    //In my case, genCatPic() has the necessary code for my stuff to move forward.
    //In your case, you can just throw in whatever function you need to start your game.
    //Mine would be gameInit() and genWordDiv(), so if I didn't want a cool
    //cat picture to generate, I could replace this genCatPic() with gameInit() and genWordDiv()

    genCatPic();
};

//Generates a cat picture for the background.
//After a working image is fully loaded, the rest of the game will start.
//This is unessential and not important unless you want cool pictures.


function genCatPic() {
    image.onload = function () {
        loadingDiv.classList.add("invisible");
        setCanvas();
        //^^^^^^^^^^^^^UNIMPORTANT^^^^^^^^^^^^^//


        //This will run the next important functions.
        //If you weren't waiting for an image to load like I am,
        //You can call gameInit() and genWordDiv() when the player
        //clicks the start button instead of genCatPic().
        gameInit();
        image.onload = null;
        genWordDiv();
    };

    //vvvvvvvvvvvvvUNIMPORTANTvvvvvvvvvvvvvv//
    loadingDiv.classList.remove("invisible");

    //vvvvvvvvvvvvvUNIMPORTANTvvvvvvvvvvvvvv//
    getImage();
    //^^^^^^^^^^^^^UNIMPORTANT^^^^^^^^^^^^^//
}

//Function to generate a random word. Technically unnecessary in the current
//implementation, but I threw it in here in case I wanted to have more words.

function genWord() {

    //Returns a random word from the Javascript library "wordBank" I have in the scripts.

    return Word_List.getRandomWord();
}


//This adds the event listener on the user's screen that watch for pressed keys.
//It will give whatever key the user pressed to the function "keyFunctions".


function gameInit() {

    descriptorText.className = "invisible";
    displayDiv.classList.remove("invisible");
    window.addEventListener("keypress", keyFunctions);
}

//This takes whatever key the event listener gives it and parses it.

function keyFunctions() {

    //I have a div that tells you the current status of the game.
    //This will reset it to be blank when the user presses a new key.

    setGameStatus(4);

    //Gives the checkKey() function the key that the user pressed.

    checkKey(event.key);
}


//Generates all the divs that hold each letter in the word.
//Also generates the divs that hold the letters, so I can set them to be invisible/visible.

function genWordDiv() {

    //Set global variable word to a random word.

    word = genWord();

    //Get the word's length.

    let wordLength = word.length;

    //Make [x] number of divs equal the word's length, and add them to the div that holds the word on the user's screen.

    //Also add each letter character to an array individually.

    //Also generate another div that holds the actual letter. This is a child of the div that we just made. It is separate
    //so we can style and display it without affecting the box that holds it.

    for (let i = 0; i < wordLength; i++) {
        let div = document.createElement("div");
        div.className = "letterBox";

        let curChar = word.charAt(i);
        charArray.push(curChar);

        //To access the appropriate div later to display the letters,
        //we give each div an id of "letter_" + i. That way we can recall the
        //appropriate div later by calling it by its ID.

        let letter = document.createElement("div");
        letter.id = "letter_" + i;
        letter.className = "letterHidden invisible";
        letter.textContent = curChar;

        letterHolder.append(div);
        div.append(letter);
    }
}

//Check what key the user pressed, and do stuff accordingly.

function checkKey(key) {

    //Check the array of letters in the word to see if the key the user pressed is in there.

    let charIndex = charArray.indexOf(key);

    //Check the array of letters the user has already pressed to see if the key the user pressed
    //is in there.

    let userGuessIndex = userGuesses.indexOf(key);

    //If the key the user pressed is NOT already in the array, then add it.
    //Also add the key the user just pressed to the display that tells the user what they've
    //already pressed.
    //If the user has already guessed the key they pressed, take away a guess, and tell them they suck.

    if (userGuessIndex === -1) {
        userGuesses.push(key);
        guessSpan.textContent = guessSpan.textContent + " " + key.toUpperCase();
    } else if (userGuessIndex !== -1) {
        guessesRemaining--;
        setGameStatus(1);
        return;
    }

    //If the key the user pressed IS in the word, then add it to an array that keeps track of
    //the index of characters the user guessed correctly. Keep in mind that this array will be
    //recreated each time this function runs.

    if (charIndex !== -1) {
        let index = [];
        for (i = 0; i < charArray.length; i++) {
            if (charArray[i] === key) {
                index.push(i);
            }
        }

        //Go through the array we just created of letter indices and tell the document
        //the appropriate div to reveal.
        //Also if the user has guessed all the characters, set the game status to 5, aka "win".

        for (j = 0; j < index.length; j++) {
            let divToShow = document.getElementById("letter_" + index[j]);
            divToShow.classList.remove("invisible");
            charCounter++;
            if (charCounter === charArray.length) {
                setGameStatus(5);
            }
        }
    }

    //If the key the user pressed is NOT in the word, then take a guess away and set the
    //game status to 2, aka "the key you pressed is not in the word".

    else {
        guessesRemaining--;
        setGameStatus(2);
    }
}

//This is the function that sets the status of the game.
//If the user loses all guesses, this will tell the users that they lost and run the function to end the game (a parameter of "0").
//If the user guesses something they've already guessed, tell the user they've already guessed that ("1").
//If the user guessed something wrong, tell the user the letter they picked is not part of the word. ("2").
//If the user guessed a letter right, tell the user the letter they picked is part of the word. ("3").
//setGameStatus(4) is called to reset the text between key presses.
//If the user wins, tell them they win and run the function to end the game ("5").

function setGameStatus(set) {

    //Get the div that displays the game status.

    let setDiv = document.getElementById("gameStatus");

    //Set the number of guesses remaining to the "guesses" div.

    let gameGuesses = document.getElementById("guesses");
    gameGuesses.textContent = guessesRemaining;

    if (guessesRemaining === 0) {
        setDiv.textContent = "You lost!";
        setGameImage();
        gameEnd();
    } else if (set === 1) {
        setDiv.textContent = "You've already guessed that!";
        setGameImage();
    } else if (set === 2) {
        setDiv.textContent = "Nope.jpg";
        setGameImage();
    } else if (set === 3) {
        setDiv.textContent = "yay";
    } else if (set === 4) {
        setDiv.textContent = "";
    } else if (set === 5) {
        setDiv.textContent = "Win!";
        gameEnd();
    }
}

//Function that executes when the game ends.

function gameEnd() {

    //Show the user the full word.

    for (i = 0; i < charArray.length; i++) {
        let show = document.getElementById("letter_" + i);
        show.classList.remove("invisible");
    }

    //Remove the event listener that watches for when the user presses a key.

    window.removeEventListener("keypress", keyFunctions);

    //Get the restart button, display it, and change the text to "New Game?"

    let restartButton = document.getElementById("restartPlay");
    restartButton.textContent = "New Game?";

    restartButton.classList.remove("invisible");
    displayDiv.classList.add("invisible");

    //When the button is clicked, run the "restart" function. Also
    //give the restart function the restart button because I'm too lazy to
    //set it to a global variable.

    restartButton.onclick = function () {
        restart(this);
    };
}

//Function to restart the game.

function restart(button) {

    //Make the button invisible

    button.classList.add("invisible");

    //Not important, but this clears my HTML canvas.

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Reset the number of guesses remaining.

    guessesRemaining = 6;

    //Delete all the divs that hold the letters.

    while (letterHolder.firstChild) {
        letterHolder.removeChild(letterHolder.firstChild);
    }

    //Reset the content of the appropriate variables.

    setGameStatus(4);
    charArray = [];
    userGuesses = [];
    charCounter = 0;

    //Call the first function necessary to start the game again.

    genCatPic();
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
//^^^^--IMPORTANT STUFF--^^^^--IMPORTANT STUFF--^^^^IMPORTANT STUFF^^^^--IMPORTANT STUFF--^^^^//


//vvvvvvvvvvvvvvvvvvvvvUNIMPORTANTvvvvvvvvvvvvvvvvvvvvvvvvv//

//Call the cat API to get a random cat picture.
//Also has some code to handle what happens if the picture isn't available.

image.onerror = getImage();

function getImage(){

    let init = {
        method: 'GET',
        cache: 'no-cache',
        mode: 'cors'
    };

    fetch("https://random.cat/meow", init)
        .then(handleErrors)
        .then(function(response){
            return response.json();
        }).then(function(j){
            image.src = j.file;
    })
}
//Logs the error message if the fetch request returns an error.

function handleErrors(response) {
    if (!response.ok) {
        console.log(response);
        throw Error(response.statusText);
    }
    return response;
}

//Sets the dimension of the HTML canvas to the original size of the image.

function setCanvas() {
    image2.src = image.src;
    canvas.width = image2.width;
    canvas.height = image2.height;
}

//Finds the appropriate coordinates of the next image piece to draw based on
//how many guesses the user has remaining. Then draw the image.

function setGameImage() {
    let imageX = imagePieces[guessesRemaining][0];
    let imageY = imagePieces[guessesRemaining][1];
    drawImage(imageX, imageY);
}

//Draws the image on the canvas given the appropriate dimensions of where to draw it.
function drawImage(x, y) {
    let pieceHeight = Math.round(canvas.height / 2);
    let pieceWidth = Math.round(canvas.width / 3);

    ctx.drawImage(image, (x * pieceWidth), (y * pieceHeight), pieceWidth, pieceHeight, (x * pieceWidth), (y * pieceHeight), pieceWidth, pieceHeight);
}
//^^^^^^^^^^^^^^^^^^^UNIMPORTANT^^^^^^^^^^^^^^^^^^^^^^//
