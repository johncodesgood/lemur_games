// hangmanArray = ["--------\n|      |\n|\n|\n|\n|\n=====",
// "--------\n|      O\n|\n|\n|\n|\n=====",
// "--------\n|      O\n|      |\n|\n|\n|\n=====",
// "--------\n|      O\n|     \\|\n|\n|\n|\n=====",
// "--------\n|      O\n|     \\|/\n|\n|\n|\n=====",
// "--------\n|      O\n|     \\|/\n|      |\n|\n|\n=====",
// "--------\n|      O\n|     \\|/\n|      |\n|     /\n|\n=====",
// "--------\n|      O\n|     \\|/\n|      |\n|     / \\\n|\n====="]

hangmanArray = ["--------",
"     |",
"     O",
"     |",
"    / | ",
"    / | \\",
"     /",
"     / \\"]


gameWordChoices = ["h a p p y", "g a m e s", "l e m u r"];
gameLetterPlacement = ["_ _ _ _ _", "_ _ _ _ _", "_ _ _ _ _"];

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

$(document).ready(function() {
  newGame();
});

$(function(){
  $("div.middle #newgame").click(function(){
  	newGame();
  })
})

function newGame() {
	var index = Math.floor(Math.random() * gameWordChoices.length);
	word = gameWordChoices[index];
	answer = gameLetterPlacement[index];
	numWrongGuesses = 0;
	$("div.right #picture").text(hangmanArray[numWrongGuesses]);
  $("div.right #picture1").text("");
  $("div.right #picture2").text("");
  $("div.right #picture3").text("");
  $("div.right #picture4").text("");
	alphabet = "abcdefghijklmnopqrstuvwxyz"
	$("div.middle #word").text(answer);
	for (var i = 0; i < alphabet.length; i++) {
		alphaLetter = alphabet.charAt(i);
		alphaLetterID = "div.left p.hangman-letters #" + alphaLetter;
		$(alphaLetterID).text(alphaLetter);
	}
}

$(function(){
  $('div.left p.hangman-letters a').click(function(e){
    e.preventDefault();
    console.log($(this));
    var letter = $(this).text();
    $(this).text("_");
    guess(letter)
  })
})

function guess(letter) {
  x = 0;
  for (var i = 0; i < word.length; i++) {
    letterWord = word.charAt(i);
    if (letterWord === letter) {
      console.log(letter)
      answer = answer.replaceAt(i, letter);
      $("div.middle #word").text(answer);
      x = 1; //keep track if any letters match in the word
    }
   }
    if (x === 0) { 
      numWrongGuesses += 1
      if (numWrongGuesses === 1 ) { $("div.right #picture1").text(hangmanArray[1]); }
      if (numWrongGuesses === 2 ) { $("div.right #picture2").text(hangmanArray[2]); }
      if (numWrongGuesses === 3 ) { $("div.right #picture3").text(hangmanArray[3]); }
      if (numWrongGuesses === 4 ) { $("div.right #picture3").text(hangmanArray[4]); }
      if (numWrongGuesses === 5 ) { $("div.right #picture3").text(hangmanArray[5]); }
      if (numWrongGuesses === 6 ) { $("div.right #picture4").text(hangmanArray[6]); }
      if (numWrongGuesses === 7 ) { $("div.right #picture4").text(hangmanArray[7]); }
      // $("div.right #picture").text(hangmanArray[numWrongGuesses]);
    }
   checkWinLoss();
}

function checkWinLoss() {
  if (numWrongGuesses === 8) {
    $("div.middle #word").text("You Lost")
      setTimeout(
        function() 
      {
        newGame(); 
      }, 2000);

  }	
  if (answer === word) {
    $("div.middle #word").text("WINNER!")
      setTimeout( function() { newGame(); }, 2000);
      $.ajax({
        method: 'GET',
        url: '/hangman/win',
        dataType: 'JSON',
        success: console.log("won"),
      });

  }
}


