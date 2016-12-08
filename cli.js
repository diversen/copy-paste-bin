#!/usr/bin/env node

var opts = [];
opts.boolean = ['paste', 'help'];
opts.string = ['copy'];

var m = require('minimist-mini')(opts);
var ncp = require("copy-paste");

// Help
if (m.get('help')) {
    m.helpMessage();
}

// Copy to clipboard
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

