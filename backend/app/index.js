const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');
const cors = require('@koa/cors');

const authenticatedRouter = require('./routes/authenticated');
const publicRouter = require('./routes/public');
const middlewares = require("./middlewares/index");

const kafka = require("./kafka/index");

require('dotenv').config();

const app = new Koa();

const httpServer = require("http").createServer(app.callback());
const SocketService = require("./socketio/socketService");
// Set up socketio

const socketService = new SocketService(httpServer);

app.use(logger());
app.use(bodyParser());
app.use(cors({
  origin: '*'
}));

// Apply global middlewares
app.use(middlewares.catchError);

// Define routes
app.use(publicRouter.routes());
app.use(authenticatedRouter.routes());

// Set up Kafka
kafka.setup(socketService);

httpServer.listen(3000);
