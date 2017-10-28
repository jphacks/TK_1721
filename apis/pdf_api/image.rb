# coding: utf-8

require 'net/http'
require 'net/https'
require 'json'

URL = "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=660d75be90c67448e5bd55d3628a0e7a11c36f08&version=2016-05-20"
uri = URI.parse(URL)
https = Net::HTTP.new(uri.host,uri.port)
https.use_ssl = true
req = Net::HTTP::Post.new(uri, {"accept-encoding": "identity", "accept-language": "ja"})
req.set_form({"url" => "https://watson-developer-cloud.github.io/doc-tutorial-downloads/visual-recognition/fruitbowl.jpg"}, "multipart/form-data")
https.set_debug_output($stdout)
res = https.request(req)
puts "Response #{res.code} #{res.message}: #{res.body}"
