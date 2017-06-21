const letterHolder = document.getElementById("letterHolder");
let word;
let charArray = [];

function genWord(){
    return Word_List.getRandomWord();
}

function genWordDiv(){
    let word = genWord();
    let wordLength = word.length;

    for(let i=0; i<wordLength; i++){
        let div = document.createElement("div");
        div.id = "letterBox_" + i;
        div.className = "letterBox";

        let curChar = word.charAt(i);
        charArray.push(curChar);

        let letter = document.createElement("div");
        letter.id = "letter_" + curChar;
        letter.className = "letterHidden";
        letter.textContent = curChar;

        letterHolder.append(div);
        div.append(letter);
    }
}

genWordDiv();

//$("#letterHolder").append("<div class='letterBox'         id='"+divID+"'></div>");
