# cls-bcrypt

[cls-bcrypt][] provides a shim layer for [bcrypt][] so that it
will work with [continuation-local-storage][]. It does this by binding
all callbacks passed to bcrypt's functions.

```js
var cls = require('continuation-local-storage');
var ns = cls.createNamespace('NODESPACE');

var bcrypt = require('bcrypt');

// load shim
require('cls-bcrypt')(ns);
```

## tests

The tests can be run with `npm test`.

 [cls-bcrypt]: https://www.npmjs.com/package/cls-bcrypt
 [bcrypt]: https://www.npmjs.com/package/bcrypt
 [continuation-local-storage]: https://www.npmjs.com/package/continuation-local-storage
