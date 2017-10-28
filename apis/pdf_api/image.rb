require 'net/http'
require 'net/https'
require 'json'

URL = "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify"
uri = URI.parse(URL)

# first gets
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri.request_uri, 'Content-Type' => 'application/json')
request.body = {api_key: "660d75be90c67448e5bd55d3628a0e7a11c36f08", url: "http://1.bp.blogspot.com/-8_iInJA-VGo/UgSMUzbH8tI/AAAAAAAAXBk/rfI8OGB16n8/s800/sweets_cookie.png", version: "2016-05-20"}.to_json

response = http.request(request)
html = response.body
p html
