const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  name: {type: String, required: true},
  vote: {type: Number, required: true}
});

module.exports = mongoose.model('votes', voteSchema);
