require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/cross_origin'

require 'base64'

require_relative 'models/init'

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
  post '/api/upload.json', provides: :json do
    cross_origin
    params = JSON.parse(request.body.read)["data"]
    fn = params["filename"]
    dat= Base64.decode64(params["file"])
    file_id  = UserFileModel.save(fn, dat).id
    keywords = ['hoge', 'fuga']
    KeywordModel.save(file_id, keywords) # TODO keywords

    return [200, {}.to_json]
  end

  post '/api/search.json', provides: :json do
    cross_origin
    params = JSON.parse(request.body.read)["data"]
    {files: UserFileModel.find_by_keywords(params["keywords"]).map(&:attributes)}.to_json
  end

  post '/api/login.json' do
    cross_origin
    [200, {uid: 'hoge'}.to_json]
  end

  post '/api/register.json' do
    cross_origin
    [200, {uid: 'hoge'}.to_json]
  end
end
