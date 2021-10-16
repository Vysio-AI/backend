const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');
const cors = require('@koa/cors');


const authenticatedRouter = require('./routes/authenticated');
const publicRouter = require('./routes/public');
const middlewares = require("./middlewares/index");
const socketio = require("./socketio/handlers");

const kafka = require("./kafka/index");

require('dotenv').config();

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(cors());

// Apply global middlewares
app.use(middlewares.catchError);

// Set up Kafka
kafka.setup();

// Define routes
app.use(publicRouter.routes());
app.use(authenticatedRouter.routes());

// Set up socketio
const httpServer = require("http").createServer(app.callback());
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
};
const io = require("socket.io")(httpServer, options);

// Set up websocket handlers
socketio.setup(io);

httpServer.listen(3000);
