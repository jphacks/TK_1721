# coding: utf-8

require 'timeout'
require 'uri'
require 'net/http'
require 'net/https'
require 'json'
require 'pdf-reader'

# titleにタイトル、bodyに本文を入れて
title = gets.chomp
path = gets.chomp

io = open(File.expand_path(path))
reader = PDF::Reader.new(io)

body = ""
reader.pages.each do |page|
  body += page.text
end
body = body.gsub(/(?:\n\r?|\r\n?)/, ' ').split.join(" ")[0..5000]

URL = "https://labs.goo.ne.jp/api/keyword"
uri = URI.parse(URL)

# first gets
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri.request_uri, 'Content-Type' => 'application/json')
request.body = {app_id: '72e29ca055aeaf8bd957c10999f0d2c2eab91163aa990a7b2b905c07f5b34a4b', title: title, body: body, max_num: 20}.to_json

response = http.request(request)
html = response.body
res = JSON.load(html)["keywords"].map{|x| x.keys}.flatten(1)
p res
