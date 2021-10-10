const Router = require('@koa/router');
const users = require('../controllers/users');

const router = Router({
  prefix: '/users',
});

router.get('/', users.index);
router.post('/', users.create);

module.exports = router