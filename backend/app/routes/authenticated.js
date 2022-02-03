const Router = require('@koa/router');

// Import controllers
const {
  signups,
  clients,
  practitioners,
  plans,
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

// Clients
router.get('/clients', m.checkToken, m.setUser, m.validateRequest, clients.index);
router.get('/clients/:id', m.checkToken, m.setUser, m.validateRequest, clients.get);
router.patch('/clients/:id', m.checkToken, m.setUser, m.validateRequest, clients.update);
router.delete('/clients/:id', m.checkToken, m.setUser, m.validateRequest, clients.destroy);
router.get('/clients/:id/plans', m.checkToken, m.setUser, m.validateRequest, clients.getAllPlans);
router.get('/clients/:id/sessions', m.checkToken, m.setUser, m.validateRequest, clients.getAllSessions);

// Practitioners
router.get('/practitioners/:id', m.checkToken, m.setUser, m.validateRequest, practitioners.get);
router.patch('/practitioners/:id', m.checkToken, m.setUser, m.validateRequest, practitioners.update);
router.delete('/practitioners/:id', m.checkToken, m.setUser, m.validateRequest, practitioners.destroy);

// Signups
router.post('/practitioners/signup', m.checkToken, m.setUser, signups.signupPractitioner);
router.post('/clients/signup', m.checkToken, m.setUser, signups.signupClient);

// Plans
router.post('/plans', m.checkToken, m.setUser, m.validateRequest, plans.create);
router.get('/plans/:id', m.checkToken, m.setUser, m.validateRequest, plans.get);
router.patch('/plans/:id', m.checkToken, m.setUser, m.validateRequest, plans.update);
router.delete('/plans/:id', m.checkToken, m.setUser, m.validateRequest, plans.destroy);
router.get('/plans/:id/exercises', m.checkToken, m.setUser, m.validateRequest, plans.getAllExercises);
router.get('/plans/:id/sessions', m.checkToken, m.setUser, m.validateRequest, plans.getAllSessions);

// Exercises
router.post('/exercises', m.checkToken, m.setUser, m.validateRequest, exercises.create);
router.get('/exercises/:id', m.checkToken, m.setUser, m.validateRequest, exercises.get);
router.patch('/exercises/:id', m.checkToken, m.setUser, m.validateRequest, exercises.update);
router.delete('/exercises/:id', m.checkToken, m.setUser, m.validateRequest, exercises.destroy);

// Sessions
router.get('/sessions', m.checkToken, m.setUser, m.validateRequest, sessions.index);
router.post('/sessions', m.checkToken, m.setUser, m.validateRequest, sessions.create);
router.get('/sessions/:id', m.checkToken, m.setUser, m.validateRequest, sessions.get);
router.patch('/sessions/:id', m.checkToken, m.setUser, m.validateRequest, sessions.update);
router.delete('/sessions/:id', m.checkToken, m.setUser, m.validateRequest, sessions.destroy);
router.get('/sessions/:id/session-frames', m.checkToken, m.setUser, m.validateRequest, sessions.getAllSessionFrames);
router.get('/sessions/:id/flags', m.checkToken, m.setUser, m.validateRequest, sessions.getAllFlags);

// Session Frames
router.get('/session-frames/:id', m.checkToken, m.setUser, m.validateRequest, sessionFrames.get);

// Flags
router.post('/flags', m.checkToken, m.setUser, m.validateRequest, flags.create);
router.get('/flags/:id', m.checkToken, m.setUser, m.validateRequest, flags.get);
router.post('/flags/:id', m.checkToken, m.setUser, m.validateRequest, flags.update);
router.delete('/flags/:id', m.checkToken, m.setUser, m.validateRequest, flags.destroy);

// Video
router.post('/videos', m.checkToken, m.setUser, videos.create);
router.get('/videos/:id', m.checkToken, m.setUser, videos.get);
router.delete('/videos/:id', m.checkToken, m.setUser, videos.destroy);

module.exports = router
