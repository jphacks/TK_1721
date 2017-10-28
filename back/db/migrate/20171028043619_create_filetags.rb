class CreateFiletags < ActiveRecord::Migration[5.0]
  def change
    create_table :filetags do |t|
      t.integer :user_file_id
      t.integer :tag_id
    end
  end
end
