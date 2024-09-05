#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import cli from "./cli";
import { showSnippet } from "./commands/show";

yargs(hideBin(process.argv))
  .version("1.0.0") // Set version
  .command(
    cli.add.help,
    cli.add.description,
    (yargs) => {
      return yargs
        .option("c", {
          alias: "command",
          type: "boolean",
          description: "Indicates that the value is a command",
        })
        .positional("name", {
          describe: cli.add.name,
          type: "string",
        })
        .positional("value", {
          describe: cli.add.value,
          type: "string",
        });
    },
    (argv) => {
      cli.add.action({
        name: argv.name as string,
        value: argv.value as string,
        isCommand: !!argv?.command,
      });
    }
  )
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
  .command("* <name>", "Show token value", {}, (argv) => {
    showSnippet(argv.name as string);
  }) // Catch-all command
  .help().argv;
