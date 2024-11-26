#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import cli from "./cli";
import { showSnippet } from "./commands/show";
import { version } from "../package.json";

yargs(hideBin(process.argv))
  .version(version)

  // Define the 'add' command using cli.add properties
  .command(
    "add <name> [value]",
    cli.add.description, // Description from cli.add
    (yargs) => {
      // Set up the positional arguments using cli.add options
      return yargs
        .positional("name", {
          describe: cli.add.name,
          type: "string",
          demandOption: true, // Name is always required
        })
        .positional("value", {
          describe: cli.add.value,
          type: "string",
          default: "", // Default empty string if not provided
        })
        .option("c", {
          alias: "command",
          type: "boolean",
          description: cli.add.options.command.description, // Using the command flag description from cli.add
        })
        .check((argv) => {
          console.log({ argv });
          // Custom validation for missing value when 'command' flag is set
          if (!argv.command && !argv.value) {
            throw new Error(
              `Error: You must provide either a value or the --command flag.\n Usage: ray add <name> <value> [--command]`
            );
          }
          return true; // Returning true means no error
        });
    },
    (argv) => {
      // Get arguments from argv and call the action
      const { name, value, command } = argv;
      cli.add.action({
        name: name as string,
        value: value as string,
        isCommand: !!command,
      });
    }
  )

  // Other commands like 'list', 'remove', etc.
  .command(cli.list.help, cli.list.description, {}, cli.list.action)
  .command(
    cli.remove.help,
    cli.remove.description,
    (yargs) => {
      return yargs.positional("name", {
        describe: cli.remove.name,
        type: "string",
      });
    },
    (argv) => {
      cli.remove.action(argv.name as string);
    }
  )
  .command(
    cli["list-commands"].help,
    cli["list-commands"].description,
    {},
    cli["list-commands"].action
  )

  // Catch-all command to show token value
  .command("* <name>", "Show token value", {}, (argv) => {
    showSnippet(argv.name as string);
  })

  .help().argv; // Display help // Parse the arguments
