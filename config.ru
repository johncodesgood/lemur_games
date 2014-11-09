
require 'bundler'
Bundler.require

Dir.glob('./{helpers,models,controllers}/*.rb').each do |file|
	require file
	puts "required #{file}"
end

require_relative 'connection.rb'

map('/tictactoe'){ run TicTacToeController }
map('/hangman'){ run HangmanController }
map('/users'){ run UsersController }
map('/sessions'){ run SessionsController }
map('/'){ run WelcomeController }
