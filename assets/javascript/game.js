//Sets all variables for the game.
var wins = 0;
var losses = 0;
var guessLeft = 10;
var attempts = [];
var computerChoices = ["Doug", "Roger", "Skeeter", "Norbert", "Dagget", "Rocko", "Heffer", "Filbert", "Stimpy", "Ren", "Aang", "Katara", "Toph", "Sokka", "Gir", "Zim", "Dib", "Timmy", "Cosmo", "Wanda"];
var charPictures = ["assets/images/Doug.png", "assets/images/Roger.jpg", "assets/images/Skeeter.jpg", "assets/images/Norbert.jpg", "assets/images/Dagget.jpg", "assets/images/Rocko.jpg", "assets/images/Heffer.jpg", "assets/images/Filbert.jpg", "assets/images/Stimpy.png", "assets/images/Ren.jpg", "assets/images/Aang.jpg", "assets/images/Katara.jpg", "assets/images/Toph.jpg", "assets/images/Sokka.jpg", "assets/images/Gir.png", "assets/images/Zim.png", "assets/images/Dib.png", "assets/images/Timmy.png", "assets/images/Cosmo.png", "assets/images/Wanda.png"];
var spaceArr = [];
var space = "";
var compWordArr = [];
var compCheck = "";
var Game = 0;
var playerTries = 0;
var imgLocation = 0;
var imgPresent = false;


// Generates a random word from the array as the Computer's Choice and turns it into its own array. Then grabs the location to get the image if player wins.
function computerWord() {

  var location = Math.floor(Math.random() * computerChoices.length);

  var compWord = computerChoices[location];
  imgLocation = location;

  for (i = 0; i < compWord.length; i++)
  {
    var letterAt = compWord.charAt(i);
    compWordArr.push(letterAt);
  }
  return compWord;
};

//Creates the spaces for the chosen word to be displayed.

function wordSpace(x)
{
  for (j = 0; j < x.length; j++) 
  {
    spaceArr.push("_");
  }
};

//Displays the Space Array. All "_" when unguessed or with letters as they are guessed
function dispArr() 
{
  for (l = 0; l < spaceArr.length; l++) 
  {
    space = space + " " + spaceArr[l];
  }
  return space;
};

// Checks the answer vs the computer word. If the letter is in the word it returns true and shows it. If not then it returns false. 
function checkAnswer(x) 
{
  var foundIt = false;
  var guess = x.toString();

  for (e = 0; e < compWordArr.length; e++) 
  {
    compCheck = compWordArr[e].toString();
    compCheck = compCheck.toLowerCase();
  
    if (guess == compCheck) 
    {
      spaceArr.splice(e, 1, compWordArr[e]);
      foundIt = true;
    }
  }
  return foundIt;
};

// Displays all answers made by player

function showGuesses(x) 
{
  var guessesString = " ";

  for (i = 0; i < x.length; i++) 
  {
    guessesString = guessesString + " " + x[i];
  }
  return guessesString;
};

//Displays image if word is guessed correctly

function dispImg()
{
  var img = document.createElement("img");
  img.src = charPictures[imgLocation];

  var src = document.getElementById("charImg");
  src.appendChild(img);
  img.setAttribute("id","character");
};

//Removes Image

function removeImg()
{
  var img = document.getElementById("character");
  img.parentNode.removeChild(img);
};

// Checks if player has won by checking if spaceArray is full to determine if the player won. Also checks if an image is present and removes it if needed.
function checkWin()
{
  if (spaceArr.includes("_")) 
  {
    if(imgPresent)
    {
    removeImg();
    imgPresent = false;
    }
    return true;
  } else
  {
    dispImg();
    imgPresent = true;
    return false;
  };
};

// Function that displays the Basic text and wins/losses/guesses

function displayAll() 
{
  space = "";
  space = dispArr();
  document.getElementById("computer").textContent = "Keep guessing...";
  document.getElementById("win").textContent = "Wins: " + wins;
  document.getElementById("lose").textContent = "Losses: " + losses;
  document.getElementById("spaces").textContent = space;
  document.getElementById("tries").textContent = "You have " + guessLeft + " left.";
  document.getElementById("guesses").textContent = "Your guesses: " + showGuesses(attempts);
};

//Resets the tries and attempts to start a new game.

function resetIt() 
{
  guessLeft = 10;
  attempts = [];
  spaceArr = [];
  compWordArr = [];

};

// Starts a new game

function newGame() 
{
  // Calls the Computer Guess function to generate the letter to be guessed.
  var compGuess = computerWord();
  wordSpace(compGuess);

  // Listens for player input and begins the game.
  document.onkeyup = function (event) 
  {
    
    // Logs the Key pressed by the player.
    var playerGuess = event.key;
    
    // Verifies if the key has been pushed before and if it is a valid letter key. If it has then nothing happens. If the player hasn't used the letter yet, it continues the game.
    if ((attempts.includes(playerGuess) === false) && (playerGuess >= "a") && (playerGuess <= "z")) 
    {
      attempts.push(playerGuess);

      // Checks wether to player's answer is correct.
      if (checkAnswer(playerGuess)) 
      {
        displayAll();
      }
      else 
      {
        guessLeft--;
        displayAll();
      };
      
      // Checks if the player won by verifying if there are no spaces left in the array
      
      if (!checkWin()) 
      {
        wins++;
        document.getElementById("computer").textContent = "Congratulations! You win! Press a key to play again.";
        resetIt();
        newGame();
      } else if (guessLeft === 0) 
      {
        losses++;
        document.getElementById("computer").textContent = "Aww looks like you didn't guess the word. It was: " + compGuess + " Press a key to play again.";
        resetIt();
        newGame();
      }
      playerTries++;
    }
  }
};

Game = newGame();

