/*
 * Define custom type validation functions here.
 */
function stringValidationFn (value) {
  return typeof(value) === "string"
}

function intValidationFn (value) {
  return Number.isInteger(value)
}

function timeframeValidationFn (value) {
  return (typeof(value) === "string" && ["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY"].includes(value))
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
  TIMEFRAME: timeframeValidationFn,
}

module.exports = TypeValidator
