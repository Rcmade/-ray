_ray_autocomplete() {
    local cur=${COMP_WORDS[COMP_CWORD]}
    local prev=${COMP_WORDS[COMP_CWORD-1]}
    # Corrected the assignment to remove the space after '='
    local commands=$(ray list-commands 2>/dev/null)

    # Assuming 'ray list' outputs token names, one per line.
    local tokens=$(ray list 2>/dev/null | tr '\n' ' ')

    if [ "${prev}" == "remove" ]; then
        # If the previous word is 'remove', only suggest token names.
        COMPREPLY=($(compgen -W "${tokens}" -- ${cur}))
    else
        # Combine commands and tokens for completion suggestions, except when 'remove' is used.
        local suggestions="${commands} ${tokens}"
        COMPREPLY=($(compgen -W "${suggestions}" -- ${cur}))
    fi
}

complete -F _ray_autocomplete ray
