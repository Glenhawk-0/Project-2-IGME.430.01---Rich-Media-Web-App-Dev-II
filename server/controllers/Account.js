const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are requried' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);// ?
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();// ?
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/maker' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

// ThisObjectMakerE

const changePassword = async (req, res) => {
  const { username } = req.session.account;
  const currentPass = `${req.body.currentPass}`;
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  if (!currentPass || !newPass || !newPass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (newPass !== newPass2) {
    return res.status(400).json({ error: 'New passwords do not match!' });
  }

  // look at current password
  return Account.authenticate(username, currentPass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong current password!' });
    }

    try {
    // Find the user info
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
    // used for findByID
      const user = await Account.findById(req.session.account._id).exec();
      if (!user) {
        return res.status(404).json({ error: 'Account not found!' });
      }

      // new password
      const hash = await Account.generateHash(newPass);
      user.password = hash;
      await user.save();

      return res.status(200).json({ message: 'Password changed successfully!' });
    } catch (err2) {
      console.log(err2);
      return res.status(500).json({ error: 'An error occurred while changing password!' });
    }
  });
};// end of changePassword

const togglePremium = async (req, res) => {
  try {
    const account = await Account.findById(req.session.account._id).exec();

    account.premium = !account.premium;
    await account.save();

    req.session.account.premium = account.premium;

    return res.json({ premium: account.premium });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Couldnt Toggle premium status' });
  }
};


//get account for premium 
const getAccount = (req, res) => {
  try {
    // If user not logged in  then dont bother. 
    if (!req.session || !req.session.account) {
      return res.json({ 
          account: null 
        });
    }

    return res.json({ account: req.session.account });
  } catch (err) {
    console.error('getAccount error', err);
    return res.status(500).json({ error: 'Could not get account' });
  }
}

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  changePassword,
  togglePremium,
getAccount,
};
