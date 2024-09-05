import add from "../commands/add";
import list from "../commands/list";
import remove from "../commands/remove";
import setupAutocomplete from "../commands/setupAutocomplete";
import { listCommands } from "../commands/listCommands";
const cli = {
  add: {
    help: "add <name> <value>",
    name: "The name to remember this snippet",
    value: "The value or code snippet to store",
    description: "Add a new file, snippet or command.",
    action: add,
  },
  list: {
    help: "list",
    description: "List all tokens",
    action: list,
  },
  remove: {
    help: "remove <name>",
    name:"Name of the snippet or command to remove",
    description: "Remove a snippet or command",
    action: remove,
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
