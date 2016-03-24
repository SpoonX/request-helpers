# Request helpers
A collection of request helpers. Usable with express js (and consequently, sails.js).

## Installation
`npm install --save request-helpers`

## Methods
Currently only 1.

### secureParameters (params, req|object[, forceCollect = false])
Allows you to create a `Parameters` instance from the params sent with the request.
This method allows you to easily populate the parameters, making sure all required params were sent.

**Note:** This method also supports the use of a simple object in stead of using `req`.
This can be useful when you wish to secureParameters from parseCriteria (sails.js).

**Example:**

```javascript
var paramBlueprint = [
  'username',                           // Required
  'password',                           // Required.
  {param: 'name', required: false},     // Optional. Default: null
  {param: 'nickname', default: 'anon'}, // Optional. Default: anon
  {param: 'enable', cast: 'boolean'}    // Cast value to boolean
];

var params = helpers.secureParameters(paramBlueprint, req);

params.isValid(); // true
params.asObject(); // Returns POJO of parameters
params.get('key'); // Returns value for parameter `key`
params.getMissing(); // Returns an array of missing parameters
params.getMissingParameter(); // Returns the first missing parameter.

// With forceCollect (third argument) you tell secureParameters to not stop collecting when it finds a missing parameter.
Defaults to false.
params = helpers.secureParameters(paramBlueprint, req);
```

## Contributing
Go for it. Submit a PR, with the tests, and watch the magic.
