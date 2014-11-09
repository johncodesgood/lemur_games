
class HangmanController < ApplicationController

  get '/' do
    authenticate!
    erb :"hangman/index"
  end

  get '/win' do
    current_user.hangman_wins += 1
    current_user.save
  end

end