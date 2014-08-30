module.exports = {
  pickParams: function (params, req, callback) {
    var ensured = {},
        i = 0;

    for (i; i < params.length; i++) {

      var param = params[i],
          required = true,
          defaultValue = null;

      if (typeof param === 'object') {
        required = !(typeof param.required !== 'undefined' && !param.required);

        if (param.default) {
          required     = false;
          defaultValue = param.default;
        }

        param = param.param;
      }

      if (!req.param(param)) {
        if (!required) {
          ensured[param] = defaultValue;

          continue;
        }

        return callback(param);
      }

      ensured[param] = req.param(param);
    }

    callback(null, ensured);
  }
};
