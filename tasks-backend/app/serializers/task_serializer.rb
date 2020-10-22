class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :routine, :completed

  has_many :instructions
end
