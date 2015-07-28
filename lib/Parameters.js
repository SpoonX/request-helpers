/**
 * Parameters class simplifying working with params.
 *
 * @constructor
 */
function Parameters () {
  this.data    = {};
  this.valid   = true;
  this.missing = [];
}

/**
 * Check if all parameters have been set.
 *
 * @returns {boolean}
 */
Parameters.prototype.isValid = function () {
  return this.valid;
};

/**
 * Inform the instance of a missing parameter.
 *
 * @param {String} missing
 *
 * @returns {Parameters}
 */
Parameters.prototype.setMissing = function (missing) {
  this.missing.push(missing);

  return this.setIsValid(false);
};

/**
 * Get the key of the missing parameter.
 *
 * @returns {Array}
 */
Parameters.prototype.getMissing = function () {
  return this.missing;
};

/**
 * Convenience method. Assumes you only want the first missing key.
 *
 * @returns {String|null}
 */
Parameters.prototype.getMissingParameter = function () {
  return this.missing[0] || null;
};

/**
 * Set the valid value for this instance.
 *
 * @param {boolean} isValid
 *
 * @returns {Parameters}
 */
Parameters.prototype.setIsValid = function (isValid) {
  this.valid = !!isValid;

  return this;
};

/**
 * Get the parameters as POJO.
 *
 * @returns {{}}
 */
Parameters.prototype.asObject = function () {
  return this.data;
};

/**
 * Get a parameter value.
 *
 * @param {String} key
 *
 * @returns {*|null}
 */
Parameters.prototype.get = function (key) {
  return this.data[key] || null;
};

/**
 * Set a parameter value.
 *
 * @param {String} key
 * @param {*} value
 *
 * @returns {Parameters}
 */
Parameters.prototype.set = function (key, value) {
  this.data[key] = value;

  return this;
};

module.exports = Parameters;
