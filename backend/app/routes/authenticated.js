const Router = require('@koa/router');

// Import controllers
const {
  signups,
  organizations,
  clients,
  practitioners,
  protocols,
  exercises,
  sessions,
  sessionFrames,
  flags,
  videos
} = require('../controllers/main');

// Import middlewares
const m = require('../middlewares/index');

// Define root
const router = Router({
  prefix: '/api/v1',
});

// Signup status
router.get('/signup-status', m.checkToken, m.setUser, signups.signupStatus);

// Organizations
router.get('/organizations', m.checkToken, m.setUser, organizations.index);
router.get('/organizations/:id', m.checkToken, m.setUser, organizations.get);
router.patch('/organizations/:id', m.checkToken, m.setUser, organizations.update);
router.delete('/organizations/:id', m.checkToken, m.setUser, organizations.destroy);
router.get('/organizations/:id/practitioners', m.checkToken, m.setUser, organizations.getAllPractitioners);

// Clients
router.get('/clients', m.checkToken, m.setUser, clients.index);
router.get('/clients/:id', m.checkToken, m.setUser, clients.get);
router.patch('/clients/:id', m.checkToken, m.setUser, clients.update);
router.delete('/clients/:id', m.checkToken, m.setUser, clients.destroy);
router.get('/clients/:id/protocols', m.checkToken, m.setUser, clients.getAllProtocols);
router.get('/clients/:id/sessions', m.checkToken, m.setUser, clients.getAllSessions);

// Practitioners
router.get('/practitioners', m.checkToken, m.setUser, practitioners.index);
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
router.patch('/protocols/:id', m.checkToken, m.setUser, protocols.update);
router.delete('/protocols/:id', m.checkToken, m.setUser, protocols.destroy);
router.get('/protocols/:id/exercises', m.checkToken, m.setUser, protocols.getAllExercises);
router.get('/protocols/:id/sessions', m.checkToken, m.setUser, protocols.getAllSessions);

// Exercises
router.post('/exercises', m.checkToken, m.setUser, exercises.create);
router.get('/exercises/:id', m.checkToken, m.setUser, exercises.get);
router.patch('/exercises/:id', m.checkToken, m.setUser, exercises.update);
router.delete('/exercises/:id', m.checkToken, m.setUser, exercises.destroy);

// Sessions
router.get('/sessions', m.checkToken, m.setUser, sessions.index);
router.post('/sessions', m.checkToken, m.setUser, sessions.create);
router.get('/sessions/:id', m.checkToken, m.setUser, sessions.get);
router.patch('/sessions/:id', m.checkToken, m.setUser, sessions.update);
router.delete('/sessions/:id', m.checkToken, m.setUser, sessions.destroy);
router.get('/sessions/:id/session-frames', m.checkToken, m.setUser, sessions.getAllSessionFrames);
router.get('/sessions/:id/flags', m.checkToken, m.setUser, sessions.getAllFlags);

// Session Frames
router.post('/session-frames', m.checkToken, m.setUser, sessionFrames.create);
router.get('/session-frames/:id', m.checkToken, m.setUser, sessionFrames.get);
router.patch('/session-frames/:id', m.checkToken, m.setUser, sessionFrames.update);
router.delete('/session-frames/:id', m.checkToken, m.setUser, sessionFrames.destroy);

// Flags
router.post('/flags', m.checkToken, m.setUser, flags.create);
router.get('/flags/:id', m.checkToken, m.setUser, flags.get);
router.post('/flags/:id', m.checkToken, m.setUser, flags.update);
router.delete('/flags/:id', m.checkToken, m.setUser, flags.destroy);

// Video
router.post('/videos', m.checkToken, m.setUser, videos.create);
router.get('/videos/:id', m.checkToken, m.setUser, videos.get);
router.delete('/videos/:id', m.checkToken, m.setUser, videos.destroy);

module.exports = router
