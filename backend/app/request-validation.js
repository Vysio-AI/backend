function stringValidationFn (value) {
  return typeof(value) === "string"
}

function intValidationFn (value) {
  return Number.isInteger(value)
}

function completionFrequencyValidationFn (value) {
  return (typeof(value) === "string" && ["E1D", "E2D", "E7D"].includes(value))
}

/*
 * The TypeValidator data structure maps an identifying data type to be 
 * included in a request body to the function that validates it. The
 * validation function must take in a single argument (the value it's
 * validating) and return a boolean indicating the value's validity.
 */
const TypeValidator = {
  STRING: stringValidationFn,
  INT: intValidationFn,
  COMPLETION_FREQUENCY: completionFrequencyValidationFn,
}

/*
 * The RequestStructure class is a collection of RequestParameter's that
 * encapsulates the expected structure of data included in the request.
 */
class RequestStructure {
  constructor(...requestParameters) {
    this.params = requestParameters
  }

  validate(requestBody) {
    let errorObj = {}
    for (const param of this.params) {
      const errorMessage = param.validate(requestBody)
      if (errorMessage) {
        errorObj[param.name] = errorMessage
      }
    }
    return errorObj
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
        return "Required parameter missing from the request body JSON"
      } else {
        return
      }
    } else {
      const requestParamVal = requestBody[this.name]

      // Check validity of request parameter value
      if (!this.typeValidator(requestParamVal)) {
        return `Invalid value: ${requestParamVal}`
      }
    }
  }
}
