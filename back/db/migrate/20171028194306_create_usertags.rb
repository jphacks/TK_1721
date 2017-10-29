class CreateUsertags < ActiveRecord::Migration[5.1]
  def change
    create_table :usertags do |t|
      t.integer :user_id
      t.integer :tag_id
    end
  end
end
