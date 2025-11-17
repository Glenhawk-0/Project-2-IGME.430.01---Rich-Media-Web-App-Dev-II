const models = require('../models');

const { This_object } = models; // const  This_object  = models.This_object;

// 32
const makerPage = (req, res) => res.render('app');

const makeThis_object = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required' });
  }

  const this_objectData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  try {
    const newThis_object = new This_object(this_objectData);
    await newThis_object.save();
    // return res.json({ redirect: '/maker' });
    return res.status(201).json({ name: newThis_object.name, age: newThis_object.age });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This_object already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making this_object!' });
  }
};// end makeThis_object

// 33
const getThis_objects = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await This_object.find(query).select('name age').lean().exec();

    return res.json({ this_objects: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving this_objects!' });
  }
};

module.exports = {
  makerPage,
  makeThis_object,
  getThis_objects,
};
