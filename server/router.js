const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // 34
  app.get('/getThis_objects', mid.requiresLogin, controllers.This_object.getThis_objects);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  // this_objectMaker E
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
  //
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.This_object.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.This_object.makeThis_object);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
