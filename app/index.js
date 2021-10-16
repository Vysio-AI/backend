const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');
const cors = require('@koa/cors');


const rootRouter = require('./routes/root');
const middlewares = require("./middlewares/index");
const socketio = require("./socketio/handlers");

require('dotenv').config();

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(cors());

// Apply middlewares
app.use(middlewares.catchError);
app.use(middlewares.checkToken);

// Define routes
app.use(rootRouter.routes());

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
