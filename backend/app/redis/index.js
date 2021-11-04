const redis = require('redis');

const client = redis.createClient({
  'socket.host': process.env.REDIS_HOST,
  'socket.port': process.env.REDIS_PORT,
  'password': process.env.REDIS_PASS,
});

const setup = async () => {
  await client.connect();
}

module.exports = {
  client: client,
  setup: setup,
}
