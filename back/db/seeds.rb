require_relative '../models/database'
User.create!(name: 'anonymous', pass: nil, disabled: false)
Problem.create!(title: 'dummy problem', point:0, disabled: true)
