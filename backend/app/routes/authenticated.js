const Router = require('@koa/router');

// Import controllers
const clients = require('../controllers/clients');
const practitioners = require('../controllers/practitioners');
const signups = require('../controllers/signups');
const protocols = require('../controllers/protocols');

// Import middlewares
const m = require('../middlewares/index');

// Define root
const router = Router({
  prefix: '/api/v1',
});

// Clients
router.get('/clients', m.checkToken, m.setUser, clients.index);
router.get('/clients/:id', m.checkToken, m.setUser, clients.get);
router.patch('/clients/:id', m.checkToken, m.setUser, clients.update);
router.delete('/clients/:id', m.checkToken, m.setUser, clients.destroy);

// Practitioners
router.get('/practitioners', m.checkToken, m.setUser, practitioners.index)
router.get('/practitioners/:id', m.checkToken, m.setUser, practitioners.get);
router.patch('/practitioners/:id', m.checkToken, m.setUser, practitioners.update);
router.delete('/practitioners/:id', m.checkToken, m.setUser, practitioners.destroy);
router.get('/practitioners/:id/clients', m.checkToken, m.setUser, practitioners.getAllClients);

// Notification settings
router.get('/practitioners/:id/notification-settings', m.checkToken, m.setUser, practitioners.getNotificationSettings);
router.patch('/practitioners/:id/notification-settings', m.checkToken, m.setUser, practitioners.updateNotificationSettings);

router.get('/clients/:id/notification-settings', m.checkToken, m.setUser, clients.getNotificationSettings);
router.patch('/clients/:id/notification-settings', m.checkToken, m.setUser, clients.updateNotificationSettings);

// Signups
router.post('/practitioners/signup', m.checkToken, m.setUser, signups.signupPractitioner);
router.post('/clients/signup', m.checkToken, m.setUser, signups.signupClient);

// Protocols
router.post('/protocols', m.checkToken, m.setUser, protocols.create);
router.get('/protocols/:id', m.checkToken, m.setUser, protocols.get);
router.post('/protocols/:id', m.checkToken, m.setUser, protocols.update);
router.delete('/protocols/:id', m.checkToken, m.setUser, protocols.destroy);

module.exports = router
