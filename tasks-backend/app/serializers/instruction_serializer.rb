class InstructionSerializer < ActiveModel::Serializer
  attributes :id, :description, :completed
end
