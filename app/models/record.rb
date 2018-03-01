class Record < ApplicationRecord
  validates :sort, presence: true
  validates :price, presence: true
  validates :done_on, presence: true
end
