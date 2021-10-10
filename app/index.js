const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');
const rootRouter = require('./routes/root');
const userRouter = require("./routes/users");
const middlewares = require("./middlewares/index");
const socketio = require("./socketio/handlers");

const app = new Koa();

app.use(logger());
app.use(bodyParser());

// Apply middlewares
app.use(middlewares.catchError);
app.use(middlewares.authenticateUser);

// Define routes
app.use(rootRouter.routes());
app.use(userRouter.routes());

// Set up socketio
const httpServer = require("http").createServer(app.callback());
const options = {};
const io = require("socket.io")(httpServer, options);

// Set up websocket handlers
io.on('connection', (socket) => socketio.setup(io, socket));

httpServer.listen(3000);
