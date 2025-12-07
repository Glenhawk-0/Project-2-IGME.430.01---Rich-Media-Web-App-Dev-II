const models = require('../models');

const { ThisObject } = models; // const  ThisObject  = models.ThisObject;

// 32
const allSpeedrunsPage = (req, res) => res.render('allSpeedruns');
const makerPage = (req, res) => res.render('app');

const makeThisObject = async (req, res) => {
  if (!req.body.game || !req.body.time) {
    return res.status(400).json({ error: 'Both game and time are required' });
  }

  const thisobjectData = {
    game: req.body.game,
    time: req.body.time,
    video: req.body.video || '',
    owner: req.session.account._id,
  };

  try {
    const newThisObject = new ThisObject(thisobjectData);
    await newThisObject.save();
    // return res.json({ redirect: '/maker' });
    return res.status(201).json({
      game: newThisObject.game,
      time: newThisObject.time,
      video: newThisObject.video,

    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'speedrun already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making the submission!' });
  }
};// end makeThisObject

// 33
const getThisObjects = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await ThisObject.find(query).select('game time video').lean().exec();

    return res.json({ thisobjects: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving submissions!' });
  }
};

const getAllThisObjects = async (req, res) => {
  try {
    const docs = await ThisObject.find({})
      .select('game time video owner createdDate')
      .populate('owner', 'username')
      .lean()
      .exec();

    return res.json({ speedruns: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving all submissions!' });
  }
};// endOf getAllThisObject


const deleteSpeedrun = async (req, res) => {
  try {
    const speedrunId = req.params.id;

    // you can only delete your own things 
    const deleted = await ThisObject.findOneAndDelete({
      _id: speedrunId,
      owner: req.session.account._id,
    }).exec();

    if (!deleted) {
      return res.status(404).json({ error: 'Speedrun not found or not authorized.' });
    }

    return res.json({ message: 'Speedrun deleted successfully!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error deleting speedrun.' });
  }
};



module.exports = {
  makerPage,
  makeThisObject,
  getThisObjects,
  getAllThisObjects,
  allSpeedrunsPage,
  deleteSpeedrun,
};
