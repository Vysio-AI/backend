const clientsController = require('./client');
const practitionersController = require('./practitioner');

const {callUserTypeFunction} = require('../access-control');

// Signups
module.exports = {
  signups: {
    signupStatus: clientsController.signups.signupStatus,
    signupPractitioner: practitionersController.signups.signupPractitioner,
    signupClient: clientsController.signups.signupClient
  },
  clients: {
    index: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.clients.index,
      )
    },
    get: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.clients.get,
        practitionersController.clients.get,
      )
    },
    update: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.clients.update,
        practitionersController.clients.update,
      )
    },
    destroy: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.clients.destroy,
        practitionersController.clients.destroy,
      )
    },
    getAllPlans: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.clients.getAllPlans,
        practitionersController.clients.getAllPlans,
      )
    },
    getAllSessions: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.clients.getAllSessions,
        practitionersController.clients.getAllSessions
      )
    },
  },
  practitioners: {
    get: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.practitioners.get,
        practitionersController.practitioners.get,
      )
    },
    update: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.practitioners.update,
      )
    },
    destroy: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.practitioners.destroy,
      )
    },
  },
  plans: {
    index: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.plans.index,
      )
    },
    create: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.plans.create,
      )
    },
    get: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.plans.get,
        practitionersController.plans.get,
      )
    },
    update: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.plans.update,
      )
    },
    destroy: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.plans.destroy,
      )
    },
    getAllExercises: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.plans.getAllExercises,
        practitionersController.plans.getAllExercises,
      )
    },
    getAllSessions: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.plans.getAllSessions,
        practitionersController.plans.getAllSessions,
      )
    }
  },
  exercises: {
    create: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.exercises.create,
        practitionersController.exercises.create,
      )
    },
    get: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.exercises.get,
        practitionersController.exercises.get,
      )
    },
    update: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.exercises.update,
        practitionersController.exercises.update,
      )
    },
    destroy: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.exercises.destroy,
        practitionersController.exercises.destroy,
      )
    }
  },
  sessions: {
    index: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessions.index,
        practitionersController.sessions.index,
      )
    },
    create: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessions.create,
        null,
      )
    },
    get: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessions.get,
        practitionersController.sessions.get,
      )
    },
    update: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessions.update,
        practitionersController.sessions.update,
      )
    },
    destroy: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessions.destroy,
        practitionersController.sessions.destroy,
      )
    },
    end: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessions.end,
        null
      )
    },
    notify: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessions.notify,
        null
      )
    },
    getAllSessionFrames: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessions.getAllSessionFrames,
        practitionersController.sessions.getAllSessionFrames,
      )
    },
    getAllFlags: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessions.getAllFlags,
        practitionersController.sessions.getAllFlags,
      )
    }
  },
  sessionNotifications: {
    index: function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.sessionNotifications.index
      )
    },
    get: function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.sessionNotifications.get
      )
    },
    update: function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.sessionNotifications.update
      )
    },
  },
  sessionFrames: {
    get: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessionFrames.get,
        practitionersController.sessionFrames.get,
      )
    },
  },
  flags: {
    create: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.flags.create,
        null,
      )
    },
    get: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.flags.get,
        practitionersController.flags.get,
      )
    },
    update: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.flags.update,
        null,
      )
    },
    destroy: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.flags.destroy,
        null,
      )
    }
  },
  videos: {
    create: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.videos.create,
        null,
      )
    },
    get: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.videos.get,
        practitionersController.videos.get,
      )
    },
    destroy: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.videos.destroy,
        null,
      )
    }
  },
  invites: {
    index: function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.invites.index
      )
    },
    create: function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.invites.create
      )
    },
    update: function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.invites.update
      )
    },
    validateReferral: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.invites.validateReferral,
        null
      )
    },
  },
}



