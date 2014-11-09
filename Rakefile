require 'bundler'
Bundler.require
require 'pry'

require 'sinatra/activerecord/rake'
require_relative 'connection.rb'

namespace :db do
  desc "Create database"
  task :create_db do
    conn = PG::Connection.open()
    conn.exec('CREATE DATABASE games;')
    conn.close
  end

  desc "Drop database"
  task :drop_db do
    conn = PG::Connection.open()
    conn.exec('DROP DATABASE games;')
    conn.close
  end
 
 end
