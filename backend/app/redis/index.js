const redis = require('redis');

const client = redis.createClient({
  'socket.host': process.env.REDIS_HOST,
  'socket.port': process.env.REDIS_PORT,
  'password': process.env.REDIS_PASS,
});

module.exports = client;
