const { RequestStructure, RequestParameter } = require("./request-validation");
const TypeValidator = require("./type-validator");

/*
 * requestStructures object maps valid API endpoints to the appropriate
 * RequestStructure object.
 */
const requestStructures = {
  '/api/v1/clients/:id': {
    'GET': new RequestStructure(),
  },
}

module.exports = requestStructures;
