var Parameters = require('./lib/Parameters');

module.exports = {
  secureParameters : function (rules, req, forceCollect) {
    var parameters = new Parameters(),
        i          = 0;

    for (; i < rules.length; i++) {
      var param          = rules[i],
          required       = true,
          defaultValue   = null;

      if (typeof param === 'object') {
        required = !(typeof param.required !== 'undefined' && !param.required);

        if (param.default) {
          required = false;
          defaultValue = param.default;
        }

        param = param.param;
      }

      if (req.param(param)) {
        parameters.set(param, req.param(param));

        continue;
      }

      if (!required) {
        parameters.set(param, defaultValue);

        continue;
      }

      parameters.setMissing(param);

      if (!forceCollect) {
        return parameters;
      }
    }

    return parameters;
  }
};
