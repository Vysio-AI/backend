const redis = require('redis');

const client = redis.createClient({
  'socket.host': 'localhost',
  'socket.port': 6379,
  'password': 'password'
});

module.exports = client;
