class AddUserToNote < ActiveRecord::Migration[5.2]
  def up
    change_table :notes do |t|
      t.belongs_to :user, :index => true
    end
  end
 
  def down
    remove_column :user
  end
end
