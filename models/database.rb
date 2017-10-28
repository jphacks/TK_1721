require 'active_record'
require 'yaml'
config = YAML.load_file('config/database.yml')
ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || config[ENV['RACK_ENV']])

class File < ActiveRecord::Base
  has_many :filetags

  #validates :name, format: { with: /\A(?:\w| |\p{Hiragana}|\p{Katakana}|[ー－]|[一-龠々])+\z/, message: 'ひらがな、カタカナ、漢字、英数字のみが使用できます。'}
  #validates :name, uniqueness: { case_sensitive: false, message: 'このユーザ名はすでに使われています。' }
end

class Tag < ActiveRecord::Base
  has_one :filetag
end

class Filetag < ActiveRecord::Base
  belongs_to :file
  belongs_to :tag
end
