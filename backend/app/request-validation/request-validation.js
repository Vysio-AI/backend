/*
 * The RequestStructure class is a collection of RequestParameter's that
 * encapsulates the expected structure of data included in the request.
 */
class RequestStructure {
  constructor(...requestParameters) {
    this.params = requestParameters
  }

  validate(requestBody) {
    let isValid = true
    let errorObj = {}

    // Check validity of each parameter in request structure
    for (const param of this.params) {
      const [paramIsValid, paramErrorMessage] = param.validate(requestBody)
      if (!paramIsValid) {
        isValid = false
        errorObj[param.name] = paramErrorMessage
      }
    }

    return [isValid, errorObj]
  }
}

/*
 * The RequestParameter class is a representation of a single parameter that
 * is part of a request. The name, type validator, and whether the parameter is
 * required or optional are required in its definition.
 */
class RequestParameter {
  constructor(name, typeValidator, isRequired) {
    this.name = name
    this.typeValidator = typeValidator
    this.isRequired = isRequired
  }

  validate(requestBody) {
    if (!requestBody.hasOwnProperty(this.name)) {

      // Check if request parameter is required
      if (this.isRequired) {
        return [false, "Required parameter missing from the request body JSON"]
      } else {
        return [true, null]
      }
    } else {
      const requestParamVal = requestBody[this.name]

      // Check validity of request parameter value
      if (!this.typeValidator(requestParamVal)) {
        return [false, `Invalid value: ${requestParamVal}`]
      } else {
        return [true, null]
      }
    }
  }
}

module.exports = {
  RequestStructure,
  RequestParameter,
}
