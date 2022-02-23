/*
 * Define custom type validation functions here.
 */
function stringValidationFn (value) {
  return typeof(value) === "string"
}

function intValidationFn (value) {
  return Number.isInteger(value)
}

function booleanValidationFn (value) {
  return typeof(value) === "boolean"
}

function timeframeValidationFn (value) {
  return (typeof(value) === "string" && ["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY"].includes(value))
}

function activityTypeValidationFn (value) {
  return (typeof(value) === "string" && ["PENDULUM", "ABDUCTION", "FORWARD_ELEVATION", "INTERNAL_ROTATION", "EXTERNAL_ROTATION", "TRAPEZIUS_EXTENSION", "UPRIGHT_ROW"].includes(value))
}

function datetimeValidationFn (value) {
  // TODO: Check datetime can be parsed from value
  return typeof(value) === "string"
}

function emailValidationFn (value) {
  // TODO: Check email is valid
  return typeof(value) === "string"
}

function inviteStatusValidationFn (value) {
  return (typeof(value) === "string" && ["PENDING", "COMPLETED", "CANCELLED"].includes(value))
}

function referralCodeValidationFn (value) {
  return (typeof(value) === "string" && value.length === 10)
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
  BOOLEAN: booleanValidationFn,
  TIMEFRAME: timeframeValidationFn,
  ACTIVITY_TYPE: activityTypeValidationFn,
  DATE_TIME: datetimeValidationFn,
  EMAIL: emailValidationFn,
  INVITE_STATUS: inviteStatusValidationFn,
  REFERRAL_CODE: referralCodeValidationFn,
}

module.exports = TypeValidator
