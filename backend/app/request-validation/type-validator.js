/*
 * Define custom type validation functions here.
 */
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

module.exports = TypeValidator
