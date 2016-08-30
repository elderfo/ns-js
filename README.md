#ns-js

[![Build Status](https://travis-ci.org/elderfo/ns-js.svg?branch=master)](https://travis-ci.org/elderfo/ns-js)

ns.js is a super simple javascript namespacing library.

## Example:

#### singer.js
```
(function() {
    var singer = ns.namespace("chris.getsfred.singer");

    singer.sing = function() {
        console.log("HELLOOOOOOOOO WOOOOOOOOOORLDDDDDD");
    }
})();
```

#### index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>

    <script src="../ns.js"></script>
    <script src="./chris/getsfred/singer.js"></script>
    <script>
        var singer = ns.require("chris.getsfred.singer");
        singer.sing();
    </script>
</head>
<body>

</body>
</html>
```

#### 