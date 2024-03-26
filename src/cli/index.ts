import { program } from "commander";
import addToken from "../commands/add";
import listTokens from "../commands/list";
import removeToken from "../commands/remove";
import setupAutocomplete from "../commands/setupAutocomplete";
import { listCommands } from "../commands/listCommands";
const cli = {
  add: {
    help: "add <tokenName> <tokenValue>",
    description: "Add a new token",
    action: addToken,
  },
  list: {
    help: "list",
    description: "List all tokens",
    action: listTokens,
  },
  remove: {
    help: "remove <tokenName>",
    description: "Remove a token",
    action: removeToken,
  },

  setup: {
    help: "setup",
    description: "Run setup tasks, including initializing autocompletion.",
    action: setupAutocomplete,
  },
  "list-commands": {
    help: "list-commands",
    description: "List all available commands",
    action: listCommands,
  },
};

export async function getCLI() {
  const module = await import("../cli");
  return module.default;
}

export default cli;
