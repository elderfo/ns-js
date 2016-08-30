#ns-js

ns-js is a simple javascript namespacing library.

## Example:

#### singer.js
```
(function() {
    var singer = ns.namespace("chris.getsfred.singer");

    singer.prototype.sing = function() {
        alert("FA LA LA LA LAAAAAAAAA");
    }    
})();
```

#### app.js
```
(function() {
    var singer = ns.require("chris.getsfred.singer");
    singer.sing();

})();
```

#### index.html
```

```