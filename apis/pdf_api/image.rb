require 'net/http'
require 'net/https'
require 'json'
path = "/Users/yamaguchi/Downloads/vax.png"

URL = "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=660d75be90c67448e5bd55d3628a0e7a11c36f08&version=2016-05-20"
uri = URI.parse(URL)
https = Net::HTTP.new(uri.host,uri.port)
https.use_ssl = true
req = Net::HTTP::Post.new(uri, {"accept-encoding": "identity", "accept-language": "ja"})
req.set_form({"images_file" => File.new(path), "threshold" => "0.5"}, "multipart/form-data")
res = https.request(req)
p JSON.parse(res.body)['images'][0]['classifiers'][0]['classes'].collect{|x| x['class']}
