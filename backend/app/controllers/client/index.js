// Import controllers
const organizations = require('./organizations');
const clients = require('./clients');
const practitioners = require('./practitioners');
const signups = require('./signups');
const protocols = require('./protocols');
const exercises = require('./exercises');
const sessions = require('./sessions');
const sessionFrames = require('./session-frames');
const flags = require('./flags');
const videos = require('./videos');

module.exports = {
  organizations: organizations,
  clients: clients,
  practitioners: practitioners,
  signups: signups,
  protocols: protocols,
  exercises: exercises,
  sessions: sessions,
  sessionFrames: sessionFrames,
  flags: flags,
  videos: videos,
}


