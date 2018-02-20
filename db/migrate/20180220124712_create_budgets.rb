class CreateBudgets < ActiveRecord::Migration[5.1]
  def change
    create_table :budgets do |t|
      t.date :target_at
      t.integer :price

      t.timestamps
    end
  end
end
