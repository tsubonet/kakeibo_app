class CreateRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :records do |t|
      t.string :item
      t.integer :price
      t.date :done_on

      t.timestamps
    end
  end
end
