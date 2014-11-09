class CreateTictactoeTable < ActiveRecord::Migration
  def change
    create_table :tictactoes do |t|
      t.integer :player1_ID
      t.integer :player2_ID
      t.string :game_state
      t.integer :move_number
      t.integer :player_turn
      t.boolean :my_turn
      t.integer :x_or_o
      t.boolean :active
    end
  end
end
