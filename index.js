var Parameters = require('./lib/Parameters'),
    typer      = require('typer');

module.exports = {
  secureParameters: function(rules, req, forceCollect) {
    var parameters = new Parameters(),
        i          = 0;

    if (typeof req.param !== 'function') {
      req.param = mockParamMethodFactory(req);
    }

    for (; i < rules.length; i++) {
      var param        = rules[i],
          required     = true,
          defaultValue = null,
          cast         = 'smart';

      if (typeof param === 'object') {
        required = !(typeof param.required !== 'undefined' && !param.required);

        if (typeof param.default !== 'undefined') {
          required     = false;
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

function mockParamMethodFactory(object) {
  if (typeof object['param'] !== 'undefined') {
    object['__param'] = object['param'];
  }

  return function mockParamMethod(key) {
    if (key === 'param') {
      key = '__param';
    }

    return typeof object[key] !== 'undefined' ? object[key] : null;
  }
}
