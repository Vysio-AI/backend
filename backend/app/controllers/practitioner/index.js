// Import controllers
const clients = require('./clients');
const practitioners = require('./practitioners');
const signups = require('./signups');
const plans = require('./plans');
const exercises = require('./exercises');
const sessions = require('./sessions');
const sessionNotifications = require('./session-notifications');
const sessionFrames = require('./session-frames');
const sessionMetrics = require('./session-metrics');
const flags = require('./flags');
const videos = require('./videos');
const invites = require('./invites');

module.exports = {
  clients: clients,
  practitioners: practitioners,
  signups: signups,
  plans: plans,
  exercises: exercises,
  sessions: sessions,
  sessionNotifications: sessionNotifications,
  sessionFrames: sessionFrames,
  flags: flags,
  videos: videos,
  invites: invites,
  sessionMetrics: sessionMetrics
}
