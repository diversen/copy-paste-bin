#!/usr/bin/env node

import minimist from 'minimist-mini';
import * as ncp from "copy-paste";

var opts = [];
opts.boolean = ['paste', 'help'];
opts.string = ['copy'];

var m = minimist(opts);

// Function to handle piped input
function handlePipedInput() {
    let data = '';
    process.stdin.on('readable', function () {
        let chunk;
        while ((chunk = process.stdin.read()) !== null) {
            data += chunk;
        }
    });

    process.stdin.on('end', function () {
        if (data) {
            // If data is piped in, use it as if it was provided with --copy
            ncp.copy(data, function () {
                process.exit(0);
            });
        } else {
            // No data piped in, and no other options provided
            m.helpMessage();
        }
    });
}

// Help
if (m.get('help')) {
    m.helpMessage();
}

// Copy to clipboard
if (m.get('copy')) {
    ncp.copy(m.get('copy'), function () {
        process.exit(0);
    });
} else if (m.get('paste')) {
    console.log(ncp.paste());
    process.exit(0);
} else {
    // Check if there is piped input
    if (!process.stdin.isTTY) {
        handlePipedInput();
    } else if (!m.get('copy') && !m.get('paste')) {
        m.helpMessage();
    }
}