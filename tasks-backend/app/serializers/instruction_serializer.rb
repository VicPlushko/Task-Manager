class InstructionSerializer < ActiveModel::Serializer
  attributes :id, :description, :completed

  belongs_to :task
end
