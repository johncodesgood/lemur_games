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
    check_update = TTT.check_update(current_user)
    check_update.to_json  
   end 


  get '/move' do
    x_or_o = params[:x_or_o]
    position = params[:position].to_i
    move_result = TTT.move_result(x_or_o, position, current_user)
    move_result.to_json 
  end

  get '/delete' do
    game_id = params[:id].to_i
    Tictactoe.destroy(game_id)
  end

end