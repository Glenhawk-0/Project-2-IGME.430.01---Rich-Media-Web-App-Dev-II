const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const This_objectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
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

This_objectSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

const This_objectModel = mongoose.model('This_object', This_objectSchema);
module.exports = This_objectModel;
