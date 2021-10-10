const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');
const rootRouter = require('./routes/root');
const userRouter = require("./routes/users");
const middlewares = require("./middlewares/index");

const app = new Koa();

app.use(logger());
app.use(bodyParser());

// Apply middlewares
app.use(middlewares.catchError);
app.use(middlewares.setUser);

// Define routes
app.use(rootRouter.routes());
app.use(userRouter.routes());

app.listen(3000);
