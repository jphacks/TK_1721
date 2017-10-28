require_relative 'database'
require_relative 'helper'

class UserFileModel
  def self.save(name, dat, author = 'hoge')
    hash = "#{Helper.hash(name + rand().to_s)}#{File.extname(name)}"
    save_path = "./public/#{hash}"
    IO.binwrite(save_path, dat)
    file = UserFile.create!(name: name, username: author, hashfn: hash)
    return file
  end

  def self.find_by_keywords(keywords)
    Filetag.joins(:tag).where(tags: {name: keywords}).map{|fts| fts.user_file}.uniq
  end
end
