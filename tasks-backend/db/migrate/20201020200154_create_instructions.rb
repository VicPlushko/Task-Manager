class CreateInstructions < ActiveRecord::Migration[6.0]
  def change
    create_table :instructions do |t|
      t.string :description
      t.boolean :completed

      t.timestamps
    end
  end
end
