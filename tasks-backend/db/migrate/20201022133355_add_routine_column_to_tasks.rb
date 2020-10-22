class AddRoutineColumnToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :routine, :string
  end
end
