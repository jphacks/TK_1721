class CreateFiles < ActiveRecord::Migration[5.0]
  def change
    create_table :user_file do |t|
      t.string :name
      t.string :username
      t.string :hash
      t.timestamps
    end
  end
end