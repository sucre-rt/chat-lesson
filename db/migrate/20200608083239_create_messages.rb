class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
			t.text :content
      t.bigint :user_id, foreign_key: true
      t.bigint :group_id, foreign_key: true
      t.timestamps
    end
  end
end
