class AddColumnsToUsers < ActiveRecord::Migration
  def change
    add_column(:users, :hangman_wins, :integer, :default => 0)
    add_column(:users, :tictactoe_wins, :integer, :default => 0)
  end
end
