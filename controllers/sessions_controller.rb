class SessionsController < ApplicationController

  get '/login' do
    erb :'sessions/new'
  end

  post '/' do
    user = User.find_by({username: params[:username]})
    if user && user.password == params[:password]
      session[:current_user] = user.id
      redirect '/users/profile'
    else
      redirect '/sessions/login'
    end
  end

  get '/logout' do
    session[:current_user] = nil
    redirect '/'
  end

end
