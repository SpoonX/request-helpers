var helpers = require('../index.js'),
    assert  = require('assert'),
    req     = {
      params : {},
      param : function (key) {
        if (this.params[key]) {
          return this.params[key];
        }

        return null;
      },

      setParams: function (params) {
        this.params = params;
      }
    };

describe('Request helpers', function () {
  it('should tell me there is a missing param', function (done) {
    var testParams = {foo: 1, bar: 2, bat: 3, baz: 4, bacon: 5};

    req.setParams(testParams);

    helpers.pickParams(['foo', 'bar', 'cow'], req, function (error, collected) {
      assert.notStrictEqual(error, null, 'There is no error.');
      done();
    });
  });

  it('should tell me exactly what parameter is missing', function (done) {
    var testParams = {foo: 1, bar: 2, bat: 3, baz: 4, bacon: 5};

    req.setParams(testParams);

    helpers.pickParams(['foo', 'bar', 'cow'], req, function (error, collected) {
      assert.strictEqual(error, 'cow', 'Error does not equal cow.');
      done();
    });
  });

  it('should default to apple', function (done) {
    req.setParams({});

    helpers.pickParams([{param: 'defaultMe', default: 'apple'}], req, function (error, collected) {
      assert.strictEqual(null, error, 'There is an error: ' + error);
      assert.strictEqual(collected.defaultMe, 'apple', 'Default not equal');

      done();
    });
  });
});
