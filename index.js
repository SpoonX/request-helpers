var Parameters = require('./lib/Parameters'),
    typer      = require('typer');

module.exports = {
  secureParameters : function (rules, req, forceCollect) {
    var parameters = new Parameters(),
        i          = 0;

    for (; i < rules.length; i++) {
      var param          = rules[i],
          required       = true,
          defaultValue   = null,
          cast           = 'smart';

      if (typeof param === 'object') {
        required = !(typeof param.required !== 'undefined' && !param.required);

        if (typeof param.default !== 'undefined') {
          required = false;
          defaultValue = param.default;
        }

        cast  = param.cast || cast;
        param = param.param;
      }

      if (req.param(param)) {
        parameters.set(param, typer.cast(req.param(param), cast));

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
