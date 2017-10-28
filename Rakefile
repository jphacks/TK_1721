require 'yaml'
require 'sinatra/activerecord'
require 'sinatra/activerecord/rake'
require 'active_record'
require 'logger'

config = YAML.load_file('config/database.yml')
ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || config[ENV['RACK_ENV']])

# http://qiita.com/foloinfo/items/6ecfe3c5fd1b56f1dceb
task :migrate => :environment do
  ActiveRecord::Migrator.migrate('db/migrate', ENV['VERSION'] ? ENV['VERSION'].to_i : nil)
end

task :seeds do
  require_relative 'db/seeds'
end

task :environment do
  dbconfig = YAML.load_file('config/database.yml')
  ActiveRecord::Base.establish_connection(dbconfig[ENV['ENV']])
  ActiveRecord::Base.logger = Logger.new('db/database.log')
end
