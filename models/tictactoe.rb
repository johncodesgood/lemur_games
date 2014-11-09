class Tictactoe < ActiveRecord::Base
  serialize :game_state

end