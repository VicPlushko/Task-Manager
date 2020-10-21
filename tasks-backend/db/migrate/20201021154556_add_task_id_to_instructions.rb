class AddTaskIdToInstructions < ActiveRecord::Migration[6.0]
  def change
    add_column :instructions, :task_id, :integer
  end
end
