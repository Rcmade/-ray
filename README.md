# @rcmade/ray

## Purpose

`@rcmade/ray` is designed to empower developers with a secure and convenient way to manage their credentials directly from the terminal. It addresses key challenges:

- **Security**: Safely encrypts and stores various credentials, such as API keys and GitHub snippets, ensuring they are protected yet easily retrievable.
- **Accessibility**: Provides instant access to stored credentials from any terminal, enhancing workflow efficiency without compromising on security.
- **Convenience**: Eliminates the hassle of managing multiple credentials by centralizing them in a single, easy-to-use terminal application.

## Why Use @rcmade/ray?

- **Secure Storage**: Encrypt and save your crucial development credentials with confidence.
- **Global Access**: Fetch your credentials securely from anywhere, anytime, directly through your terminal.
- **Streamlined Workflow**: Improve your productivity by having all your necessary credentials at your fingertips, ready to be used when you need them the most.

## Installation

To install `@rcmade/ray` globally on your system, allowing you to use it from any terminal, execute the following command:

```sh
npm install -g @rcmade/ray
```

## Troubleshooting Autocompletion

If you find that autocompletion is not working immediately after the setup, try the following steps:

1. **Restart your terminal**: Close and reopen your terminal window to refresh the session and apply the changes.

2. **Restart your computer**: If restarting the terminal does not resolve the issue, a full restart of your computer can help ensure that all paths and configurations are correctly reloaded.

These steps typically resolve any issues with command autocompletion not functioning after installation.

## Further Troubleshooting Autocompletion

In some cases, autocompletion might not activate even after restarting your terminal or computer. If you encounter this issue, follow these steps:

1. **Manually run the setup command**: Execute the `ray setup` command in your terminal. This command manually runs the setup file to configure autocompletion.

    ```sh
    ray setup
    ```

2. **Restart your terminal**: Close and reopen your terminal window to ensure that the new autocompletion settings are applied.

3. **Restart your computer**: If the autocompletion feature is still not working, try restarting your computer. This ensures that all shell instances are refreshed with the updated configurations.

By following these steps, you should be able to resolve most issues with autocompletion not working as expected. If problems persist, please consult the `ray` documentation or reach out for support.

## Available Commands

`@rcmade/ray` provides a suite of commands designed to manage your credentials securely and efficiently directly from the terminal. Below is a list of available commands along with their descriptions:

### `add <snippetName> <snippetValue>`

- **Description**: Adds a new snippet with the specified name and value. This command securely stores the snippet for later use.
- **Usage**:

    ```sh
    ray add githubToken myGithubSnippet
    ```

    Or

    ```sh
    ray add myCodeSnippet -c // -c will open the default editor if not specified then use "export EDITOR=vim"

    ```

### `ray <snippetName>`

- **Description**: Retrieves and displays the value of the specified snippet. Use this command to quickly access the value of a securely stored snippet by its name.
- **Usage**:

    ```sh
    ray github
    ```

### `list`

- **Description**: Lists all stored snippets, displaying their names. This command helps you quickly see what snippets you have stored.
- **Usage**:

    ```sh
    ray list
    ```

### `remove <snippetName>`

- **Description**: Removes a snippet by its name. This command is useful for deleting snippets that are no longer needed.
- **Usage**:

    ```sh
    ray remove github
    ```

### `setup`

- **Description**: Runs setup tasks, including initializing autocompletion for the `ray` commands. This is a one-time setup command that prepares your environment for optimal use of `ray`.
- **Usage**:

    ```sh
    ray setup
    ```

### `list-commands`

- **Description**: Lists all available commands in the `ray` CLI tool. This command provides a quick reference to all the functionalities provided by `ray`.
- **Usage**:

    ```sh
    ray list-commands
    ```
