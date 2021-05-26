const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const projectSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String },
  website: { type: String },
  github: { type: String },
  description: [String],
  tools: [String],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

projectSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Projects', projectSchema)
