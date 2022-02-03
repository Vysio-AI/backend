const { RequestStructure, RequestParameter } = require("./request-validation");
const TypeValidator = require("./type-validator");

/*
 * requestStructures object maps valid API endpoints to the appropriate
 * RequestStructure object.
 */
const requestStructures = {
  '/api/v1/clients/:id': {
    'GET': new RequestStructure(),
    'PATCH': new RequestStructure(
      new RequestParameter('firstName', TypeValidator.STRING, false),
      new RequestParameter('lastName', TypeValidator.STRING, false),
      new RequestParameter('phoneNumber', TypeValidator.STRING, false),
      new RequestParameter('practitionerId', TypeValidator.INT, false),
    ),
    'DELETE': new RequestStructure(),
  },
  '/api/v1/clients/:id/plans': {
    'GET': new RequestStructure(),
  },
  '/api/v1/clients/:id/sessions': {
    'GET': new RequestStructure()
  },
  '/api/v1/practitioners/:id': {
    'GET': new RequestStructure(),
    'PATCH': new RequestStructure(
      new RequestParameter('firstName', TypeValidator.STRING, false),
      new RequestParameter('lastName', TypeValidator.STRING, false),
      new RequestParameter('phoneNumber', TypeValidator.STRING, false),
    ),
    'DELETE': new RequestStructure(),
  },
  '/api/v1/plans': {
    'POST': new RequestStructure(
      new RequestParameter('repetitions', TypeValidator.INT, true),
      new RequestParameter('timeframe', TypeValidator.TIMEFRAME, true),
      new RequestParameter('practitionerId', TypeValidator.INT, true),
    ),
  },
  '/api/v1/plans/:id': {
    'GET': new RequestStructure(),
    'PATCH': new RequestStructure(
      new RequestParameter('repetitions', TypeValidator.INT, false),
      new RequestParameter('timeframe', TypeValidator.TIMEFRAME, false),
      new RequestParameter('practitionerId', TypeValidator.INT, false),
    ),
    'DELETE': new RequestStructure(),
  },
  '/api/v1/plans/:id/exercises': {
    'GET': new RequestStructure(),
  },
  '/api/v1/plans/:id/sessions': {
    'GET': new RequestStructure(),
  },
  '/api/v1/exercises': {
    'POST': new RequestStructure(
      new RequestParameter('activityType', TypeValidator.ACTIVITY_TYPE, true),
      new RequestParameter('duration', TypeValidator.INT, true),
      new RequestParameter('planId', TypeValidator.INT, true),
    ),
  },
  '/api/v1/exercises/:id': {
    'GET': new RequestStructure(),
    'PATCH': new RequestStructure(
      new RequestParameter('activityType', TypeValidator.ACTIVITY_TYPE, false),
      new RequestParameter('duration', TypeValidator.INT, false),
      new RequestParameter('planId', TypeValidator.INT, false),
    ),
    'DELETE': new RequestStructure()
  },
  '/api/v1/sessions': {
    'GET': new RequestStructure(),
    'POST': new RequestStructure(
      new RequestParameter('startTime', TypeValidator.DATE_TIME, true),
      new RequestParameter('endTime', TypeValidator.DATE_TIME, false),
      new RequestParameter('processed', TypeValidator.BOOLEAN, true),
      new RequestParameter('clientId', TypeValidator.INT, true),
      new RequestParameter('planId', TypeValidator.INT, true),
      new RequestParameter('practitionerId', TypeValidator.INT, false),
    ),
  },
  '/api/v1/sessions/:id': {
    'GET': new RequestStructure(),
    'PATCH': new RequestStructure(
      new RequestParameter('startTime', TypeValidator.DATE_TIME, false),
      new RequestParameter('endTime', TypeValidator.DATE_TIME, false),
      new RequestParameter('processed', TypeValidator.BOOLEAN, false),
      new RequestParameter('clientId', TypeValidator.INT, false),
      new RequestParameter('planId', TypeValidator.INT, false),
      new RequestParameter('practitionerId', TypeValidator.INT, false),
    ),
    'DELETE': new RequestStructure(),
  },
  '/api/v1/sessions/:id/session-frames': {
    'GET': new RequestStructure(),
  },
  '/api/v1/sessions/:id/flags': {
    'GET': new RequestStructure(),
  },
}

module.exports = requestStructures;
