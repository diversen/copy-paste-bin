#!/usr/bin/env node

var opts = [];
opts.boolean = ['paste'];
opts.string = ['help', 'copy'];
var mini = require('minimist-mini');
m = new mini(opts);

var ncp = require("copy-paste");
var fs = require('fs');
var path = require('path');


// Help
if (m.get('help')) {
    m.helpMessage();
}

//var copy = get(argv, 'copy');
if (m.get('copy')) {
    ncp.copy( m.get('copy'), function () {
        process.exit(0);
    })
}

//var paste = get(argv, 'paste');
if (m.get('paste')) {
    console.log(ncp.paste());
    process.exit(0);
}

// Help
if (!m.get('copy') && !m.get('paste')) {
    m.helpMessage();
}

