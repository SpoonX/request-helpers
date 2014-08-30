# Request helpers
A collection of request helpers. Usable with express js (and consequently, sails.js).

## Installation
`npm install --save request-helpers`

## Methods
Currently only 1.

### pickParams(params, req, callback)
Allows you to create an object from the params sent with the request. This method allows you to easily populate the object, and validate the params, making sure all required params were sent.

**Example:**

```javascript
var paramBlueprint = [
  'username',                          // Required
  'password',                          // Required.
  {param: 'name', required: false},    // Optional. Default: null
  {param: 'nickname', default: 'anon'} // Optional. Default: anon
];

helpers.pickParams(paramBlueprint, req, function (error, params) {
  // Value of "err" is name of missing param.
  // Params is object populated with the keys as defined in paramBlueprint.
});
```

## Contributing
Go for it. Submit a PR, with the tests, and watch the magic.
