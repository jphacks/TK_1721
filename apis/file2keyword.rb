# coding: utf-8

require 'timeout'
require 'uri'
require 'net/http'
require 'net/https'
require 'json'
require 'docx'
require 'nkf'

def file2keyword(title, path)
  body = ""
  ext = File.extname(path)

  if ext==".pdf" then
    body += `pdftotext #{File.expand_path(path)} -`
  elsif ext == ".docx" then
    doc = Docx::Document.open(File.expand_path(path))
    doc.paragraphs.each do |page|
      body += page.text
    end
  elsif ext == ".txt" then
    File.open(File.expand_path(path)) do |f|
      body += f.read
    end
  elsif ext == ".jpg" || ext == ".png" || ext == ".JPG" then
    uri = URI.parse("https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=660d75be90c67448e5bd55d3628a0e7a11c36f08&version=2016-05-20")
    https = Net::HTTP.new(uri.host,uri.port)
    https.use_ssl = true

    req = Net::HTTP::Post.new(uri, {"accept-encoding": "identity", "accept-language": "ja"})
    req.set_form({"images_file" => File.new(path), "threshold" => "0.5"}, "multipart/form-data")
    res = https.request(req)
    return JSON.parse(res.body)['images'][0]['classifiers'][0]['classes'].collect{|x| x['class']}
  else
    return [title]
  end

  body = body.encode("euc-jp", NKF.guess(body).name, undef: :replace, invalid: :replace, replace: '').encode("UTF-8", undef: :replace, invalid: :replace, replace: '')
  body = body.gsub(/[^[:word:]]+/,' ')
  bodies = body.gsub(/(\n\r|\r\n)/, ' ').scan(/.{500}/)
  bodies.map do |body|
    url = "https://labs.goo.ne.jp/api/keyword"
    uri = URI.parse(url)

    # first gets
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(uri.request_uri, 'Content-Type' => 'application/json')
    request.body = {app_id: ENV['GOO_APPID'] || '72e29ca055aeaf8bd957c10999f0d2c2eab91163aa990a7b2b905c07f5b34a4b', title: title, body: body, max_num: 20}.to_json

    response = http.request(request)
    next [] if response.code.to_i != 200
    html = response.body
    res = JSON.load(html)["keywords"].map{|x| x.keys}.flatten(1) rescue []
  end.uniq.flatten(1)
end
