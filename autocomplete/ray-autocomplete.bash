#!/bin/bash

_ray_autocomplete() {
    local cur=${COMP_WORDS[COMP_CWORD]}
    
    # Dynamically get the list of commands or tokens. Assuming `ray list` outputs them.
    # Adjust the command invocation as necessary to match how your CLI tool lists tokens.
    local commands=$(ray list)

    # You may need to filter or adjust the output format of `ray list` to match what compgen expects.
    
    COMPREPLY=($(compgen -W "${commands}" -- ${cur}))
}
complete -F _ray_autocomplete ray