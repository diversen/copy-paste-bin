# copy-paste-bin

Nodejs copy and paste from clipboard in CLI mode

# Install

    npm install copy-paste-bin -g

# Usage: 

copy: 

    copy-paste --copy='copied to the clipboard'

Or use a 'pipe' to copy to the clipboard: 

    echo 'copied to the clipboard' | copy-paste

paste (will output to the console): 
 
    copy-paste --paste

Or just use `CTRL+SHIFT+V` (or which ever paste shortcut your system uses)
to paste the clipboard contents to the console.

MIT License
