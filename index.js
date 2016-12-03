var ncp = require("copy-paste");
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
 
ncp.copy('some text', function () {
  // complete... 
})
