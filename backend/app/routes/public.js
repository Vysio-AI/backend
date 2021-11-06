const Router = require('@koa/router');

// Import controllers
const app = require('../controllers/app/app');

// Define root
const router = Router({
  prefix: '/api/v1',
});

// Root routes
router.get('/ping', app.ping);

module.exports = router
