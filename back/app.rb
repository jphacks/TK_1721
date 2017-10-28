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

  post '/api/upload', provides: :json do
    params = JSON.parse request.body.read
    p params
    fn = params["filename"]
    dat= params["file"]
    file_id  = UserFileModel.save(fn, dat).id
    keywords = ['hoge', 'fuga']
    KeywordModel.save(file_id, keywords) # TODO keywords

    return [200, {}.to_json]
  end

  post '/api/search', provides: :json do
    params = JSON.parse request.body.read
    {files: UserFileModel.find_by_keywords(params["keywords"]).map(&:attributes)}.to_json
  end

  post '/api/login' do
    [200, {uid: 'hoge'}.to_json]
  end

  post '/api/register' do
    [200, {uid: 'hoge'}.to_json]
  end
end
