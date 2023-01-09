const mongoose = require("mongoose")
const Schema = mongoose.Schema

const articleModel = new Schema({
  title: {
    type: String,
    required: true,
    unique: [true, 'Title must be unique']
  },
  author: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ['Draft', 'Published'],
    defualt: "Draft"
  },
  read_count: {
    type: Number,
    defualt: 1
  }, 
  reading_time: {
    type: Number,
    defualt: 1
  },
  tags: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    defualt: Date.now
  }
})

module.exports = mongoose.model("articles", articleModel)