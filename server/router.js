const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // DataAPI
  app.get('/getThisObjects', mid.requiresLogin, controllers.ThisObject.getThisObjects);
  app.get('/getAllThisObjects', mid.requiresLogin, controllers.ThisObject.getAllThisObjects);

  // Authentition
  app.get('/login', mid.requiresSecure, mid.requiresLogout, (req, res) => {
    res.render('login', { account: req.session.account || {} });
  });
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // Premium toggle
  app.post('/togglePremium', mid.requiresLogin, controllers.Account.togglePremium);

  // PasswordChange
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);

  // Pages
  app.get('/maker', mid.requiresLogin, (req, res) => {
    res.render('app', { account: req.session.account });
  });

  app.get('/allSpeedruns', mid.requiresLogin, (req, res) => {
    res.render('allSpeedruns', { account: req.session.account });
  });

  // Root
  app.get('/', mid.requiresSecure, mid.requiresLogout, (req, res) => {
    res.render('login', { account: req.session.account || {} });
  });
};

module.exports = router;
