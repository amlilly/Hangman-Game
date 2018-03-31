// GLOBAL VARIABLES
// --------------------------------------------------------------------
// Arrays and Variables for holding data
var wordOptions = ["minneapolis", "minnehaha", "wild", "vikings", "twins", "timberwolves", "loon", "honeycrisp", "mississippi", "itasca", "duluth", "lakes",];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; // For example minneapolis = m _ _ _ _ _ _ _ _ _ _
var wrongLetters = [];

// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// FUNCTIONS (Reusable blocks of code that I will call upon when needed)
// --------------------------------------------------------------------

function startGame () {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    // Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // Populate blanks and success with right number of blanks.
    for (var i=0; i<numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    // Change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    // Testing / Debugging
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
    // Check if letter exists in code at all

    var isLetterInWord = false;
    for (var i=0; i<numBlanks; i++){
        if(selectedWord[i] == letter) {
            isLetterInWord = true;
            //alert("Letter found");
        }
    }

    // Check where in word letter exists, then populate out blanksAndSuccesses array.
    if(isLetterInWord) {
        for (var i=0; i<numBlanks; i++) {
            if(selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }

    // Letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    // Testing and Debugging
    console.log(blanksAndSuccesses);

}

function roundComplete(){
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);

    // Update the HTML to reflect the most recent count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    // Check if user won
    if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You Won!");

        // Update the win counter in the HTML
        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    }

    // Check if user lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You lost!");

        // Update the HTML
        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();
    }
}

// MAIN PROCESS 
// --------------------------------------------------------------------

// Initiates the code the first time
startGame();

// Register keyclicks

document.onkeyup = function(event) {
    // Determines which key was pressed.
    var userKeystroke = event.key;
    // Only run the following code block if the user presses an a-z. I know there is a more efficient way to do this
    if ((userKeystroke === "a") || (userKeystroke === "b") || (userKeystroke === "c") || (userKeystroke === "d") || (userKeystroke === "e") || (userKeystroke === "f") || (userKeystroke === "g") || (userKeystroke === "h") || (userKeystroke === "i") || (userKeystroke === "j") || (userKeystroke === "k") || (userKeystroke === "l") || (userKeystroke === "m") || (userKeystroke === "n") || (userKeystroke === "o") || (userKeystroke === "p") || (userKeystroke === "q") || (userKeystroke === "r") || (userKeystroke === "s") || (userKeystroke === "t") || (userKeystroke === "u") || (userKeystroke === "v") || (userKeystroke === "w") || (userKeystroke === "x") || (userKeystroke === "y") || (userKeystroke === "z")) {
        var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
        checkLetters(letterGuessed);
        roundComplete();
        

        // Testing / Debugging
        console.log(letterGuessed);
    }
}