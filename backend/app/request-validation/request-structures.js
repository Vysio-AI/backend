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
}

module.exports = requestStructures;
