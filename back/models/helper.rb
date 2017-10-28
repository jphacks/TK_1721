require 'digest/sha2'

class Helper
  class << self
    def hash ( s )
      Digest::SHA512.hexdigest s
    end
  end
end
