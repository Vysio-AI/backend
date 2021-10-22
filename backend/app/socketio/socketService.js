const io = require("socket.io");
const kafka = require('../kafka/index');
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
};

class SocketService {
  constructor(server) {
    this.io = io(server, options);
    this.io.on('connection', socket => {
      console.log("socket connection");

      socket.on('message', (msg) => {
        let timestamp = new Date();
        timestamp = timestamp.toJSON();

        const testMessage = {
          session_id: 2,
          timestamp: timestamp,
          a_x: 2.34,
          a_y: 1.33,
          a_z: 4.65,
          w_x: 2.63,
          w_y: 1.84,
          w_z: 2.32,
        }

        kafka.sendMessage('watch', "1", JSON.stringify(testMessage));
      });
    });
  }

  emitter(event, body) {
    if (body) {
      this.io.emit(event, body);
    }
  }

}

module.exports = SocketService;