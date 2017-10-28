require 'active_record'
require 'yaml'
config = YAML.load_file('config/database.yml')
ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || config[ENV['RACK_ENV']])

class UserFile < ActiveRecord::Base
  has_many :filetags
end

class Tag < ActiveRecord::Base
  has_one :filetag
end

class Filetag < ActiveRecord::Base
  belongs_to :user_file
  belongs_to :tag
end
