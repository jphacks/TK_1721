require_relative 'database'
require_relative 'helper'

class UserFileModel
  def self.save(name, dat, author = 'hoge')
    hash = "#{Helper.hash(name + rand().to_s)}#{File.extname(name)}"
    save_path = "./public/#{hash}"
    IO.binwrite(save_path, dat)
    file = UserFile.create!(name: name, username: author, hashfn: hash)
    return [file, save_path]
  end

  def self.find_by_keywords(keywords)
    tag_ids = Tag.where(name: keywords.uniq).map(&:id).uniq
    file_ids = Filetag.where(tag_id: tag_ids).group(:user_file_id).having('COUNT(*) = ?', tag_ids.size).map(&:user_file_id)
    UserFile.where(id: file_ids).uniq
  end
end
