require_relative 'database'
require_relative 'helper'

class FileModel
  def self.save(name, path, author = 'hoge')
    hash = "#{hash(fn + rand())}.#{File.extname(fn)}"
    save_path = "./public/images/#{hash}"
    IO.binwrite(save_path, dat)
    file = File.create!(name: name, username: author, hash: hash)
    return file
  end

  def self.find_by_keywords(keywords)
    Filetags.where(name: keywords).map{|fts| fts.files}
  end
end
