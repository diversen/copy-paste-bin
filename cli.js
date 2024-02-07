#!/usr/bin/env node

import minimist from 'minimist-mini';
import * as ncp from "copy-paste";


var opts = [];
opts.boolean = ['paste', 'help'];
opts.string = ['copy'];

var minimistMini = minimist(opts);

function ncpError(err) {
    if (err) {
        console.log('Error copying to clipboard')
        console.log(err);
        process.exit(1);
    }
}


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
            ncp.copy(data, function (err) {
                ncpError(err);
                process.exit(0);
            });
        } else {
            // No data piped in, and no other options provided
            minimistMini.helpMessage();
        }
    });
}

// Help
if (minimistMini.getOption('help')) {
    minimistMini.helpMessage();
}

// Copy to clipboard
if (minimistMini.getOption('copy')) {
    ncp.copy(minimistMini.getOption('copy'), function (err) {
        ncpError(err);
        process.exit(0);
    });
} else if (minimistMini.getOption('paste')) {
    ncp.paste(function (err, data) {
        ncpError(err);
        console.log(data);  
    });
    
} else {
    // Check if there is piped input
    if (!process.stdin.isTTY) {
        console.log('Piped input detected');
        handlePipedInput();
    } else if (!minimistMini.getOption('copy') && !minimistMini.getOption('paste')) {
        minimistMini.helpMessage();
    }
}