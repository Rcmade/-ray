import add from "../commands/add";
import list from "../commands/list";
import remove from "../commands/remove";
import setupAutocomplete from "../commands/setupAutocomplete";
import { listCommands } from "../commands/listCommands";
const cli = {
  add: {
    help: "add <name> [value] [--command]",
    name: "The unique name to associate with this snippet or command.",
    value:
      "The content of the snippet or command to store (optional, opens editor if --command is used and no value is provided).",
    description: "Add a new snippet, file, or command to your collection.",
    options: {
      name: {
        type: "string",
        required: true,
        description: "The unique identifier for the snippet or command.",
      },
      value: {
        type: "string",
        default: "",
        description:
          "The content to store. Opens an editor if --command is provided and value is not specified.",
      },
      command: {
        type: "boolean",
        alias: "c",
        description:
          "Flag to indicate the value is a command. Opens an editor if value is not provided.",
      },
    },
    examples: [
      {
        command: "ray add mySnippet 'console.log(\"Hello, World!\")'",
        description: "Add a snippet with the provided name and value.",
      },
      {
        command: "ray add myCommand --command",
        description: "Add a new command by opening the editor for input.",
      },
    ],
    action: add,
  },
  list: {
    help: "list",
    description: "List all tokens",
    action: list,
  },
  remove: {
    help: "remove <name>",
    name: "Name of the snippet or command to remove",
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
