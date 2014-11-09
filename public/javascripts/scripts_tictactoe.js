window.setInterval(function() {checkUpdate()}, 5000);

// window.setTimeout(clearTimeout(timer), 20000);

$(document).ready(function() {
  checkUpdate();
});


// Click button to start new game 
$(function(){
  $(".startnewgame").click(function(e){
  	e.preventDefault();
    var player2 = $(this);
  	newGame(player2);
  })
})

// set up new game (into database) with ajax call
function newGame(player2) {
  playerNumber = 0;
  var opponentUserID = player2.attr("id"); 
  moveNumber = 0;
  myMove = 1;
  $("#my_turn").text("Your Turn!");
  $("#new_game").hide();
  xoro = 0;
  $.ajax({
    method: 'GET',
    url: '/tictactoe/new',
    dataType: 'JSON',
    data: {opponent: opponentUserID}, 
    success: console.log("new game started"),
  });
  
}

// Check if new play in game and update board
function checkUpdate(){
    $.ajax({
      method: 'GET',
      url: '/tictactoe/update',
      dataType: 'JSON',
      success: (function(data) { 
       if (data.x_or_o === 0 || data.x_or_o === 1) {
        updateBoard(data); //create the updated board
        $("#new_game").hide();
        var gameState = data;
        if (data.my_turn === true && data.active !== false) {
          myMove = 1;
          xoro = data.x_or_o;
          $("#my_turn").text("Your Turn!")
        }
        else {
          myMove = 0;
          $("#my_turn").text("Waiting For Their Turn")
        }
        // $("#new_game").hide();
        checkGameOver(gameState);
      }     
      }) // success function
    })
}

function updateBoard(data) {
  for (i=0; i<3; i++) {
    var string = 'div.ttt-right table tbody tr.tr1 #' + i
    $(string).text(data.game_state[i]) 
  }
  for (j=3; j<6; j++) {
    var string = 'div.ttt-right table tbody tr.tr2 #' + j
    $(string).text(data.game_state[j]) 
  }
  for (k=6; k<9; k++) {
    var string = 'div.ttt-right table tbody tr.tr3 #' + k
    $(string).text(data.game_state[k]) 
  }
}

function resetBoard() {
  for (i=0; i<3; i++) {
    var string = 'div.ttt-right table tbody tr.tr1 #' + i
    $(string).text("_") 
  }
  for (j=3; j<6; j++) {
    var string = 'div.ttt-right table tbody tr.tr2 #' + j
    $(string).text("_") 
  }
  for (k=6; k<9; k++) {
    var string = 'div.ttt-right table tbody tr.tr3 #' + k
    $(string).text("_") 
  }
}


$(function(){
  $('td').click(function(e){
    e.preventDefault();
    console.log(myMove);
    if (myMove === 1 && $(this).text() === "_") {

      if (xoro === 0) {
      	$(this).text("X");
      }
      else {
      	$(this).text("O");
      }
      var moveType = $(this).text();
      var location = $(this).attr("id");
      $.ajax({
       method: 'GET',
       url: '/tictactoe/move',
       dataType: 'JSON',
       data: {x_or_o: moveType, position: location},
       success: (function(data) { 
       	var result = data.result;
        checkForEnd(result);
      	}) // success function
  	}) // ajax
  	myMove = 0;
    $("#my_turn").text("Waiting For Their Turn")
  } // if myMove
	})
})


function checkForEnd(result){
  if (result !== "") {
    // $("#my_turn").text("Game Over!");
    if (result === "X") { 
      $("#my_turn").text("X WINS!");
    }
    else if (result === "O") {
      $("#my_turn").text("O WINS!");
    }
    else if (result === "draw") {
      $("#my_turn").text("IT'S A DRAW");
    }
    setTimeout( function() { 
      resetBoard();
      $("#new_game").show(); 
      $("#my_turn").text("");
      }, 2000);
  } 
}

function checkGameOver(gameState){
  if (gameState.active === false) {
    myMove = 0;
    $("#new_game").show();
    if (gameState.x_or_o === 0) { 
      $("#my_turn").text("X WINS!"); 
    }
    else if (gameState.x_or_o === 1) {
      $("#my_turn").text("O WINS!"); 
    }
    else if (gameState.x_or_o === 2) {
      $("#my_turn").text("IT'S A DRAW"); 
    }
    $.ajax({
      method: 'GET',
      url: '/tictactoe/delete',
      dataType: 'JSON',
      data: {id: gameState.id}, 
      success: console.log("game deleted"),
    });
    setTimeout( function() { 
      resetBoard();
      $("#new_game").show();
      $("#my_turn").text(""); 
    }, 2000);

  }

}


// CLick button to manually check for game update
// $(function(){
//   $("#update").click(function(e){
//    e.preventDefault();
//     checkUpdate();
//   })
// })


