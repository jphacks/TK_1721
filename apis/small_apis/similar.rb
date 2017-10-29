# coding: utf-8

require 'timeout'
require 'uri'
require 'net/http'
require 'net/https'
require 'json'

def word_similarity(word1, word2)
  uri = URI.parse("https://labs.goo.ne.jp/api/similarity")

  # first gets
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true

  request = Net::HTTP::Post.new(uri.request_uri, 'Content-Type' => 'application/json')
  request.body = {app_id: ENV['SIM_APPID'], query_pair: [word1, word2]}.to_json

  response = http.request(request)
  html = response.body
  res = JSON.load(html)["score"]

  return res
end

def similarity(word, tags)
  tags.max_by{|tag| word_similarity(word, tag)}
end
