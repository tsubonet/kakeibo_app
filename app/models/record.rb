class Record < ApplicationRecord
  #belongs_to :user
  validates :sort, presence: true
  validates :price, presence: true
  validates :done_on, presence: true

end
