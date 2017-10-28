require_relative 'database'

class KeywordModel
  def self.save(file_id, keywords)
    exist_tags = Tag.where(name: keywords)
    new_kws = keywords - exist_tags.map(&:name)
    new_tags = Tag.create!( new_kws.map{|kw| {name: kw}} )

    ids = (exist_tags + new_tags).map(&:id)
    ids.each do |tag_id|
      Filetag.create!(user_file_id: file_id, tag_id: tag_id)
    end

    true
  end
end
