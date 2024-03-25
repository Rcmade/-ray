#!/usr/bin/env node
import { program } from "commander";
import * as packageJson from "../package.json";
import cli from "./cli";
import { showTokenValue } from "./commands/show";

program.version(
  packageJson.version,
  "-v, --version",
  "Output the current version of ray CLI"
);

// Dynamically register commands from the cli object
Object.keys(cli).forEach((command) => {
  const key = command as keyof typeof cli;
  program
    .command(cli[key].help)
    .description(cli[key].description)
    .action(cli[key].action);
});

// Add a catch-all command handler for unmatched commands, which are assumed to be token names
program
  .arguments("<tokenName>") // Use .arguments() for catch-all behavior
  .action(showTokenValue);

program.parse(process.argv);
