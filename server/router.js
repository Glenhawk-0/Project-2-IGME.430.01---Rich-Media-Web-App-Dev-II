const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // 34
  app.get('/getThisObjects', mid.requiresLogin, controllers.ThisObject.getThisObjects);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  // thisobjectMaker E
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
  //
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.ThisObject.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.ThisObject.makeThisObject);

  // final
  app.get('/allSpeedruns', mid.requiresLogin, controllers.ThisObject.allSpeedrunsPage);

  app.get('/getAllThisObjects', mid.requiresLogin, controllers.ThisObject.getAllThisObjects);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);


  //premium 
  app.post('/togglePremium', mid.requiresLogin, controllers.Account.togglePremium);
  app.get('/getAccount', mid.requiresLogin, controllers.Account.getAccount);


};

module.exports = router;
