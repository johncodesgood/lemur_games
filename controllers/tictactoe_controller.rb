require 'pry'

class TicTacToeController < ApplicationController

  get '/' do
    authenticate!
    @users = User.all
    erb :"tictactoe/index"
  end

  get '/new' do
    # winner = ""
    opponent = params[:opponent]
    game_state = ["_","_","_","_","_","_","_","_","_"]
    move_number = 0
    player_turn = 0
    game = Tictactoe.create({
      player1_ID: current_user.id,
      player2_ID: opponent,
      game_state: game_state,
      move_number: move_number,
      player_turn: player_turn,
      my_turn: false,
      x_or_o: 0, 
      active: 1,
    })
  end

  get '/update' do
    authenticate!
    @current_game = true 
    if Tictactoe.find_by(player1_ID: current_user.id)
      game = Tictactoe.find_by(player1_ID: current_user.id)
      current_player = 1
    elsif Tictactoe.find_by(player2_ID: current_user.id)
      game = Tictactoe.find_by(player2_ID: current_user.id)
      current_player = 2
    else
      @current_game = false
    end
    if @current_game == true
      if game.active != false
        if (current_user.id == game.player1_ID) && (game.player_turn == 0) # I'm player 1 and it's my turn
          game.my_turn = true
          game.x_or_o = 0
        elsif (current_user.id == game.player2_ID) && (game.player_turn == 1) # I'm player 2 and it's my turn
         game.my_turn = true
         game.x_or_o = 1
        else
        game.my_turn = false
        end
      else
        if current_player == 1
         game.update({player1_ID: -1})
        else
         game.update({player2_ID: -1})
        end
      end
    else
      game = ({x_or_o: -1}) # signal to tell js that game isn't active
    end  
    game.to_json  
   end 

  get '/move' do
    x_or_o = params[:x_or_o]
    position = params[:position].to_i
    # player = params[:player]
    if Tictactoe.find_by(player1_ID: current_user.id)
      game = Tictactoe.find_by(player1_ID: current_user.id)
      current_player = 1
    else
      game = Tictactoe.find_by(player2_ID: current_user.id)
      current_player = 2
    end
    state = game.game_state 
    move_number = game.move_number
    player_turn = game.player_turn
    state[position] = x_or_o
    move_number += 1
    player_turn = (player_turn + 1) % 2 
    game.update({game_state: state, move_number: move_number, player_turn: player_turn})
    result = ""
    if (  (state[0] == "X" && state[1] == "X" && state[2] == "X") ||
          (state[3] == "X" && state[4] == "X" && state[5] == "X") ||
          (state[6] == "X" && state[7] == "X" && state[8] == "X") ||
          (state[0] == "X" && state[3] == "X" && state[6] == "X") ||
          (state[1] == "X" && state[4] == "X" && state[7] == "X") ||
          (state[2] == "X" && state[5] == "X" && state[8] == "X") ||
          (state[0] == "X" && state[4] == "X" && state[8] == "X") ||
          (state[2] == "X" && state[4] == "X" && state[6] == "X")    )
      result = "X"
      player1 = User.find_by(id: game.player1_ID)
      ttt_wins = player1.tictactoe_wins
      ttt_wins += 1
      player1.update({tictactoe_wins: ttt_wins})  # put win in player 1's user table 
      if current_player == 1
        game.update({active: 0, x_or_o: 0, player1_ID: -1}) # deactivate game and remove your player ID
      else
        game.update({active: 0, x_or_o: 0, player2_ID: -1})
      end  
    elsif (  (state[0] == "O" && state[1] == "O" && state[2] == "O") ||
          (state[3] == "O" && state[4] == "O" && state[5] == "O") ||
          (state[6] == "O" && state[7] == "O" && state[8] == "O") ||
          (state[0] == "O" && state[3] == "O" && state[6] == "O") ||
          (state[1] == "O" && state[4] == "O" && state[7] == "O") ||
          (state[2] == "O" && state[5] == "O" && state[8] == "O") ||
          (state[0] == "O" && state[4] == "O" && state[8] == "O") ||
          (state[2] == "O" && state[4] == "O" && state[6] == "O")    ) 
      result = "O"
      player2 = User.find_by(id: game.player2_ID)
      ttt_wins = player2.tictactoe_wins
      ttt_wins += 1
      player2.update({tictactoe_wins: ttt_wins})  # put win in player 2's user table 
      game.update({active: 0, x_or_o: 1}) # deactivate game

    elsif (move_number == 9)
      result = "draw"
      game.update({active: 0, x_or_o: 2}) # "2" means a draw
    end

    data = {result: result}
    data.to_json 
  end

  get '/delete' do
    game_id = params[:id].to_i
    Tictactoe.destroy(game_id)
  end

end