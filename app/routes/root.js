const Router = require('@koa/router');
const app = require('../controllers/app');
const router = Router();

router.get('/ping', app.ping);

module.exports = router