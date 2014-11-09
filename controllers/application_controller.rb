class ApplicationController < Sinatra::Base

  helpers Sinatra::AuthenticationHelper

  enable :sessions, :method_override

  set :views, File.expand_path("../../views", __FILE__)
  set :public_folder, File.expand_path("../../public", __FILE__)
  
end