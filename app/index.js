const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');
const cors = require('@koa/cors');


const rootRouter = require('./routes/root');
const userRouter = require("./routes/users");
const middlewares = require("./middlewares/index");
const socketio = require("./socketio/handlers");


const jwt = require('koa-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(cors());

// Apply middlewares
app.use(middlewares.catchError);
app.use(middlewares.checkToken);

// Check token
app.use(jwt({
  secret: jwksRsa.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: [process.env.AUTH0_DOMAIN],
  algorithms: ['RS256']
}));

// Define routes
app.use(rootRouter.routes());
app.use(userRouter.routes());

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
