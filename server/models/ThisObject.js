const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const ThisObjectSchema = new mongoose.Schema({
  game: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  time: {
    type: Number,
    min: 0,
    required: true,
  },
    video: {
    type: String,
    trim: true,
    //required: true, // we may not need
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

ThisObjectSchema.statics.toAPI = (doc) => ({
  game: doc.game,
  time: doc.time,
  video: doc.video,
  owner: doc.owner,
});

const ThisObjectModel = mongoose.model('ThisObject', ThisObjectSchema);
module.exports = ThisObjectModel;
