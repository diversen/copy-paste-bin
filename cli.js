#!/usr/bin/env node

var opts = [];
opts.boolean = ['paste'];
opts.string = ['help', 'copy'];
var argv = require('minimist')(process.argv.slice(2), opts);
var ncp = require("copy-paste");
var get = require('get-value');
var fs = require('fs');
var path = require('path');

// Help function
function helpMessage () {
    var dirname = path.dirname(__filename);
    var help = fs.readFileSync(dirname + '/README.md', {encoding: 'utf8'});
    console.log(help);
    process.exit(0);
}

// Help
var help = get(argv, 'help');
if (help) {
    helpMessage();
}

// Copy
var copy = get(argv, 'copy');
if (copy) {
    ncp.copy(copy, function () {
        process.exit(0);
    })
}

var paste = get(argv, 'paste');
if (paste) {
    console.log(ncp.paste());
    process.exit(0);
}

if (!copy && !paste) {
    helpMessage();
}

