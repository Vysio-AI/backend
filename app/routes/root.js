const Router = require('@koa/router');

// Import controllers
const app = require('../controllers/app');
const clients = require('../controllers/clients');
const practitioners = require('../controllers/practitioners');

// Define root
const router = Router({
  prefix: '/api/v1',
});

// Root routes
router.get('/ping', app.ping);

// Clients
router.get('/clients', clients.index);
router.post('/clients', clients.create);
router.get('/clients/:id', clients.get);
router.patch('/clients/:id', clients.update);
router.delete('/clients/:id', clients.destroy);

// Practitioners
router.get('/practitioners', practitioners.index)
router.post('/practitioners', practitioners.create);
router.get('/practitioners/:id', practitioners.get);
router.patch('/practitioners/:id', practitioners.update);
router.delete('/practitioners/:id', practitioners.destroy);
router.get('/practitioners/:id/clients', practitioners.getAllClients);

// Notification settings
router.get('/practitioners/:id/notification-settings', practitioners.getNotificationSettings);
router.patch('/practitioners/:id/notification-settings', practitioners.updateNotificationSettings);

router.get('/clients/:id/notification-settings', clients.getNotificationSettings);
router.patch('/clients/:id/notification-settings', clients.updateNotificationSettings);

module.exports = router