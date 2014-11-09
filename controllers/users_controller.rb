require 'pry'

class UsersController < ApplicationController

  get '/' do
    redirect 'users/profile'
  end

  get '/new' do
    erb :"users/new"
  end
  post '/' do
    user = User.new(params[:user])
    user.password = params[:password]
    user.save!
    redirect "/users/profile"
  end

  get '/profile' do
    authenticate!
    erb :'users/profile'
  end

  get '/profile/:id' do
    @user = User.find_by({id: params[:id]})
    erb :'users/profile_public'
  end

  get '/console' do
    binding.pry
  end

end