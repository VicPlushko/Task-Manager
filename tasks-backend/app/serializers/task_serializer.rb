class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :completed

  has_many :instructions
end
