require 'sinatra/base'
require 'sinatra/reloader'
require 'slim'
require 'slim/include'
require 'sass'

require 'digest/sha2'
require_relative 'models/init'

class App < Sinatra::Base
  enable :sessions
  configure :development do
    register Sinatra::Reloader
  end

  post '/api/upload' do
    if params[:file]
      fn = params[:file][:filename]
      dat= params[:file][:tempfile].read
      file_id = FileModel.save(fn, dat).id
      Keywords.save(file_id, keywords) # TODO keywords

      return [200, {}.to_json]
    else
      return [500, {}.to_json]
    end
  end

  post '/api/search' do
    @ranking = Ranking.new.ranking
  end

  get '/api/login' do
    200
  end

  get '/api/register' do
    200
  end
end
