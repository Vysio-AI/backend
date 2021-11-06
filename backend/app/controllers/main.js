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
  organizations: {
    index: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.organizations.index,
      )
    },
    get: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.organizations.get,
      )
    },
    update: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.organizations.update,
      )
    },
    destroy: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.organizations.destroy,
      )
    },
    getAllPractitioners: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.organizations.getAllPractitioners,
      )
    }
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
    getAllProtocols: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.clients.getAllProtocols,
        practitionersController.clients.getAllProtocols,
      )
    },
    getNotificationSettings: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.clients.getNotificationSettings,
        practitionersController.clients.getNotificationSettings,
      )
    },
    updateNotificationSettings: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.clients.updateNotificationSettings,
        practitionersController.clients.updateNotificationSettings,
      )
    }
  },
  practitioners: {
    index: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.practitioners.index,
        practitionersController.practitioners.index,
      )
    },
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
        clientsController.practitioners.update,
        practitionersController.practitioners.update,
      )
    },
    destroy: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.practitioners.destroy,
        practitionersController.practitioners.destroy,
      )
    },
    getAllClients: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.practitioners.getAllClients,
        practitionersController.practitioners.getAllClients,
      )
    },
    getNotificationSettings: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.practitioners.getNotificationSettings,
        practitionersController.practitioners.getNotificationSettings,
      )
    },
    updateNotificationSettings: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.practitioners.updateNotificationSettings,
        practitionersController.practitioners.updateNotificationSettings,
      )
    }
  },
  protocols: {
    create: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        null,
        practitionersController.protocols.create,
      )
    },
    get: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.protocols.get,
        practitionersController.protocols.get,
      )
    },
    update: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.protocols.update,
        practitionersController.protocols.update,
      )
    },
    destroy: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.protocols.destroy,
        practitionersController.protocols.destroy,
      )
    },
    getAllExercises: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.protocols.getAllExercises,
        practitionersController.protocols.getAllExercises,
      )
    },
    getAllSessions: async function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.protocols.getAllSessions,
        practitionersController.protocols.getAllSessions,
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
  sessionFrames: {
    create: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessionFrames.create,
        practitionersController.sessionFrames.create,
      )
    },
    get: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessionFrames.get,
        practitionersController.sessionFrames.get,
      )
    },
    update: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessionFrames.update,
        practitionersController.sessionFrames.update,
      )
    },
    destroy: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.sessionFrames.destroy,
        practitionersController.sessionFrames.destroy,
      )
    }
  },
  flags: {
    create: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.flags.create,
        practitionersController.flags.create,
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
        practitionersController.flags.update,
      )
    },
    destroy: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.flags.destroy,
        practitionersController.flags.destroy,
      )
    }
  },
  videos: {
    create: function(ctx) {
      return callUserTypeFunction(
        ctx,
        clientsController.videos.create,
        practitionersController.videos.create,
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
        practitionersController.videos.destroy,
      )
    }
  }
}



