const { createClient } = require('redis');

const client = createClient({
  password: process.env.REDIS_PASSWORD
});
client.connect();

module.exports = client;
