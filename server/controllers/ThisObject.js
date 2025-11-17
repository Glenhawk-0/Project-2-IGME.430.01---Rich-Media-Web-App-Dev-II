const models = require('../models');

const { ThisObject } = models; // const  ThisObject  = models.ThisObject;

// 32
const makerPage = (req, res) => res.render('app');

const makeThisObject = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required' });
  }

  const thisobjectData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  try {
    const newThisObject = new ThisObject(thisobjectData);
    await newThisObject.save();
    // return res.json({ redirect: '/maker' });
    return res.status(201).json({ name: newThisObject.name, age: newThisObject.age });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'ThisObject already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making thisobject!' });
  }
};// end makeThisObject

// 33
const getThisObjects = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await ThisObject.find(query).select('name age').lean().exec();

    return res.json({ thisobjects: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving thisobjects!' });
  }
};

module.exports = {
  makerPage,
  makeThisObject,
  getThisObjects,
};
