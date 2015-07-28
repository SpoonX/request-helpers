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

    var params = helpers.secureParameters(['foo', 'bar', 'cow'], req);

    assert.strictEqual(params.isValid(), false);
    assert.strictEqual(params.getMissingParameter(), 'cow');

    done();
  });

  it('should tell me exactly what parameter is missing', function (done) {
    var testParams = {foo: 1, bar: 2, bat: 3, baz: 4, bacon: 5};

    req.setParams(testParams);

    var params = helpers.secureParameters(['foo', 'bar', 'cow', 'clam'], req);

    assert.strictEqual(params.isValid(), false);
    assert.equal(params.getMissingParameter(), 'cow', 'Error does not equal cow.');
    done();
  });

  it('should tell me exactly what parameters are missing', function (done) {
    var testParams = {foo: 1, bar: 2, bat: 3, baz: 4, bacon: 5};

    req.setParams(testParams);

    var params = helpers.secureParameters(['foo', 'bar', 'cow', 'clam'], req, true);

    assert.strictEqual(params.isValid(), false);
    assert.deepEqual(params.getMissing(), ['cow', 'clam'], 'Missing does not equal cow.');
    assert.equal(params.getMissing()[0], 'cow', 'Missing does not equal cow.');
    assert.equal(params.getMissing()[1], 'clam', 'Missing does not equal clam.');
    done();
  });

  it('should return a POJO', function (done) {
    var testParams = {foo: 1, bar: 2, bat: 3, baz: 4, bacon: 5};

    req.setParams(testParams);

    var params = helpers.secureParameters(['foo', 'bar', 'bacon'], req);

    assert.deepEqual(params.asObject(), {foo: 1, bar: 2, bacon: 5});

    done();
  });

  it('should default to apple', function (done) {
    req.setParams({});

    var params = helpers.secureParameters([{param: 'defaultMe', default: 'apple'}], req);

    assert.deepEqual([], params.getMissing(), 'There are missing parameters');
    assert.strictEqual(params.get('defaultMe'), 'apple', 'Default not equal');

    done();
  });
});
