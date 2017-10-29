require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/cross_origin'

require 'base64'
require_relative '../apis/file2keyword'

require_relative 'models/init'
require_relative 'models/helper'

class App < Sinatra::Base
  configure do
    register Sinatra::CrossOrigin
    enable :sessions
    enable :cross_origin
  end
  configure :development do
    register Sinatra::Reloader
  end

  options '/*' do
    cross_origin
  end
  post '/api/upload', provides: :json do
    cross_origin
    params = JSON.parse(request.body.read)["data"]
    fn = params["filename"]
    dat= Base64.decode64(params["file"])
    uf, fpath = UserFileModel.save(fn, dat)
    file_id = uf.id
    keywords = file2keyword(fn, fpath)
    keywords << 'hoge'
    p keywords
    KeywordModel.save(file_id, keywords)

    return [200, {}.to_json]
  end

  post '/api/search', provides: :json do
    cross_origin
    params = JSON.parse(request.body.read)["data"]
    {files: UserFileModel.find_by_keywords(params["keywords"]).map(&:attributes)}.to_json
  end

  post '/api/login' do
    cross_origin
    params = JSON.parse(request.body.read)["data"]
    if User.find_by(email: params["email"]).nil?
      [404, {}.to_json]
    else
      user = User.find_by(email: params["email"])
      if user.password == Helper.hash(params["password"])
        session[:user_id] = user.id
        [200, {id: user.id}.to_json]
      else
        [404, {}.to_json]
      end
    end
  end

  get '/api/ping' do
    if session[:user_id].nil?
      [404, {}.to_json]
    else
      [200, {id: session[:user_id]}.to_json]
    end
  end

  get '/api/demo' do
    cross_origin
    session[:user_id] = -1
    [200, {id: -1}.to_json]
  end

  post '/api/register' do
    cross_origin
    params = JSON.parse(request.body.read)["data"]
    if User.find_by(email: params["email"]).nil?
      user = User.create!(email: params["email"], password: Helper.hash(params["password"]))
      session[:user_id] = user.id
      [200, {id: user.id}.to_json]
    else
      [409, {}.to_json]
    end
  end

  get '/api/logout' do
    session[:user_id] = nil
    [200, {}.to_json]
  end
end
